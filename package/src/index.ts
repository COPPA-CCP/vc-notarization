import { VerifiableCredential, DLT } from './types';

import { notarizeVC } from './notarization/index.js';


export async function notarize(credential: VerifiableCredential, dlt: DLT = DLT.IOTA): Promise<string> {

    return await notarizeVC(credential, dlt);

};

export type * from './types';