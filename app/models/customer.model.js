module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return Customer;
  };