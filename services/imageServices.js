const { Image } = require("../models/index");
const imagesServices = {
  create: ({ images }) =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await Image.create({ images });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
  findAll: () =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await Image.findAll();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
  findOne: (id) =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await Image.findByPk(id);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
};
module.exports = imagesServices;
