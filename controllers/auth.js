// membuat fungsi login dan logout

import Users from "../models/UserModel.js";
import argon2 from "argon2";
import session from "express-session";

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email, //mencari berdasarkan email
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  //memverifikasi user ketika user ditemukan
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Password Salah" });
  // jika cocok ankan mencari sessionnya
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const nip = user.nip;
  const email = user.email;
  const jab = user.jab;
  const role = user.role;
  res.status(200).json({ uuid, name, nip, email, role, jab });
};

//fungsi untuk get user login, berguna untuk frontend
export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun anda" });
  }
  //kemudian mengambil user dari datbase
  const user = await Users.findOne({
    attributes: ["uuid", "name", "nip", "email", "role", "jab"],
    where: {
      uuid: req.session.userId, //mencari user berdasarkan uuid, karena session yang terset adalah uuid
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

//fungsi untuk logout
export const LogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    //jika tidak terdapat error
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
