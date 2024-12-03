let validPassword = (password) => {
    if (password.length < 3) {
        return true;
    } else {
        return false;
    }
}

module.exports = validPassword;
