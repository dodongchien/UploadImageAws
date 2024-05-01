const { runningTournament } = require("../models/index");

const runningServices = {
  create: ({ name, images, startDate, endDate }) =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await runningTournament.create({
          name,
          images,
          startDate,
          endDate,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
  getAll: () =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await runningTournament.findAll();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
};

module.exports = runningServices;
