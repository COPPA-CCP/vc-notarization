import { VerifiableCredential, DLT, DLTInterface } from "../types.js";

import { Iota } from "./iota.js";

/**
 * Returns an instance of an DLTInterface according to the given DLT enum parameter
 * 
 * @param dlt - Distributed ledger Enum
 * @returns - Instance of a DLTInterface
 */
function getDLTInstance(dlt: DLT): DLTInterface {

    switch (dlt) {

        case DLT.IOTA:
            return new Iota();

        default:
            throw Error(dlt + ' is not a supported DLT');

    }

}

/**
 * Takes a hash string and notarizes it on the desired DLT specified by the DLT enum
 * 
 * @param hash - Hash string that shall be notarized
 * @param dlt - The DLT enum specifying the DLT on which the hash shall be notarized
 * @returns The DLT transaction id
 */
export async function notarizeHash(hash: string, dlt: DLT = DLT.IOTA): Promise<string> {

    const DLTInstance = getDLTInstance(dlt);

    return await DLTInstance.notarizeHash(hash);

}

/**
 * Takes a hash string and tries to look up the timestamp of the notarization on the DLT specified by the DLT enum
 * 
 * @param hash - Hash string for which the timestamp shall be retrieved
 * @param dlt - The DLT enum of the DLT where the hash is notarized
 * @returns The timestamp of the latest possible event creation
 */
export async function getNotarizedTimestamp(hash: string, dlt: DLT = DLT.IOTA): Promise<Date> {

    const DLTInstance = getDLTInstance(dlt);

    return await DLTInstance.getNotarizedTimestamp(hash);

}

/**
 * Takes a verifiable credential and returns it unique hash
 * 
 * @param credential - Verifiable credential
 * @returns The hash of the verifiable credential
 */
function getVCHash(credential: VerifiableCredential): string {

    const hash: string | undefined = Array.isArray(credential.proof) ? credential.proof[0].proofValue : credential.proof?.proofValue;

    if (!hash) throw new Error('Could not determine hash value of credential!');

    return hash;

}

/**
 * Takes a verifiable credential and notarizes it on the desired DLT specified by the DLT enum
 * 
 * @param credential - The verifiable credential which shall be notarized
 * @param dlt - The DLT enum of the DLT where the credential shall be notarized
 * @returns The DLT transaction id
 */
export async function notarizeVC(credential: VerifiableCredential, dlt: DLT = DLT.IOTA): Promise<string> {

    const hash = getVCHash(credential);

    return await notarizeHash(hash, dlt);

};

/**
 * Takes a verifiable credential and tries to look up the timestamp of the notarization on the DLT specified by the DLT enum
 * 
 * @param credential - Verifiable credential for which the timestamp shall be retrieved
 * @param dlt - The DLT enum of the DLT where the hash is notarized
 * @returns The timestamp of the latest possible event creation
 */
export async function getNotarizedVCTimestamp(credential: VerifiableCredential, dlt: DLT = DLT.IOTA): Promise<Date> {

    const hash = getVCHash(credential);

    return await getNotarizedTimestamp(hash);

}

