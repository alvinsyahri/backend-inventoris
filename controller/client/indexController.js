const Loan = require('../../model/Loan')
const User = require('../../model/User')
const Item = require('../../model/Item')

module.exports = {
    viewPeminjaman : async(req, res) => {
        try {
            const loan = await Loan.find({ "userId": req.username.id })
            .sort({ createdAt: -1 })
            .populate(
                {
                    path: 'itemId',
                    select: 'name serialNumber procurementYear condition qty description',
                    populate: {
                        path: 'subCategoryId',
                        select: 'name',
                        populate: {
                            path: 'categoryId',
                            select: 'name'
                        }
                    }

                }
            )
            .populate(
                {
                    path: 'userId',
                    select: 'name'
                }
            );
            res.status(200).json({
                'data' : loan
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    addPeminjaman : async(req, res) => {
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
    scanBarang : async(req, res) => {
        
    }
}