const { products, signup, signin, getProductById } = require("../controllers/customer.controller");
const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");

module.exports = function(app) {
  app.get("/api/v1/customer/products", [authJwt.verifyToken], products);
  app.get("/api/v1/customer/products/:id", [authJwt.verifyToken], getProductById);

  app.post("/api/v1/customer/signup", [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  signup
  );

  app.post("/api/v1/customer/signin", signin);
};
