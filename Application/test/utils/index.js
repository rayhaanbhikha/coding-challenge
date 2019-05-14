const res = {
    statusCalledWith: '',
    sendCalledWith: '',
    status: function (status) {
        this.statusCalledWith = status;
    },
    send: function (message) {
        this.sendCalledWith = message;
    }
}

function ResponseWithSend() {
    this.statusCalledWith = '';
    this.sendCalledWith = '';
    this.status = function (status) {
        this.statusCalledWith = status;
    };
    this.send = function (message) {
        this.sendCalledWith = message;
    };
}

function ResponseWithJson() {
    this.statusCalledWith = '';
    this.jsonCalledWith = '';
    this.status = function (status) {
        this.statusCalledWith = status;
    };
    this.json = function (json) {
        this.jsonCalledWith = json;
    };
}

function RequestWithUserIdParams(userId) {
    this.params = {
        userId
    }
}

function RequestWithUserIdHeader(header, userId=null) {
    this.params = {
        userId
    }
    this.headers = {
        [header]: userId
    }
}

module.exports = {
    ResponseWithSend,
    ResponseWithJson,
    RequestWithUserIdParams,
    RequestWithUserIdHeader
}