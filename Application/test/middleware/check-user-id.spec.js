const path = require("path");
const { checkUserId } = require(path.resolve("middleware"));
const { userIdHeader } = require(path.resolve("config"));
const { ResponseWithSend, RequestWithUserIdHeader } = require("../utils")


describe("Check user id middleware", () => {

    test("user id exists in header", async () => {

        let nonExistentUserId = "1234"
        let req = new RequestWithUserIdHeader(userIdHeader, nonExistentUserId)
        let res = {};
        let cb = jest.fn();

        checkUserId(req, res, cb);
        expect(cb.mock.calls.length).toBe(1)
    });

    test("user id does not exist in header", () => {
        let req = {
            headers: {}
        }
        let res = new ResponseWithSend();
        let cb = jest.fn();

        checkUserId(req, res, cb);

        expect(res.statusCalledWith).toBe(400)
        expect(res.sendCalledWith).toBe("Bad request");
    })
});