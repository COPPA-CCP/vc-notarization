[![Tests](https://github.com/COPPA-CCP/vc-notarization/actions/workflows/npm-test.yml/badge.svg)](https://github.com/COPPA-CCP/vc-notarization/actions)

# vc-notarization
Notarize verifiable credentials on DLT for provability and order

## General Idea

The signature of a [verifiable credential](https://ec.europa.eu/digital-building-blocks/wikis/display/EBSI/EBSI+Verifiable+Credentials) ensures integrity and immutability of the contained data by a digital signature. By default a verifiable credential also proclaims an issuance date which is singed along with the other data. The issue is that the issuer can sign an arbitrary date as the issuance date for the verifiable credential, what makes this particular data field gameable for the issuer. In order to make the issuance date verifiable, the verifiable credential has to be notarized upon creation. To do this we use distributed ledgers as a trusted third party, providing and immutable order and thereby timestamps to events.


## Examples

### Verify Timestamp

Install the npm package

```
npm i vc-notarization
```

Generate a kay pair and sign a demo event

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