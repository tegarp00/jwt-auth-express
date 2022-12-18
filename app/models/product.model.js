module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      title: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      categories: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      }
    });
  
    return Product;
  };