const User1 = require('./User1');

class FSI extends User1 {
    constructor(usernameFSI, password, email, phoneNumber) {
        super( password, email, phoneNumber);
        this.usernameFSI=usernameFSI;
    }
   
}


module.exports = FSI;
