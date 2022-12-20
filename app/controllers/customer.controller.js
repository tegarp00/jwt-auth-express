const db = require("../models")
const Product = db.product
const config = require("../config/auth.config");
const Customer = db.customer
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  Customer.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(customer => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          customer.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        customer.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Customer.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(customer => {
      if (!customer) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        customer.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: customer.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      customer.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: customer.id,
          username: customer.username,
          email: customer.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.products = async (req, res) => {
    const products = await Product.findAll();
    if(!products) {
        res.status(404).json({
            message: "Products tidak ditemukan",
            data: []
        })
    }
    res.status(200).json({
        message: "Products berhasil didapatkan",
        data: products
    })
};

exports.getProductById = async (req, res) => {

  const { id } = req.params
  const product = await Product.findByPk(id)
  if(!product) {
    res.status(404).json({
      message: "Product tidak ditemukan",
      data: []
    })
  }

  res.status(200).json({
    message: "Product berhasil didapatkan",
    data: product
  })
}