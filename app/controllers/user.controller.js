const db = require("../models")
const Product = db.product


 exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };


  // product
exports.createProduct = (req, res) => {
  // create product
  Product.create({
    title: req.body.title,
    desc: req.body.desc,
    categories: req.body.categories,
    price: req.body.price
  }).then(product => {
    if(!req.body.title || !req.body.desc || !req.body.categories || !req.body.price) {
      res.status(400).json({
        message: "wajib diisi semua"
      })
    }
    res.status(200).json({
      message: "product berhasil ditambahkan",
      data: product
    })
  })
}