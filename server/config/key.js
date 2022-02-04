if(process.env.NODE_ENV === "production"){
    module.exports = require("./production.js");
    //배포상태
}else{
    //개발상태
    module.exports = require("./dev.js");
}