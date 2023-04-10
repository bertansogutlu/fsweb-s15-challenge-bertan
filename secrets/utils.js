const {JWT_SECRET} = require('./secretToken');
const JWT = require('jsonwebtoken');

exports.createUserToken = (payload,time)=>{
    return JWT.sign(payload,JWT_SECRET,{expiresIn: time})
}