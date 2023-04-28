
import { MAX_INDEXATION_KEY_LENGTH, retrieveData, sendData, SingleNodeClient, IClient } from "@iota/iota.js";
import { Converter } from "@iota/util.js";


/**
 * The index for retrieving the data from the tangle
 */
const DEFAULT_INDEX = "COPPA-CCP";

const client: IClient = new SingleNodeClient("https://chrysalis-nodes.iota.org");

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

export async function notarizeHash(hash: string, index?: string): Promise<string> {

    const indexBytes = getIndexBytes(index || hash);

    const sendResult = await sendData(client, indexBytes, Converter.utf8ToBytes(hash));

    console.log("Hash successfully notarized on IOTA with message https://explorer.iota.org/mainnet/message/" + sendResult.messageId);

    return sendResult.messageId;

}

export async function getStatus(): Promise<any> {

    return {
        node: await client.info(),
        health: await client.health(),
    }

}