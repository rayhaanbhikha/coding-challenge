module.exports = {
    userIdHeader: process.env.USER_ID_HEADER || "x-user-id",
    concurrentStreamLimit: parseInt(process.env.CONCURRENT_STREAM_LIMIT, 10) || 3,
    dbHOST: process.env.DB_HOST || "localhost",
    dbPORT: parseInt(process.env.DB_PORT, 10) || 3000,
    port: parseInt(process.env.PORT, 10) || 8080
}