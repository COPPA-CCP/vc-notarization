import { VerifiableCredential, DLT } from "../types";

import * as iota from "./iota.js";

export async function notarizeHash(hash: string, dlt: DLT = DLT.IOTA): Promise<string> {

    switch (dlt) {

        case DLT.IOTA:
            return iota.notarizeHash(hash);

        default:
            throw Error(dlt + ' is not a supported DLT');

    }

}

export async function notarizeVC(credential: VerifiableCredential, dlt: DLT = DLT.IOTA): Promise<string> {

    const hash: string | undefined = Array.isArray(credential.proof) ? credential.proof[0].proofValue : credential.proof?.proofValue;

    if (!hash) throw new Error('Could not determine hash value of credential!');

    return await notarizeHash(hash, dlt);

};

