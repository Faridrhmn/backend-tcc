var dbConn = require("../db");

var Book = function(book) {
    this.idBuku = book.idBuku;
    this.kategori = book.kategori;
    this.namaBuku = book.namaBuku;
    this.harga = book.harga;
    this.stok = book.stok;
    this.penerbit = book.penerbit;
};

Book.create = function(newBook, result) {
    dbConn.query("INSERT INTO buku (IDBuku, Kategori, NamaBuku, Harga, Stok, Penerbit) VALUES (?, ?, ?, ?, ?, ?)", [
        newBook.idBuku,
        newBook.kategori,
        newBook.namaBuku,
        newBook.harga,
        newBook.stok,
        newBook.penerbit
    ], function(err, res) {
        if (err) {
            console.error("Error inserting book: ", err);
            result(err, null);
        } else {
            console.log("Book created with ID:", res.insertId);
            result(null, res.insertId);
        }
    });
};

Book.delete = function(idBuku, result) {
    dbConn.query("DELETE FROM buku WHERE IDBuku = ?", [idBuku], function(err, res) {
        if (err) {
            console.error("Error deleting book: ", err);
            result(err, null);
        } else {
            result(null, res.affectedRows);
        }
    });
};

Book.update = function(idBuku, book, result) {
    dbConn.query("UPDATE buku SET Kategori = ?, NamaBuku = ?, Harga = ?, Stok = ?, Penerbit = ? WHERE IDBuku = ?", [
        book.kategori,
        book.namaBuku,
        book.harga,
        book.stok,
        book.penerbit,
        idBuku
    ], function(err, res) {
        if (err) {
            console.error("Error updating book: ", err);
            result(err, null);
        } else {
            result(null, res.affectedRows);
        }
    });
};

Book.getAll = function(result) {
    dbConn.query("SELECT * FROM buku", function(err, res) {
        if (err) {
            console.error("Error fetching all books: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Book.searchByName = function(search, result) {
    dbConn.query("SELECT * FROM buku WHERE NamaBuku LIKE ?", ['%' + search + '%'], function(err, res) {
        if (err) {
            console.error("Error searching books by name: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Book.getById = function(idBuku, result) {
    dbConn.query("SELECT * FROM buku WHERE IDBuku = ?", [idBuku], function(err, res) {
        if (err) {
            console.error("Error fetching book by ID: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Book.getLowestStockBook = function(result) {
    dbConn.query("SELECT * FROM buku ORDER BY Stok LIMIT 1", function(err, res) {
        if (err) {
            console.error("Error fetching book with lowest stock: ", err);
            result(err, null);
        } else {
            result(null, res[0]);
        }
    });
};

module.exports = Book;
