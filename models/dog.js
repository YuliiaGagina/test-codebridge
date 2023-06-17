const Sequelize = require("sequelize");
const { body } = require("express-validator");
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "database.sqlite",
});

const Dog = sequelize.define("dog", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: {
      args: true,
      msg: "Name must be unique",
    },
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tail_length: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
    },
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
    },
  },
});

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Dog table created successfully.");
  })
  .catch((error) => {
    console.error("Unable to create the Dog table:", error);
  });

const createDogValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("color").notEmpty().withMessage("Color is required"),
  body("tail_length")
    .isInt({ min: 1 })
    .withMessage("Tail length must be a positive integer"),
  body("weight")
    .isInt({ min: 1 })
    .withMessage("Weight must be a positive integer"),
];

module.exports = {
  Dog,
  createDogValidation,
};
