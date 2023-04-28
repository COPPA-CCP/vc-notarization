import chai, { expect, assert } from 'chai';
chai.should();

import { Iota } from '../src/notarization/iota.js';

const TEST_HASH = "z43q6v4ejP9uAZkX8tjjWeH3W6raHKRH2fXRLuN51YMprpTwE8331EaL5jfRcNQNV9bLxVVEpT8gfMsU2iA2A5bMh"

describe("Iota Network Test", () => {

    const iota = new Iota()

    it('Status', async () => {

        const status = await iota.getStatus();

        expect(status.health).to.be.true;
        expect(status.node.bech32HRP).to.be.equal('iota');

    });

    /*it('Notarize hash', async () => {

        const messageId = await iota.notarizeHash(TEST_HASH);

        expect(messageId).to.be.not.undefined

    });*/

    it('Retrieve timestamp', async () => {

        const tangleTime = await iota.getNotarizedTimestamp(TEST_HASH);

        assert.deepEqual(tangleTime, new Date('2023-04-28T15:13:45.000Z'));

    });

});