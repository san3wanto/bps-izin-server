import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize"; //untuk menyimpan sesi agar saat server restart login session tidak terhapus
import UserRoute from "./routes/UserRoute.js";
import IzinRoute from "./routes/IzinRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

// untuk menyimpan session saat server restart
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});
// end

// jalankan sync untuk membuat database dan table
// (async () => {
//   await db.sync();
// })();
// setelah itu nonaktifkan dengan berik komentar, kemudian nonaktifkan juga import db
// end

//middle ware
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store, //menyimpan sesi login
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(IzinRoute);
app.use(AuthRoute);

// store.sync(); //memambahkan session ke database, nonaktifkan setelah berhasil menambahkan

app.listen(process.env.PORT || 3000, () => {
  console.log("Server up and running...");
});
