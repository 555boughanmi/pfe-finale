//models/Admins.js
const User1 = require("./User1");
class Admin extends User1 {
    constructor(usernameAdmin, password, email, phoneNumber) {
        super( password, email, phoneNumber);
        this.usernameAdmin=usernameAdmin;
    }
}

module.exports = Admin;