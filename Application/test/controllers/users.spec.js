const path = require("path");
const mockUsers = require("../_mocks_/users");
const { users: usersRoute } = require(path.resolve("controllers"));
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

        await usersRoute.allUsers(req, res);

        expect(res.statusCalledWith).toBe(200)
        expect(res.jsonCalledWith).toEqual(mockUsers);

    });

    test("404 - not found error", async () => {

        nockInstance
            .get("/api/users")
            .reply(404, {});

        let req = {}
        let res = new ResponseWithSend();

        await usersRoute.allUsers(req, res);

        expect(res.statusCalledWith).toBe(404)
        expect(res.sendCalledWith).toBe("Not found");
    });

    test("500 - not found error", async () => {

        nockInstance
            .get("/api/users")
            .reply(500, {});

        let req = {}
        let res = new ResponseWithSend();

        await usersRoute.allUsers(req, res);

        expect(res.statusCalledWith).toBe(500)
        expect(res.sendCalledWith).toBe("Server error");
    });
})

describe("Route - user streams by id", () => {

    test("200 - response with correct user id", async () => {
        const expectedUser = mockUsers[2];
        nockInstance
            .get(`/api/users/${expectedUser.id}`)
            .reply(200, expectedUser);

        let req = new RequestWithUserIdParams(expectedUser.id);
        let res = new ResponseWithJson();

        await usersRoute.getStreamsById(req, res);

        expect(res.statusCalledWith).toBe(200)
        expect(res.jsonCalledWith).toEqual({ activeStreams: expectedUser.activeStreams });
    })

    test("400 - response without user id param", async () => {
        const expectedUser = mockUsers[2];
        expectedUser.id = null;
        nockInstance
            .get(`/api/users/${expectedUser.id}`)
            .reply(400);

        let req = new RequestWithUserIdParams(expectedUser.id);
        let res = new ResponseWithSend();

        await usersRoute.getStreamsById(req, res);

        expect(res.statusCalledWith).toBe(400)
        expect(res.sendCalledWith).toEqual("Bad request");
    })

    test("404 - response with incorrect user id", async () => {
        const expectedUser = mockUsers[2];
        nockInstance
            .get(`/api/users/${expectedUser.id}`)
            .reply(404, expectedUser);

        let req = new RequestWithUserIdParams(expectedUser.id);
        let res = new ResponseWithSend();

        await usersRoute.getStreamsById(req, res);

        expect(res.statusCalledWith).toBe(404)
        expect(res.sendCalledWith).toEqual("Not found");
    })

    test("500 - server error", async () => {
        const expectedUser = mockUsers[2];
        nockInstance
            .get(`/api/users/${expectedUser.id}`)
            .reply(500);

        let req = new RequestWithUserIdParams(expectedUser.id);
        let res = new ResponseWithSend();

        await usersRoute.getStreamsById(req, res);

        expect(res.statusCalledWith).toBe(500)
        expect(res.sendCalledWith).toEqual("Server error");
    })
})