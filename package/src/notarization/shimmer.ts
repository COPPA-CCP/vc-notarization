
import { MAX_INDEXATION_KEY_LENGTH, retrieveData, sendData, SingleNodeClient, IClient, IMilestoneResponse, IMessageMetadata } from "@iota/iota.js";
import { Converter } from "@iota/util.js";

import { DLTInterface, NotarizationResponse } from "../types";
import { DLT } from '../enums.js';


const client: IClient = new SingleNodeClient(process.env.SHIMMER_NODE_URL || "https://api.testnet.shimmer.network/api/core/v2", { basePath: "/api/core/v2/" });

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

export class Shimmer implements DLTInterface {

    private dlt: DLT = DLT.SHIMMER;

    private explorerURL: string = process.env.SHIMMER_EXPLORER_URL || "https://explorer.shimmer.network";

    public async notarizeHash(hash: string, index?: string): Promise<NotarizationResponse> {

        const indexBytes = getIndexBytes(index || hash);

        const sendResult = await sendData(client, indexBytes, Converter.utf8ToBytes(hash));

        console.log(sendResult)

        return {
            dlt: this.dlt,
            transactionId: sendResult.messageId,
            explorerURL: this.explorerURL + sendResult.messageId
        }

    }

    public async getNotarizedTimestamp(hash: string, index?: string): Promise<Date> {

        return new Date();

    }

    public async getStatus(): Promise<any> {

        return {
            node: await client.info(),
            health: await client.health(),
        }

    }

}