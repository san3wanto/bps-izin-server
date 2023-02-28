import { Sequelize } from "sequelize";

const db = new Sequelize("freedb_sizinbps", "freedb_usersizin", "FJ%pwUV4wn@9!Xv", {
  host: "sql.freedb.tech",
  dialect: "mysql",
});
// const db = new Sequelize("sizinbps", "root", "", {
//   host: "127.0.0.1",
//   dialect: "mysql",
// });

// jangan goblok

export default db;
