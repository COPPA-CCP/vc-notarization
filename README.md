[![Tests](https://github.com/COPPA-CCP/vc-notarization/actions/workflows/npm-test.yml/badge.svg)](https://github.com/COPPA-CCP/vc-notarization/actions)

# vc-notarization
Notarize verifiable credentials on DLT for provability and order

## General Idea

The signature of a [verifiable credential](https://ec.europa.eu/digital-building-blocks/wikis/display/EBSI/EBSI+Verifiable+Credentials) (VC) ensures integrity and immutability of the contained data by a digital signature. By default a VC also proclaims an issuance date which is singed along with the other data. The issue is that the issuer can sign an arbitrary date as the issuance date for the VC, what makes this particular data field gameable for the issuer. In order to make the issuance date verifiable, the VC has to be notarized upon creation. To do this we use distributed ledgers as a trusted third party, providing and immutable order and thereby timestamps to events.

## Supported DLTs

### Public Permissionless

- Ethereum tbd.
- [Iota](https://www.iota.org/)
- [Shimmer](https://shimmer.network/)

### Private Permissioned

- Hyperledger (Indy,Fabric ...?) tbd.


## Techinical Explanations

### W3C JSON-LD Credentials

For notarizing VCs it is necessary to extract an uniquely identifying hash from them. In the case of W3C JSON-LD VCs the approach is to use the proof value, i.e. the signature value of the linked data signature. Doing this has the advantage that the linked data signature is created over the canonilized form of the VC, what makes two identical VCs identifiable as the same one, indendently of their form of appearance.

### Proof of Inclusion

When using a non persistent DLT like shimmer, the nodes prune the transactrion history and thereby the data included in them. In order to verify the existence and timestamp a proof of inlcusion has to be given, which uses merkle trees to proof the existence of the transaction in the DLT at a certain time.

Specs: https://github.com/iotaledger/tips/blob/milestone-with-signature-blocks/tips/TIP-0029/tip-0029.md  
Example implementation: https://wiki.iota.org/shimmer/tutorials/proof-inclusion-of-a-block  
Module: https://github.com/iotaledger/inx-poi  


## Examples

Install the npm package

```
npm i vc-notarization
```

### Notarize VC

Notarize a VC in order to create a verifiable timestamp on the DLT

```ts
import { notarize, VerifiableCredential, NotarizationResponse } from 'vc-notarization';


const credential: VerifiableCredential = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://ssi.eecc.de/api/registry/context/productpassport",
        "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "https://ssi.eecc.de/api/registry/vc/cf43356c-a9f3-418a-a3ff-baca5a14d668",
    "type": [
        "VerifiableCredential",
        "ProductPassportCredential"
    ],
    "issuer": {
        "id": "did:web:ssi.eecc.de",
        "image": "https://id.eecc.de/assets/img/logo_big.png",
        "name": "EECC"
    },
    "issuanceDate": "2023-01-25T16:01:26Z",
    "credentialSubject": {
        "id": "https://id.eecc.de/01/04012345999990/10/20210401-A/21/XYZ-1234",
        "digital_link": "https://id.eecc.de/01/04012345999990/10/20210401-A/21/XYZ-1234"
    },
    "proof": {
        "type": "Ed25519Signature2020",
        "created": "2023-01-25T16:01:26Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:web:ssi.eecc.de#z6MkoHWsmSZnHisAxnVdokYHnXaVqWFZ4H33FnNg13zyymxd",
        "proofValue": "z5YUnCUVWgAwc1iTQ61jtUyjBNLZELGMxnbsekFDQLd4ZNbPo45we4xxZjV5pqb3jqPo7ryKMmMY9dySNERz1huLJ"
    }
}


notarize(credential)
    .then((res: NotarizationResponse) => {
        console.log(`The credentials hash was published by transaction ${res.transactionId}`)
    });
```

### Verify VC Timestamp

Verify the issuance date of a VC using the notarized timestamp on the DLT if it exists

```ts
import { verifyTimestamp, VerifiableCredential } from 'vc-notarization';


const credential: VerifiableCredential = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://ssi.eecc.de/api/registry/context/productpassport",
        "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "https://ssi.eecc.de/api/registry/vc/cf43356c-a9f3-418a-a3ff-baca5a14d668",
    "type": [
        "VerifiableCredential",
        "ProductPassportCredential"
    ],
    "issuer": {
        "id": "did:web:ssi.eecc.de",
        "image": "https://id.eecc.de/assets/img/logo_big.png",
        "name": "EECC"
    },
    "issuanceDate": "2023-01-25T16:01:26Z",
    "credentialSubject": {
        "id": "https://id.eecc.de/01/04012345999990/10/20210401-A/21/XYZ-1234",
        "digital_link": "https://id.eecc.de/01/04012345999990/10/20210401-A/21/XYZ-1234"
    },
    "proof": {
        "type": "Ed25519Signature2020",
        "created": "2023-01-25T16:01:26Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:web:ssi.eecc.de#z6MkoHWsmSZnHisAxnVdokYHnXaVqWFZ4H33FnNg13zyymxd",
        "proofValue": "z5YUnCUVWgAwc1iTQ61jtUyjBNLZELGMxnbsekFDQLd4ZNbPo45we4xxZjV5pqb3jqPo7ryKMmMY9dySNERz1huLJ"
    }
}

verifyTimestamp(credential)
    .then((timestamp: Date) => {
        console.log(timestamp)
    });
```
