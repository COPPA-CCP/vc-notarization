// global types declaration
import { DLT } from './enums.js'
/**
 * Verifiable credential types
 */

export type Proof = {
    type: string;
    challenge?: string | undefined;
    created: Date | string;
    verificationMethod: string;
    proofPurpose: string;
    proofValue: string;
}

export type Verifiable = {
    '@context': (string | any)[];
    type: string[];
    proof?: Proof | Proof[];
}


export type VerifiableCredential = Verifiable & {
    id: string | URL;
    issuer: string | any;
    issuanceDate: string;
    credentialSubject: any;
}

/**
 * DLT types
 */

export type NotarizationResponse = {
    dlt: DLT;
    transactionId: string;
    explorerURL?: string | URL;
    proof?: any;
}

export interface DLTInterface {
    getStatus: () => Promise<any>,
    notarizeHash: (hash: string, index?: string) => Promise<NotarizationResponse>,
    getNotarizedTimestamp: (hash: string, index?: string) => Promise<Date>
}


