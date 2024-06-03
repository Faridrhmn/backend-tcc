const Account = require("../models/model");

// Controller for finding a user
exports.findUser = function(req, res) {
    console.log("Controller: findUser");

    // Ensure both username and password are provided
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ error: true, message: "Please provide both username and password" });
    }

    const newAccount = {
        username: req.body.username,
        password: req.body.password
    };

    // Call the model's findUser function
    Account.findUser(newAccount, function(err, account) {
        if (err) {
            console.error("Error finding user:", err);
            return res.status(500).send({ error: 'Internal server error' });
        } else if (account.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        } else {
            return res.status(201).json({
                status: "success",
                message: "akun ditemukan",
                data: account
            });
        }
    });
};

// Controller for creating a new account
exports.create = function(req, res) {
    console.log("Controller: create");

    // Ensure both username and password are provided
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ error: true, message: "Please provide both username and password" });
    }

    const newAccount = new Account({
        username: req.body.username,
        password: req.body.password
    });

    // Call the model's create function
    Account.create(newAccount, function(err, account) {
        if (err) {
            console.error("Error creating account:", err);
            return res.status(500).send({ error: true, message: "Internal server error" });
        } else {
            return res.status(201).json({
                status: "success",
                message: "Account created successfully",
                data: account
            });
        }
    });
};
