import { VerifiableCredential, DLT } from './types';

import { notarizeVC, verifyVCTimestamp } from './notarization/index.js';


export async function notarize(credential: VerifiableCredential, dlt: DLT = DLT.IOTA): Promise<string> {

    return await notarizeVC(credential, dlt);

};

export async function verifyTimestamp(credential: VerifiableCredential, dlt: DLT = DLT.IOTA): Promise<Date> {

    return await verifyVCTimestamp(credential, dlt);

};

export type * from './types';