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

exports.updateProduct = async (req, res) => {

  const { id } = req.params;
  // update product
  const product = await Product.findByPk(id);
  if(!product) {
    res.status(400).json({
      message: "ID product tidak ditemukan"
    })
  }

  const { title, desc, categories, price } = req.body
  
  try {
    const updateProduct = await product.update({ title, desc, categories, price })
    res.status(200).json({
      message: "product berhasil diupdate",
      data: updateProduct
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}