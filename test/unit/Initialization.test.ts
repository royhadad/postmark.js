import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Clients initialization", () => {
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");

    it("#new ServerClient", () => {
        const client = new postmark.ServerClient(serverToken);
        expect(client).not.to.equal(undefined);
    });

    it("#new AccountClient", () => {
        const client = new postmark.AccountClient(serverToken);
        expect(client).not.to.equal(undefined);
        expect(client).to.be.instanceOf(postmark.AccountClient)
    });

    describe('legacy initialization - v1', () => {
        it("#new Client", () => {
            const client = new postmark.Client(serverToken);
            expect(client).not.to.equal(undefined);
            expect(client).to.be.instanceOf(postmark.ServerClient)
        });

        it("#new AdminClient", () => {
            const client = new postmark.AdminClient(serverToken);
            expect(client).not.to.equal(undefined);
            expect(client).to.be.instanceOf(postmark.AccountClient)
        });
    });
});
