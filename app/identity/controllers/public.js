const fs = require("fs");

const loginPage = async (req, resp) => {
    loadHTML("/../public/index.html", resp);
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
    activationPage: activationPage,
};