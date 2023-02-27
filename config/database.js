import { Sequelize } from "sequelize";

const db = new Sequelize("sizinbps", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

export default db;
