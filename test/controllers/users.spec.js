const path = require("path");
const mockUsers = require("../_mocks_/users");
const { allUsers, getStreamsById } = require(path.resolve("controllers", "users.js"));
const { ResponseWithSend, ResponseWithJson, RequestWithUserIdParams } = require("../utils")

const nock = require("nock");
const nockInstance = nock("http://localhost:3000")
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })


describe("Route - all users", () => {

    test("Successful response", async () => {

        nockInstance
            .get("/api/users")
            .reply(200, mockUsers);

        let req = {}
        let res = new ResponseWithJson();

        await allUsers(req, res);

        expect(res.statusCalledWith).toBe(200)
        expect(res.jsonCalledWith).toEqual(mockUsers);

    });

    test("404 - not found error", async () => {

        nockInstance
            .get("/api/users")
            .reply(404, {});

        let req = {}
        let res = new ResponseWithSend();

        await allUsers(req, res);

        expect(res.statusCalledWith).toBe(404)
        expect(res.sendCalledWith).toBe("Not found");
    });

    test("500 - not found error", async () => {

        nockInstance
            .get("/api/users")
            .reply(500, {});

        let req = {}
        let res = new ResponseWithSend();

        await allUsers(req, res);

        expect(res.statusCalledWith).toBe(500)
        expect(res.sendCalledWith).toBe("Server error");
    });
})