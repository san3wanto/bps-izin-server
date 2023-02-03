import Izin from "../models/IzinModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getIzin = async (req, res) => {
  try {
    let response;
    if (req.role == "admin" || "user") {
      response = await Izin.findAll({
        attributes: ["uuid", "name", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["name", "email", "nip", "jab"],
          },
        ],
      });
    } else {
      response = await Izin.findAll({
        attributes: ["uuid", "name", "createdAt"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "nip", "jab"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getIzinById = async (req, res) => {
  try {
    const izin = await Izin.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!izin) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role == "admin") {
      response = await Izin.findOne({
        attributes: ["uuid", "name", "createdAt"],
        where: {
          id: izin.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Izin.findOne({
        attributes: ["uuid", "name", "createdAt"],
        where: {
          [Op.and]: [{ id: izin.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createIzin = async (req, res) => {
  const { name } = req.body;
  try {
    await Izin.create({
      name: name,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Izin telah ditambahkan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateIzin = async (req, res) => {
  try {
    const izin = await Izin.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!izin) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name } = req.body;
    if (req.role == "admin") {
      await Izin.update(
        { name },
        {
          where: {
            id: izin.id,
          },
        }
      );
    } else {
      if (req.userId !== izin.userId) return res.status(403).json({ msg: "akses ditolak" });
      await Izin.update(
        { name },
        {
          where: {
            [Op.and]: [{ id: izin.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Izin telah diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteIzin = async (req, res) => {
  try {
    const izin = await Izin.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!izin) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name } = req.body;
    if (req.role == "admin") {
      await Izin.destroy({
        where: {
          id: izin.id,
        },
      });
    } else {
      if (req.userId !== izin.userId) return res.status(403).json({ msg: "akses ditolak" });
      await Izin.destroy({
        where: {
          [Op.and]: [{ id: izin.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Data izin telah dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
