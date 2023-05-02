// global types declaration

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

export enum DLT {
    ETH = "ETHEREUM",
    IOTA = "IOTA"
}

export type NotarizationResponse = {
    dlt: DLT;
    transactionId: string;
    explorerURL?: string | URL;
}

export interface DLTInterface {
    getStatus: () => Promise<any>,
    notarizeHash: (hash: string, index?: string) => Promise<NotarizationResponse>,
    getNotarizedTimestamp: (hash: string, index?: string) => Promise<Date>
}


