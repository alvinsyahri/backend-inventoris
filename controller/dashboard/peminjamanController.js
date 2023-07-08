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
                    select: 'name username isAdmin'
                }
            );
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
            const { userId, itemId, description, qty } = req.body;
            const jumlah = qty ? qty: 1    
            const data = {
                userId,
                itemId,
                description,
                qty: jumlah
            };
            const item = await Item.findOne({ _id: itemId});
            if(item.qty > 0){
                if(jumlah <= item.qty){
                    await Loan.create(data);
                    const user = await User.findOne({ _id: userId})
                    const stok = item.qty
                    item.qty = (stok - jumlah)
                    item.save()
                    const text = `Loan Data: %0A - User Name: ${user.name} %0A - Name of Goods: ${item.name} %0A - Loan Date: ${getDate(new Date())} %0A - Description: ${description}`
                    await axios.get(`https://api.telegram.org/bot6390829982:AAGD5YB4WrQhMoVbXCLdYSDokCT2BgZPfwI/sendMessage?chat_id=-953171747&text=${text}`)
                    res.status(200).json({
                        'status' : "Success",
                    })
                }else{
                    res.status(400).json({
                        'status' : "stok tidak mencukupi"
                    })
                }
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
            const { id } = req.params
            const { userId, itemId, description, qty } = req.body;
            const jumlah = qty ? qty: 1    
            const data = {
                userId,
                itemId,
                description,
                qty: jumlah,
                updatedAt: new Date()
            };
            const loan = await Loan.findOne({ _id: id}).populate({ path: 'itemId', populate: { path: 'subCategory', populate: { path: 'categoryId' } }})
            const item = await Item.findOne({ _id: itemId}).populate({ path: 'subCategory', populate: { path: 'categoryId' } });
            if(loan.itemId.subCategoryId.categoryId._id === item.subCategoryId.categoryId._id){
                
            }
            item.qty = (loan.qty + item.qty)
            item.save()
            if(item.qty > 0){
                console.log(jumlah <= item.qty)
                if(jumlah <= item.qty){
                    await Loan.findByIdAndUpdate(id, data)
                    const item = await Item.findOne({ _id: loan.itemId})
                    item.qty = (item.qty - qty);
                    item.save();
                    res.status(200).json({
                        'status' : "Success Edit"
                    })
                }else{
                    res.status(400).json({
                        'status' : "stok tidak mencukupi"
                    })
                }
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

