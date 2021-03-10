const fs = require("fs");

const loginPage = async (req, resp) => {
    loadHTML("/../public/login.html", resp);
};

const registerPage = async (req, resp) => {
    loadHTML("/../public/register.html", resp);
};

const activationPage = async (req, resp) => {
    loadHTML("/../public/activation.html", resp);
};

const loadHTML = (path, resp) => {
    fs.readFile(__dirname + path, 'utf8', (err, text) => {
        if (err) {
            console.log(err);
        }
        resp.send(text);
    });
};

module.exports = {
    loginPage: loginPage,
    registerPage: registerPage,
    activationPage: activationPage,
};