module.exports = {
    userIdHeader: "user-id",
    concurrentStreamLimit: 3,
    dbHOST: process.env.DB_HOST || "localhost",
    dbPORT: parseInt(process.env.DB_PORT, 10) || 3000,
    port: parseInt(process.env.PORT, 10) || 8080
}