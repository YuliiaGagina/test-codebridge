const { Dog } = require("../../models");

const addDog = async (req, res) => {
  const { name } = req.body;

  const existingDog = await Dog.findOne({ where: { name: name } });
  if (existingDog) {
    throw new Error(`The dog with ${name} already exists`);
  }

  const dog = await Dog.create({ ...req.body });

  res.status(201).json({
    message: "success",
    code: 201,
    data: {
      dog,
    },
  });
};

module.exports = addDog;
