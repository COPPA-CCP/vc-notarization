
import { MAX_INDEXATION_KEY_LENGTH, retrieveData, sendData, SingleNodeClient, IClient, IMilestoneResponse, IMessageMetadata } from "@iota/iota.js";
import { Converter } from "@iota/util.js";

import { DLTInterface, NotarizationResponse } from "../types";
import { DLT } from '../enums.js';

const client: IClient = new SingleNodeClient(process.env.IOTA_NODE_URL || "https://chrysalis-nodes.iota.org");

/**
 * Converts the index string into bytes and trims it if necessary
 * @param index 
 * @returns 
 */
function getIndexBytes(index: string): Uint8Array {

    const indexBytes = Converter.utf8ToBytes(index);

    if (indexBytes.length > MAX_INDEXATION_KEY_LENGTH) return indexBytes.subarray(0, MAX_INDEXATION_KEY_LENGTH);

    return indexBytes;

}

export class Iota implements DLTInterface {

    private dlt: DLT = DLT.IOTA;

    private explorerURL: string = process.env.IOTA_EXPLORER_URL || "https://explorer.iota.org/mainnet/message/";

    public async notarizeHash(hash: string, index?: string): Promise<NotarizationResponse> {

        const indexBytes = getIndexBytes(index || hash);

        const sendResult = await sendData(client, indexBytes, Converter.utf8ToBytes(hash));

        return {
            dlt: this.dlt,
            transactionId: sendResult.messageId,
            explorerURL: this.explorerURL + sendResult.messageId
        }

    }

    public async getNotarizedTimestamp(hash: string, index?: string, proof?: any): Promise<Date> {

        const indexBytes = getIndexBytes(index || hash);

        const messages = await client.messagesFind(indexBytes);

        if (messages && messages.messageIds.length > 0) {

            const firstOccurance = await retrieveData(client, messages.messageIds[0]);

            if (!firstOccurance || !firstOccurance.data) throw new Error('Could not retrieve any message data from the tangle!');

            if (Converter.bytesToUtf8(firstOccurance.data) !== hash) throw new Error('Notarized hash does not match the given hash!');

            const firstOccuranceMeta: IMessageMetadata = await client.messageMetadata(messages.messageIds[0]);

            if (!firstOccuranceMeta) throw new Error('Could not retrieve any message meta data from the tangle!');

            if (!firstOccuranceMeta.isSolid) throw new Error('Notarization message is not solid!');

            if (!firstOccuranceMeta.referencedByMilestoneIndex) throw new Error('Notarization message was not referenced by a milestone!');

            const milestone: IMilestoneResponse = await client.milestone(firstOccuranceMeta.referencedByMilestoneIndex);

            return new Date(milestone.timestamp * 1000);

        }

        throw new Error('Could not retrieve any message from the tangle!');

    }

    public async getStatus(): Promise<any> {

        return {
            node: await client.info(),
            health: await client.health(),
        }

    }

}
