import { VerifiableCredential, DLT } from './types.js';

import {
    notarizeVC,
    getNotarizedVCTimestamp,
    notarizeHash,
    getNotarizedTimestamp
} from './notarization/index.js';

/**
 * Takes a string or verifiabel credential object and notarizes it on the desired DLT specified by the DLT enum
 * 
 * @param object - Hash string or verifiabel credential object which shall be notarized
 * @param dlt - The DLT enum of the DLT where the credential
 * @returns The DLT transaction id
 */
export async function notarize(object: VerifiableCredential | string, dlt: DLT = DLT.IOTA): Promise<string> {

    if (typeof object == 'string') return await notarizeHash(object, dlt);

    return await notarizeVC(object, dlt);

};

/**
 * Takes a string or verifiable credential object and tries to look up the timestamp of the notarization on the DLT specified by the DLT enum
 * 
 * @param object - Object for which the timestamp shall be retrieved
 * @param dlt - The DLT enum of the DLT where the credential shall be notarized
 * @returns The timestamp of the latest possible event creation
 */
export async function getTimestamp(object: VerifiableCredential | string, dlt: DLT = DLT.IOTA): Promise<Date> {

    if (typeof object == 'string') return await getNotarizedTimestamp(object, dlt);

    return await getNotarizedVCTimestamp(object, dlt);

};

/**
 * Takes a verifiable credential and verifies its issuance date using the notarized timestamp on the DLT specified by the DLT enum. Throws an error if the tolerance is exceeded or the notarization happened before the issuance
 * 
 * @param credential - Verifiable credential for which the timestamp shall be verified
 * @param dlt - The DLT enum of the DLT where the hash is notarized
 * @param tolerance - Time tolerance between issuance and notarization
 * @returns The timestamp of the latest possible event creation
 */
export async function verifyTimestamp(credential: VerifiableCredential, dlt: DLT = DLT.IOTA, tolerance: number = 300000): Promise<Date> {

    const notarizedTimestamp = await getTimestamp(credential, dlt);

    const deviation = notarizedTimestamp.getTime() - new Date(credential.issuanceDate).getTime();

    if (deviation < 0) throw new Error(`Notarization happended ${(-deviation) / 1000} seconds before issuance!`);

    if (deviation > tolerance) throw new Error(`Tolerance exceeded! Notarization happended ${(deviation) / 1000} seconds after issuance!`);

    return notarizedTimestamp;

};

export type * from './types';