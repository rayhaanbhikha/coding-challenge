const axios = require("axios");
const path = require("path");
const { dbPORT, dbHOST} = require(path.resolve("config"));

const api = axios.create({
    baseURL: `http://${dbHOST}:${dbPORT}/api/`
});

async function updateUser(userId, user) {
    let { data } = await api.put(`/users/${userId}`, user);
    return data;
}

async function getUserById(userId) {
    const { data } = await api.get(`/users/${userId}`);
    return data;
}

async function getAllUsers() {
    let { data } = await api.get("/users");
    return data;
}

module.exports = {
    getUserById,
    getAllUsers,
    updateUser
}