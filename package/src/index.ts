import { VerifiableCredential, NotarizationResponse } from './types';
import { DLT } from './enums.js';

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
export async function notarize(object: VerifiableCredential | string, dlt: DLT = DLT.IOTA): Promise<NotarizationResponse> {

    if (typeof object == 'string') return await notarizeHash(object, dlt);

    return await notarizeVC(object, dlt);

};

/**
 * Takes a string or verifiable credential object and tries to look up the timestamp of the notarization on the DLT specified by the DLT enum
 * 
 * @param object - Object for which the timestamp shall be retrieved
 * @param dlt - The DLT enum of the DLT where the credential shall be notarized
 * @param proof - Optional proof of inlclusion if the transaction can not be retrieved from the DLT
 * @returns The timestamp of the latest possible event creation
 */
export async function getTimestamp(object: VerifiableCredential | string, dlt: DLT = DLT.IOTA, proof?: any): Promise<Date> {

    if (typeof object == 'string') return await getNotarizedTimestamp(object, dlt, proof);

    return await getNotarizedVCTimestamp(object, dlt, proof);

};

/**
 * Takes a verifiable credential and verifies its issuance date using the notarized timestamp on the DLT specified by the DLT enum.
 * Throws an error if the tolerance is exceeded or the notarization happened before the issuance
 * 
 * @param credential - Verifiable credential for which the timestamp shall be verified
 * @param dlt - The DLT enum of the DLT where the hash is notarized
 * @param proof - Optional proof of inlclusion if the transaction can not be retrieved from the DLT
 * @param tolerance - Optional time tolerance between issuance and notarization in milliseconds - Default is 300 seconds
 * @returns The timestamp of the latest possible event creation
 */
export async function verifyTimestamp(credential: VerifiableCredential, dlt: DLT = DLT.IOTA, proof?: any, tolerance: number = 300000): Promise<Date> {

    const notarizedTimestamp = await getTimestamp(credential, dlt, proof);

    const deviation = notarizedTimestamp.getTime() - new Date(credential.issuanceDate).getTime();

    if (deviation < 0) throw new Error(`Notarization happended ${(-deviation) / 1000} seconds before issuance!`);

    if (deviation > tolerance) throw new Error(`Tolerance exceeded! Notarization happended ${(deviation) / 1000} seconds after issuance!`);

    return notarizedTimestamp;

};

export { DLT } from './enums.js';
export type * from './types';
