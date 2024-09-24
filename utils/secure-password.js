const bcrypt = require("bcrypt");


const passwordEncryption = async (password)=>{

    const salt = await bcrypt.genSalt(12);

    const hash = await bcrypt.hash(password, salt);

    return hash;

}

const passwordChecker = async (frontedPassword,dbPassword)=>{
    const passwordVerification = await bcrypt.compare(frontedPassword,dbPassword);
    return passwordVerification;
}

module.exports = {passwordEncryption,passwordChecker};