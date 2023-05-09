import chai, { expect, assert } from 'chai';
chai.should();

import { Shimmer } from '../src/notarization/shimmer.js';

const TEST_HASH = "z43q6v4ejP9uAZkX8tjjWeH3W6raHKRH2fXRLuN51YMprpTwE8331EaL5jfRcNQNV9bLxVVEpT8gfMsU2iA2A5bMy"

describe("Shimmer Network Test", () => {

    const shimmer = new Shimmer()

    it('Status', async () => {

        const status = await shimmer.getStatus();

        expect(status.health).to.be.true;
        expect(status.node.protocol.bech32Hrp).to.be.equal('rms');

    });

    /*it('Notarize hash', async () => {

        const notarizationResponse = await shimmer.notarizeHash(TEST_HASH);

        console.log(notarizationResponse)

        expect(notarizationResponse).to.be.not.undefined

    });*/

    /*it('Retrieve timestamp', async () => {

        const tangleTime = await shimmer.getNotarizedTimestamp(TEST_HASH);

        assert.deepEqual(tangleTime, new Date('2023-05-02T08:28:15.000Z'));

    });*/

});