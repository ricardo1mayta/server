var userModel = require("../models/user-model.js");
var userService = {
    getAllUser: getAllUser,
    getUserById: getUserById,
    getUserByIdparent: getUserByIdparent,
    getUserByIdparent2: getUserByIdparent2,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllMenu: getAllMenu,
    getSubsedes: getSubsedes,
};

function addUser(userData) {
    return new Promise((resolve, reject) => {
        userModel.addUser(userData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function updateUser(id, userData, callback) {
    return new Promise((resolve, reject) => {
        userModel.updateUser(id, userData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        userModel.deleteUser(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllUser(id) {
    return new Promise((resolve, reject) => {
        userModel.getAllUser(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllMenu(id) {
    return new Promise((resolve, reject) => {
        userModel.getAllMenu(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        userModel.getUserById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getUserByIdparent(id) {
    return new Promise((resolve, reject) => {
        userModel.getUserByIdParent(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getUserByIdparent2(id) {
    return new Promise((resolve, reject) => {
        userModel.getUserByIdParent2(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getSubsedes(id) {
    return new Promise((resolve, reject) => {
        userModel.getSubsedes(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
module.exports = userService;