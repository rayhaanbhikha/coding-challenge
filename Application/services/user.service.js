const path = require('path');
const { User } = require(path.resolve("db"));

async function incrementCount(userId) {
    let user = await User.getUserById(userId);
    user.activeStreams += 1;
    return await User.updateUser(userId, user);
}

module.exports = {
    incrementCount
}