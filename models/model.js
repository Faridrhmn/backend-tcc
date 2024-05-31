var dbConn = require("../db");
const bcrypt = require('bcrypt');

var Account = function(user) {
    this.username = user.username;
    this.password = user.password;
};

// Create a new account with hashed password
Account.create = function(newAccount, result) {
    bcrypt.hash(newAccount.password, 10, function(err, hash) {
        if (err) {
            console.error("Error hashing password:", err);
            result(err, null);
        } else {
            const query = "INSERT INTO akun (username, password) VALUES (?, ?)";
            dbConn.query(query, [newAccount.username, hash], function(err, res) {
                if (err) {
                    console.error("Error inserting into database:", err);
                    result(err, null);
                } else {
                    console.log("Inserted ID:", res.insertId);
                    result(null, res.insertId);
                }
            });
        }
    });
};

// Find a user and compare passwords
Account.findUser = function(newAccount, result) {
    const query = "SELECT * FROM akun WHERE username = ?";
    dbConn.query(query, [newAccount.username], function(err, res) {
        if (err) {
            console.error("Error querying database:", err);
            result(err, null);
        } else {
            if (res.length > 0) {
                const storedPassword = res[0].Password;
                console.log("Stored password from database found for user.", storedPassword);

                bcrypt.compare(newAccount.password, storedPassword, function(err, isMatch) {
                    if (err) {
                        console.error("Error comparing passwords:", err);
                        result(err, null);
                    } else if (isMatch) {
                        console.log("User authenticated successfully.");
                        result(null, res);
                    } else {
                        console.log("Incorrect password.");
                        result(null, []);
                    }
                });
            } else {
                console.log("No user found with the given username.");
                result(null, []);
            }
        }
    });
};

module.exports = Account;
