const path = require("path");
const { userIdHeader } = require(path.resolve("config"));
const { video: videoRoute } = require(path.resolve("controllers"));
const { ResponseWithSend, RequestWithUserIdHeader } = require("../utils");

const nock = require("nock");
const nockInstance = nock("http://localhost:3000")
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' });


describe("video route", () => {
    test("404 - Non existent user id", async () => {

        let nonexitentUserId = "1234";

        nockInstance
            .get(`/api/users/${nonexitentUserId}`)
            .reply(404);

        let req = new RequestWithUserIdHeader(userIdHeader, nonexitentUserId);
        let res = new ResponseWithSend();

        await videoRoute(req, res);

        expect(res.statusCalledWith).toBe(404);
        expect(res.sendCalledWith).toBe("Not found");
    });

    test("400 - No userId in request header", async () => {

        let req = new RequestWithUserIdHeader(userIdHeader);
        let res = new ResponseWithSend();

        await videoRoute(req, res);

        expect(res.statusCalledWith).toBe(400);
        expect(res.sendCalledWith).toBe("Bad request");
    });
})