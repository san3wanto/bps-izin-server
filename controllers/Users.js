import User from "../models/UserModel.js";
import argon2 from "argon2"; // import argon untuk menghash password

export const getUser = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "nip", "username", "jab", "email", "role", "status"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: " ini error" });
  }
}; //menggunakan asynchronous, juga trycatch blok

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "nip", "username", "jab", "email", "role", "status"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, nip, email, username, jab, password, confPassword, role, status } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      nip: nip,
      email: email,
      username: username,
      jab: jab,
      password: hashPassword,
      role: role,
      status: "Tersedia",
    });
    res.status(201).json({ msg: "Register berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, nip, email, password, jab, confPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm tidak cocok" });
  try {
    await User.update(
      {
        name: name,
        nip: nip,
        email: email,
        username: username,
        jab: jab,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUserStatus = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { status } = req.body;
  try {
    if (user.status === "Izin") {
      await User.update(
        {
          status: "Tersedia",
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      res.status(200).json({ msg: "User Tersedia di Kantor" });
    } else {
      await User.update(
        {
          status: "Izin",
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      res.status(200).json({ msg: "User sedang Izin" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
