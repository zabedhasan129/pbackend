let secureApi = (req, res, next) => {
    console.log(process.env.SECUREAPIPASS);

    if (req.headers.authorization == process.env.SECUREAPIPASS) {
        next();

    }
    else {
        res.send({ error: "not valid way" })
    }
};

module.exports = secureApi;