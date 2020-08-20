const Sequelize = require("sequelize");
const sequelize = new Sequelize("tgbot", "tgbot", "eM3gK0qQ", {
  dialect: "mysql",
  host: "188.120.232.140",
  port: 3311,
  define: {
    timestamps: false
  },
  logging: false, 
});

  sequelize.sync().then(result => {
    //console.log(result);
  })
  .catch(err => {
    console.log(err)
  });

module.exports = sequelize;