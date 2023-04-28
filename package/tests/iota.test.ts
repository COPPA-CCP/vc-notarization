import chai, { expect } from 'chai';
chai.should();

import { getStatus, notarizeHash } from '../src/notarization/iota.js';

const TEST_HASH = "z43q6v4ejP9uAZkX8tjjWeH3W6raHKRH2fXRLuN51YMprpTwE8331EaL5jfRcNQNV9bLxVVEpT8gfMsU2iA2A5bMh"

describe("Iota Network Test", () => {

    it('Status', async () => {

        const status = await getStatus();

        expect(status.health).to.be.true;
        expect(status.node.bech32HRP).to.be.equal('iota');

    });

    it('Notarize hash', async () => {

        const messageId = await notarizeHash(TEST_HASH);

        expect(messageId).to.be.not.undefined

    });

    it('Retrieve timestamp', async () => {

        // TODO

        expect(true).to.be.true

    });

});