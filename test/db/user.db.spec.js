const path = require("path");
const mockUsers = require("../_mocks_/users")
const { User } = require(path.resolve("db"));

const nock = require("nock");
const nockInstance = nock("http://localhost:3000")
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })

describe("DB operations", () => {
    const expectedUser = mockUsers[1];

    test("User by id", async () => {
        nockInstance
            .get(`/api/users/${expectedUser.id}`)
            .reply(200, expectedUser);

        const user = await User.getUserById(expectedUser.id);
        expect(user).toMatchObject(expectedUser);
    })

    test("All users", async () => {
        nockInstance
            .get(`/api/users`)
            .reply(200, mockUsers);

        const users = await User.getAllUsers();
        expect(users).toMatchObject(mockUsers);
    })
})