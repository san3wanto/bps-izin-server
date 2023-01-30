import User from "../models/UserModel.js";
// middle ware ini untuk memproteksi endpointnya

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun anda" });
  }
  //kemudian mengambil user dari datbase
  const user = await User.findOne({
    where: {
      uuid: req.session.userId, //mencari user berdasarkan uuid, karena session yang terset adalah uuid
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  //kemudian mengambil user dari datbase
  const user = await User.findOne({
    where: {
      uuid: req.session.userId, //mencari user berdasarkan uuid, karena session yang terset adalah uuid
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "admin") return res.status(403).json({ msg: "Akses ditolak" });
  next();
};
