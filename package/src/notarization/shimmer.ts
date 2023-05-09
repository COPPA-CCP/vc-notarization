
import { MAX_TAG_LENGTH, retrieveData, sendData, SingleNodeClient, IClient } from "shimmer";
import { Converter } from "@iota/util.js";
import { LocalPowProvider } from "@iota/iota.js"

import { DLTInterface, NotarizationResponse } from "../types";
import { DLT } from '../enums.js';

/**
 * Startdust update allows proof of inclusion https://wiki.iota.org/shimmer/tutorials/proof-inclusion-of-a-block
 */


function wait(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}


/**
 * Converts the index string into bytes and trims it if necessary
 * @param index 
 * @returns 
 */
function getIndexBytes(index: string): Uint8Array {

    const indexBytes = Converter.utf8ToBytes(index);

    if (indexBytes.length > MAX_TAG_LENGTH) return indexBytes.subarray(0, MAX_TAG_LENGTH - 1);

    return indexBytes;

}

export class Shimmer implements DLTInterface {

    private dlt: DLT = DLT.SHIMMER;

    private nodeURL = process.env.SHIMMER_NODE_URL || "https://api.testnet.shimmer.network";

    private client: IClient = new SingleNodeClient(
        this.nodeURL,
        { powProvider: new LocalPowProvider() }
    );

    private explorerURL: string = process.env.SHIMMER_EXPLORER_URL || "https://explorer.shimmer.network/testnet/block/";

    // Check for block confirmation and return proof of inclusion, if confirmed after n tries
    private async getNotarization(blockId: string) {
        try {

            let i = 0;
            while (i < 10) {
                i++;
                // Function waits for a certain time between iterations
                await wait(2000);

                const blockMetadata = await this.client.blockMetadata(blockId);

                // If a block was referenced by a milestone, the metadata contains the field 'referencedByMilestoneIndex'
                if ('referencedByMilestoneIndex' in blockMetadata) {
                    console.log(
                        `Try ${i}: Block was referenced by milestone #${blockMetadata.referencedByMilestoneIndex}`,
                        '\n',
                    );

                    // Call "create" endpoint of PoI plugin with blockId and return the result
                    // Not available on public node -> spin up own node
                    const poiPluginUrl = `${this.nodeURL}/api/poi/v1/create/${blockId}`;
                    const response = await fetch(poiPluginUrl);
                    const result = await response.json();

                    return result;
                } else {
                    console.log(`Try ${i}: Block was not yet referenced by a milestone`);
                }
            }
            console.log(`Block was not referenced by a milestone after ${i} seconds.`);

            return false;
        } catch (error) {
            console.log(error);
        }
    }

    public async notarizeHash(hash: string, index?: string): Promise<NotarizationResponse> {

        const indexBytes = getIndexBytes(index || hash);

        const sendResult = await sendData(this.client, indexBytes, Converter.utf8ToBytes(hash));

        const proofOfInlcusion = await this.getNotarization(sendResult.blockId);

        return {
            dlt: this.dlt,
            transactionId: sendResult.blockId,
            proof: proofOfInlcusion,
            explorerURL: this.explorerURL + sendResult.blockId
        }

    }

    public async getNotarizedTimestamp(hash: string, index?: string): Promise<Date> {

        return new Date();

    }

    public async getStatus(): Promise<any> {

        return {
            node: await this.client.info(),
            health: await this.client.health(),
        }

    }

}