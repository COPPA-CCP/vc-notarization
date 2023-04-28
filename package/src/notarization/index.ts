import { VerifiableCredential, DLT, DLTInterface } from "../types";

import { Iota } from "./iota.js";

function getDLTInstance(dlt: DLT): DLTInterface {

    switch (dlt) {

        case DLT.IOTA:
            return new Iota();

        default:
            throw Error(dlt + ' is not a supported DLT');

    }

}

export async function notarizeHash(hash: string, dlt: DLT = DLT.IOTA): Promise<string> {

    const DLTInstance = getDLTInstance(dlt);

    return await DLTInstance.notarizeHash(hash);

}

export async function getNotarizedTimestamp(hash: string, dlt: DLT = DLT.IOTA): Promise<Date> {

    const DLTInstance = getDLTInstance(dlt);

    return await DLTInstance.getNotarizedTimestamp(hash);

}

function getVCHash(credential: VerifiableCredential): string {

    const hash: string | undefined = Array.isArray(credential.proof) ? credential.proof[0].proofValue : credential.proof?.proofValue;

    if (!hash) throw new Error('Could not determine hash value of credential!');

    return hash;

}

export async function notarizeVC(credential: VerifiableCredential, dlt: DLT = DLT.IOTA): Promise<string> {

    const hash = getVCHash(credential);

    return await notarizeHash(hash, dlt);

};

export async function verifyVCTimestamp(credential: VerifiableCredential, dlt: DLT = DLT.IOTA): Promise<Date> {

    const hash = getVCHash(credential);

    return await getNotarizedTimestamp(hash);

}

