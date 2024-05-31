var Penerbit = require("../models/modelPenerbit");

// Create a new penerbit
exports.create = function (req, res) {
    const new_penerbit = new Penerbit(req.body);

    // Validate request
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please provide all required fields" });
    } else {
        Penerbit.create(new_penerbit, function (err, penerbitId) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    error: false,
                    message: "Penerbit added successfully!",
                    data: { id: penerbitId },
                });
            }
        });
    }
};

// Delete a penerbit by ID
exports.delete = function (req, res) {
    Penerbit.delete(req.params.idPenerbit, function (err, affectedRows) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                error: false,
                message: "Penerbit deleted successfully!",
                affectedRows: affectedRows,
            });
        }
    });
};

// Update a penerbit by ID
exports.update = function (req, res) {
    const updated_penerbit = new Penerbit(req.body);

    // Validate request
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please provide all required fields" });
    } else {
        Penerbit.update(req.params.idPenerbit, updated_penerbit, function (err, affectedRows) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    error: false,
                    message: "Penerbit updated successfully!",
                    affectedRows: affectedRows,
                });
            }
        });
    }
};

// Get all penerbits
exports.getAll = function (req, res) {
    Penerbit.getAll(function (err, penerbits) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                error: false,
                message: "Penerbits retrieved successfully!",
                data: penerbits,
            });
        }
    });
};

// Find penerbit by ID
exports.findById = function (req, res) {
    Penerbit.findById(req.params.idPenerbit, function (err, penerbit) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                error: false,
                message: "Penerbit retrieved successfully!",
                data: penerbit,
            });
        }
    });
};
