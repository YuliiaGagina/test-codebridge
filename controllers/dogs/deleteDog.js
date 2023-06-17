const { Dog } = require("../../models");

const deleteDog = async (req, res) => {
  const { id } = req.params;

  try {
    const dog = await Dog.findByPk(id);

    if (!dog) {
      throw new Error(`Dog with id ${id} not found`);
    }

    await dog.destroy();

    res.json({
      status: "success",
      code: 200,
      data: {
        message: `Dog with id ${id} has been deleted successfully`,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

module.exports = deleteDog;
