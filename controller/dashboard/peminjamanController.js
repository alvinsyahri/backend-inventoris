const Item = require('../../model/Item');
const Loan = require('../../model/Loan');
const User = require('../../model/User');
const getDate = require('../../middleware/date')
const axios = require('axios')

module.exports = {

    viewPeminjaman : async(req, res) => {
        try {
            const loan = await Loan.find({ 'status': true })
            .sort({ createdAt: -1 })
            .populate({
                path: 'itemId',
              })
            .populate({
                path: 'userId',
            });
            res.status(200).json({
                'status' : "Success",
                'data' : loan
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    addPeminjaman : async(req, res) => {
        try {
            const { userId, barangId, description } = req.body;
            const date = {
                userId,
                barangId,
                description
            };
            const item = await Item.findOne({ _id: barangId});
            if(!item.status){
                const peminjaman = await Loan.create(data);
                const user = await User.findOne({ _id: userId})           
                item.status = true;
                item.peminjamanId.push({ _id: peminjaman._id});
                item.save();
                const text = `Loan Data: %0A - User Name: ${user.name} %0A - Name of Goods: ${item.name} %0A - Loan Date: ${getDate(new Date())} %0A - Description: ${description}`
                await axios.get(`https://api.telegram.org/bot6390829982:AAGD5YB4WrQhMoVbXCLdYSDokCT2BgZPfwI/sendMessage?chat_id=-953171747&text=${text}`)
                res.status(200).json({
                    'status' : "Success",
                })
            }else{
                res.status(400).json({
                    'status' : "barang sedang dipinjam",
                })
            }
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    editPeminjaman : async(req, res) => {
        try {
            const { keterangan, userId, barangId } = req.body;
            const { id } = req.params
            const updatedAt = new Date()
            const itemUpdate = await Item.findOne({ _id: barangId})
            if(!itemUpdate.status){
                const loan =  await Loan.findOne({ _id: id})
                const updateItemId = loan.barangId;
    
                loan.keterangan = keterangan;
                loan.userId = userId;
                loan.barangId = barangId;
                loan.updatedAt = updatedAt;
                await loan.save();
    
                const item = await Item.findOne({ _id: updateItemId})
                item.status = false;
                item.save();
    
                itemUpdate.status = true;
                itemUpdate.save();
                res.status(200).json({
                    'status' : "Success Edit"
                })
            }else{
                res.status(400).json({
                    'status' : "barang sedang dipinjam"
                })
            }
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    checkPeminjaman: async(req, res) => {
        try {
            const { id } = req.params
            const user = await User.findOne({ _id: req.username.id})
            const loan =  await Loan.findOne({ _id: id})
            loan.status = false
            loan.tanggalKembali = new Date()
            loan.save()
            const item = await Item.findOne({ _id: loan.barangId})
            item.status = false;
            item.save();
            const text = `Return Date: %0A - User Name: ${user.name} %0A - Name of Goods: ${barang.name} %0A - Loan Date: ${getDate(peminjaman.tanggalPinjam)} %0A - Return Date: ${getDate(new Date())}`
            await axios.get(`https://api.telegram.org/bot6390829982:AAGD5YB4WrQhMoVbXCLdYSDokCT2BgZPfwI/sendMessage?chat_id=-953171747&text=${text}`)
            
            res.status(200).json({
                'status' : "Success Check",
                'text' : text
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    }
}

