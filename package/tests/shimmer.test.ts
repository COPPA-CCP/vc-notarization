import chai, { expect, assert } from 'chai';
chai.should();

import { Shimmer } from '../src/notarization/shimmer.js';

const TEST_HASH = "z43q6v4ejP9uAZkX8tjjWeH3W6raHKRH2fXRLuN51YMprpTwE8331EaL5jfRcNQNV9bLxVVEpT8gfMsU2iA2A5bMz"

const TEST_POI = {
    "milestone": {
        "type": 7,
        "index": 3857880,
        "timestamp": 1683800435,
        "protocolVersion": 2,
        "previousMilestoneId": "0xf2600dbd58909014b6cce28b863a54a285fcbd8109559a362d5ab2b62a8c9a0f",
        "parents": [
            "0x223ea2f670f65c678b99e1b0d41759fc2605f0be9108bd66aa0e0ce5405db0eb",
            "0xd4fb611455a3a07178a1c1fa4054edd14a7942dc94d5f2055a1121bad84bbcf7"
        ],
        "inclusionMerkleRoot": "0x8942becf06f6d0e425a46d5792abcd275e009b738871957ec9e9bf57c6661901",
        "appliedMerkleRoot": "0x2d2a865d00cf386665187a4d344e6983350b6eab1fc2eba668670b66acef159a",
        "metadata": "0x2297170000000000223ea2f670f65c678b99e1b0d41759fc2605f0be9108bd66aa0e0ce5405db0eb",
        "signatures": [
            {
                "type": 0,
                "publicKey": "0x16ee3356c21e410a0aaab42896021b1a857eb8d97a14a66fed9b13d634c21317",
                "signature": "0xb9932ede0138a86afdb77726e2edff59bd41588f961c48875532f6911c6bef1e0627dce17694d257c7d0afac27e97c80d607021add1a2bb64d34463d278f1c02"
            },
            {
                "type": 0,
                "publicKey": "0x1df26178a7914126fd8cb934c7a7437073794c1c8ce99319172436b1d4973eba",
                "signature": "0x95e88776ee5c2cf3b171b0c5f5d7cce17ed834f70fd2e7b8bd709311ff31813837cb1b81c97b64c2867cb70b194fb3e7d88811bd13f9cc35cf85475aec41df09"
            },
            {
                "type": 0,
                "publicKey": "0x45432d7c767e16586403262331a725c7eaa0b2dd79ea442f373c845ae3443aa9",
                "signature": "0x6867a72d8a7943c2b363733e25b43ba042e24aac23e1cc17e26451071e8d48910f2640466df0a6ae1952b42f9bbb8e136d32216bce4b7ef241725978d504fe0a"
            },
            {
                "type": 0,
                "publicKey": "0x4af647910ba47000108b87c63abe0545643f9b203eacee2b713729b0450983fe",
                "signature": "0xca589ddde772f73f9c9e4eb8d700a6d503395113119c33829e0442ca012da0e326cd82326744770bac504bbad5165340e0b3867419bc377b412aeda93124e70e"
            },
            {
                "type": 0,
                "publicKey": "0x71a09774449a081450a51e0245a1e9850190f93508fd8f21bb9b9ca169765f30",
                "signature": "0x4436ce8cbe287cd7715e6b1c94f95568db0cf3f85064b331c617120d057175fe23f12f68beffb673a03baded85db70c70ec993bd9d252f09c2b766d620332401"
            },
            {
                "type": 0,
                "publicKey": "0x99c7d9752c295cb56b550191015ab5a40226fb632e8b02ec15cfe574ea17cf67",
                "signature": "0x630f054101b5437ed63b32bb5b45eae1a4dcc8453ed99c9a7375f874cdd8f232f0e8b3d99e59d617a048ca60840c3a7eaa513aa96803789846d357acc957a403"
            },
            {
                "type": 0,
                "publicKey": "0x9d87b4d2538b10799b582e25ace4726d92d7798ddfb696ff08e450db7917c9ad",
                "signature": "0x97fc12587ef2df7224479d9fc6f00375898a7982c7323a5cfff52d5e419d627c506e5aa7a75c6981a57e69b423b6e90cbacc37f6460e1ebf954ae512626ef80c"
            },
            {
                "type": 0,
                "publicKey": "0xa375515bfe5adf7fedb64ef4cebe1e621e85a056b0ccd5db72bc0d474325bf38",
                "signature": "0x91b87ba4fe11916362529f31fcb3f24f68aa1f7415b05e18d4881cee3c37b8eadbedce2e02fbb5a0126dd34a580c5db4f2198c8870b3255d34c5486dbf37fc05"
            },
            {
                "type": 0,
                "publicKey": "0xa507d2a592a5f0424ed8530603c08acebe088ae26211e90b79bfec0970a2397f",
                "signature": "0xc3c0d6f3edee312f9610136a667686f014b90833457b3a89055bda9299162d291c5afff83a2cc68f55ff316eea48ee096fa55bb16109221f4828560ecc6cbc0d"
            },
            {
                "type": 0,
                "publicKey": "0xa921841628d64c3f08bd344118b8106ade072e68c774beff30135e036194493a",
                "signature": "0xe4fa6a7215fa39eff87a3da2f070adc15554453de46fa67d44c2d867bdc20a20a7da3a3b08795a3c58efac44d82def92b77901e80b3baf084ef223986b56e305"
            }
        ]
    },
    "block": {
        "protocolVersion": 2,
        "parents": [
            "0x3491cc204003939fc6f7548eb521a4df8a1c9e31dea893841e065036e41fdb77",
            "0x78176680f9e7440f36aba15aa74a7d8d2165bf7cf304581200c6ab49c18a866f",
            "0x9f5f61d89c8080bd7d5ea801c5d5c0cefe0300e0659064e2e448c84de6661bb8",
            "0xfb6dfb8f2a66b0c45e980ea509e9927b74955306ce72961c558920c9c0e8ae47"
        ],
        "payload": {
            "type": 5,
            "tag": "0x7a343371367634656a503975415a6b5838746a6a5765483357367261484b5248326658524c754e3531594d7072705477453833333145614c356a6652634e51",
            "data": "0x7a343371367634656a503975415a6b5838746a6a5765483357367261484b5248326658524c754e3531594d7072705477453833333145614c356a6652634e514e5639624c7856564570543867664d7355326941324135624d7a"
        },
        "nonce": "150448"
    },
    "proof": {
        "l": {
            "l": {
                "h": "0x859803ffeedc7e314e2b3f0c605b67b76a90d7aae8dbd70955edba41b6532497"
            },
            "r": {
                "l": {
                    "l": {
                        "h": "0x010f8e2fd0118188c5e13965afb0429b3980f91ec19d9f8d651b940da8e5d430"
                    },
                    "r": {
                        "l": {
                            "l": {
                                "l": {
                                    "value": "0xdc22288a13dab3e9402c9c827831c5344679186357bc2fb0db0b557d846967f8"
                                },
                                "r": {
                                    "h": "0x1d6289d5cd54de17d3fcdc3bbe7aa7223588c79d2b142affed6d58af8e81737a"
                                }
                            },
                            "r": {
                                "h": "0xa81790ca61688b49af7d1080c0ec575fca1912d436c01efcb0f07ea16d7b0184"
                            }
                        },
                        "r": {
                            "h": "0xf76fe1085bedf20425fc8f045a90a77e10915daad4960b68c887e30c1dc34d5c"
                        }
                    }
                },
                "r": {
                    "h": "0x3e4cce0b7aea7f6e4689f7725ecb4e75175b5c6018a80d2acf1fc1ed563512ea"
                }
            }
        },
        "r": {
            "h": "0x86b26623fa63f0d70ccd97a5df0906071e5365f69487c547c7254754d99fa566"
        }
    }
}

describe("Shimmer Network Test", () => {

    const shimmer = new Shimmer()

    it('Status', async () => {

        const status = await shimmer.getStatus();

        expect(status.health).to.be.true;
        expect(status.node.protocol.bech32Hrp).to.be.equal('smr');

    });

    /*it('Notarize hash', async () => {

        const notarizationResponse = await shimmer.notarizeHash(TEST_HASH);

        console.log(JSON.stringify(notarizationResponse, null, 2))

        expect(notarizationResponse).to.be.not.undefined

    });*/

    /*it('Retrieve timestamp', async () => {

        const tangleTime = await shimmer.getNotarizedTimestamp(TEST_HASH, TEST_HASH, TEST_POI);

        assert.deepEqual(tangleTime, new Date('2023-05-11T10:20:35.000Z'));

    });*/

});