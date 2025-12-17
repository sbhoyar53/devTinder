const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName,lastName,emailId,password } = req.body;

    if(!firstName || !lastName){
       throw new Error("Please enter valid firstname and lastName");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Plaese enter valid email address.");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Plaese enter a strong password.");
    }
};

module.exports = { validateSignupData, };