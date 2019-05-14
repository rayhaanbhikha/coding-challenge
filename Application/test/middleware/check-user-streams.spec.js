const path = require("path");
const nock = require("nock");
const { checkUserStreams } = require(path.resolve("middleware"));
const { userIdHeader } = require(path.resolve("config"));
const { ResponseWithSend, RequestWithUserIdHeader } = require("../utils");

const nockInstance = nock("http://localhost:3000")
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' });

describe("Check user streams middleware", () => {

    test("Active streams for user is less than 3", async () => {

        const expectedUser = {
            id: "94378534532",
            firstName: "todd",
            lastName: "smith",
            email: "todd_smith@domain.co.uk",
            activeStreams: 0
        };

        nockInstance
            .get(`/api/users/${expectedUser.id}`)
            .reply(200, expectedUser);

        let req = new RequestWithUserIdHeader(userIdHeader, expectedUser.id);
        let res = {};
        let cb = jest.fn();

        await checkUserStreams(req, res, cb);
        expect(cb.mock.calls.length).toBe(1);
    });

    test("Active streams for user is equal to 3", async () => {

        const expectedUser = {
            id: "94378534532",
            firstName: "todd",
            lastName: "smith",
            email: "todd_smith@domain.co.uk",
            activeStreams: 3
        };

        nockInstance
            .get(`/api/users/${expectedUser.id}`)
            .reply(200, expectedUser);

        let req = new RequestWithUserIdHeader(userIdHeader, expectedUser.id);
        let res = new ResponseWithSend();
        let cb = jest.fn();

        await checkUserStreams(req, res, cb);

        expect(res.statusCalledWith).toBe(403);
        expect(res.sendCalledWith).toBe("Active stream limit reached.");
    });

    test("Active streams for user is equal to 4", async () => {

        const expectedUser = {
            id: "94378534532",
            firstName: "todd",
            lastName: "smith",
            email: "todd_smith@domain.co.uk",
            activeStreams: 4
        };

        nockInstance
            .get(`/api/users/${expectedUser.id}`)
            .reply(200, expectedUser);

        let req = new RequestWithUserIdHeader(userIdHeader, expectedUser.id);
        let res = new ResponseWithSend();
        let cb = jest.fn();

        await checkUserStreams(req, res, cb);

        expect(res.statusCalledWith).toBe(403);
        expect(res.sendCalledWith).toBe("Active stream limit reached.");
    });
});