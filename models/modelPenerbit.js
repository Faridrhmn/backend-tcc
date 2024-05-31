var dbConn = require("../db");

var Penerbit = function(penerbit){
    this.idPenerbit = penerbit.idPenerbit;
    this.namaPenerbit = penerbit.namaPenerbit;
    this.alamat = penerbit.alamat;
    this.kota = penerbit.kota;
    this.telepon = penerbit.telepon;
};

Penerbit.create = function(newPenerbit, result){
    dbConn.query("INSERT INTO penerbit (IDPenerbit, NamaPenerbit, Alamat, Kota, Telepon) VALUES (?, ?, ?, ?, ?)", [
        newPenerbit.idPenerbit,
        newPenerbit.namaPenerbit,
        newPenerbit.alamat,
        newPenerbit.kota,
        newPenerbit.telepon
    ], function(err, res){
        if(err){
            console.log("error broo : ", err);
            result(err, null);
        } else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Penerbit.delete = function(idPenerbit, result){
    dbConn.query("DELETE FROM penerbit WHERE IDPenerbit = ?", [idPenerbit], function(err, res){
        if(err){
            console.log("error broo : ", err);
            result(err, null);
        } else{
            result(null, res.affectedRows);
        }
    });
};

Penerbit.update = function(idPenerbit, penerbit, result){
    dbConn.query("UPDATE penerbit SET NamaPenerbit = ?, Alamat = ?, Kota = ?, Telepon = ? WHERE IDPenerbit = ?", [
        penerbit.namaPenerbit,
        penerbit.alamat,
        penerbit.kota,
        penerbit.telepon,
        idPenerbit
    ], function(err, res){
        if(err){
            console.log("error broo : ", err);
            result(err, null);
        } else{
            result(null, res.affectedRows);
        }
    });
};

Penerbit.findById = function(idPenerbit, result){
    dbConn.query("SELECT * FROM `penerbit` WHERE IDPenerbit = ?", [idPenerbit], function(err, res){
        if(err){
            console.log("error broo : ", err);
            result(err, null);
        } else{
            result(null, res);
        }
    });
};

Penerbit.getAll = function(result) {
    dbConn.query("SELECT * FROM `penerbit`", function(err, res) {
        if(err) {
            console.log("error broo : ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Penerbit;