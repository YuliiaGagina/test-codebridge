const { Dog } = require("../../models");
const Sequelize = require("sequelize");

const getAllandSort = async (req, res) => {
  const { attribute, order, page = 1, limit = 10 } = req.query;

  try {
    let dogs;

    if (attribute) {
      const validAttributes = ["name", "color", "tail_length", "weight"];
      const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

      if (validAttributes.includes(attribute)) {
        if (attribute === "tail_length" || attribute === "weight") {
          dogs = await Dog.findAndCountAll({
            order: [
              [Sequelize.literal(`CAST("${attribute}" AS DECIMAL)`), sortOrder],
            ],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit),
          });
        } else {
          dogs = await Dog.findAndCountAll({
            order: [[attribute, sortOrder]],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit),
          });
        }
      } else {
        res.status(400).json({ error: "Invalid attribute for sorting" });
        return;
      }
    } else {
      dogs = await Dog.findAndCountAll({
        order: [],
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
      });
    }

    const totalDogs = dogs.count;
    const totalPages = Math.ceil(totalDogs / parseInt(limit));
    const currentPage = parseInt(page);

    res.json({ dogs: dogs.rows, totalDogs, totalPages, currentPage });
  } catch (error) {
    console.error("Error retrieving dogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllandSort;
