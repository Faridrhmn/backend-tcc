const Book = require("../models/modelBuku");

// Create a new book
exports.create = function (req, res) {
    const new_book = new Book(req.body);

    // Validate request
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please provide all required fields" });
    } else {
        Book.create(new_book, function (err, bookId) {
            if (err) {
                res.status(500).send({ error: true, message: err });
            } else {
                res.status(201).json({
                    error: false,
                    message: "Book added successfully!",
                    data: { id: bookId },
                });
            }
        });
    }
};

// Delete a book by ID
exports.delete = function (req, res) {
    Book.delete(req.params.idBuku, function (err, affectedRows) {
        if (err) {
            res.status(500).send({ error: true, message: err });
        } else {
            if (affectedRows === 0) {
                res.status(404).send({ error: true, message: "Book not found" });
            } else {
                res.json({
                    error: false,
                    message: "Book deleted successfully!",
                });
            }
        }
    });
};

// Update a book by ID
exports.update = function (req, res) {
    const updated_book = new Book(req.body);

    // Validate request
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please provide all required fields" });
    } else {
        Book.update(req.params.idBuku, updated_book, function (err, affectedRows) {
            if (err) {
                res.status(500).send({ error: true, message: err });
            } else {
                if (affectedRows === 0) {
                    res.status(404).send({ error: true, message: "Book not found" });
                } else {
                    res.json({
                        error: false,
                        message: "Book updated successfully!",
                    });
                }
            }
        });
    }
};

// Get all books
exports.getAll = function (req, res) {
    Book.getAll(function (err, books) {
        if (err) {
            res.status(500).send({ error: true, message: err });
        } else {
            res.json({
                error: false,
                message: "Books retrieved successfully!",
                data: books,
            });
        }
    });
};

// Get a book by ID
exports.getById = function (req, res) {
    Book.getById(req.params.idBuku, function (err, book) {
        if (err) {
            res.status(500).send({ error: true, message: err });
        } else {
            if (book.length === 0) {
                res.status(404).send({ error: true, message: "Book not found" });
            } else {
                res.json({
                    error: false,
                    message: "Book retrieved successfully!",
                    data: book[0],
                });
            }
        }
    });
};

// Search books by name
exports.searchByName = function (req, res) {
    Book.searchByName(req.query.name, function (err, books) {
        if (err) {
            res.status(500).send({ error: true, message: err });
        } else {
            res.json({
                error: false,
                message: "Books retrieved successfully!",
                data: books,
            });
        }
    });
};

exports.getLowestStockBook = function (req, res) {
    Book.getLowestStockBook(function (err, book) {
        if (err) {
            res.status(500).send({ error: true, message: err });
        } else {
            res.json({
                error: false,
                message: "Book with lowest stock retrieved successfully!",
                data: book,
            });
        }
    });
};