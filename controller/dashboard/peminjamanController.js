const Item = require("../../model/Item");
const Loan = require("../../model/Loan");
const User = require("../../model/User");
const getDate = require("../../middleware/date");
const axios = require("axios");

module.exports = {
  viewPeminjaman: async (req, res) => {
    try {
      const loan = await Loan.find({ status: true })
        .sort({ createdAt: -1 })
        .populate({
          path: "itemId",
          select: "name serialNumber procurementYear condition qty description",
          populate: {
            path: "subCategoryId",
            select: "name",
            populate: {
              path: "categoryId",
              select: "name",
            },
          },
        })
        .populate({
          path: "userId",
          select: "name username isAdmin",
        });
      res.status(200).json({
        status: "Success",
        data: loan,
      });
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: error.message,
      });
    }
  },
  addPeminjaman: async (req, res) => {
    try {
      const { userId, itemId, qty, description } = req.body;
      const jumlah = qty ? qty : 1;
      const data = {
        userId,
        itemId,
        description,
        qty: jumlah,
      };
      const item = await Item.findOne({ _id: itemId });
      if (item.qty > 0) {
        if (jumlah <= item.qty) {
          await Loan.create(data);
          const user = await User.findOne({ _id: userId });
          const stok = item.qty;
          item.qty = stok - jumlah;
          item.save();
          const text = `Loan Data: %0A - User Name: ${user.name} %0A - Items: ${
            item.name
          } %0A - Loan Date: ${getDate(
            new Date()
          )} %0A - Description: ${description}`;
          await axios.get(
            `https://api.telegram.org/bot6390829982:AAGD5YB4WrQhMoVbXCLdYSDokCT2BgZPfwI/sendMessage?chat_id=-953171747&text=${text}`
          );
          res.status(200).json({
            status: "Success Add",
          });
        } else {
          res.status(400).json({
            status: "stok tidak mencukupi",
          });
        }
      } else {
        res.status(400).json({
          status: "barang sedang dipinjam",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: error.message,
      });
    }
  },
  editPeminjaman: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, itemId, qty, description } = req.body;
      const jumlah = qty ? qty : 1;
      const data = {
        userId,
        itemId,
        qty: jumlah,
        description,
        updatedAt: new Date(),
      };
      const loan = await Loan.findOne({ _id: id });
      const item = await Item.findOne({ _id: itemId });
      const changeItemQty = await Item.findOne({ _id: loan.itemId });

      if (item.qty > 0) {
        changeItemQty.qty = loan.qty + changeItemQty.qty;
        changeItemQty.save();
        // console.log(jumlah <= item.qty)
        if (jumlah <= item.qty) {
          await Loan.findByIdAndUpdate(id, data);
          const item = await Item.findOne({ _id: itemId });
          item.qty = item.qty - qty;
          item.save();
          res.status(200).json({
            status: "Success Edit",
          });
        } else {
          changeItemQty.qty = loan.qty - changeItemQty.qty;
          changeItemQty.save();
          res.status(400).json({
            status: "stok tidak mencukupi",
          });
        }
      } else {
        res.status(400).json({
          status: "barang sedang dipinjam",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: error.message,
      });
    }
  },
  checkPeminjaman: async (req, res) => {
    try {
      const { id } = req.params;
      const { description, condition } = req.body;
      const user = await User.findOne({ _id: req.username.id });
      const dataLoan = {
        status: false,
        returnDate: new Date(),
      };
      const loan = await Loan.findByIdAndUpdate(id, dataLoan);
      const item = await Item.findOne({ _id: loan.itemId });
      console.log(item);
      item.qty = item.qty + loan.qty;
      item.description = description;
      item.condition = condition;
      item.save();

      const text = `Return Date: %0A - User Name: ${user.name} %0A -Items: ${
        item.name
      } %0A - Loan Date: ${getDate(loan.loanDate)} %0A - Return Date: ${getDate(
        new Date()
      )}`;
      await axios.get(
        `https://api.telegram.org/bot6390829982:AAGD5YB4WrQhMoVbXCLdYSDokCT2BgZPfwI/sendMessage?chat_id=-953171747&text=${text}`
      );

      res.status(200).json({
        status: "Success Check",
        text: text,
      });
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: error.message,
      });
    }
  },
};
