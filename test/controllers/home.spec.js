const path = require("path");
const {home: homeRoute} = require(path.resolve("controllers"));
const { ResponseWithSend } = require("../utils")

describe("All users route", () => {

    test("Route responds successfully", async () => {

        let req = {}
        let res = new ResponseWithSend();

        await homeRoute(req, res);

        expect(res.statusCalledWith).toBe(200)
        expect(res.sendCalledWith).toBe("Home page");
    });
});