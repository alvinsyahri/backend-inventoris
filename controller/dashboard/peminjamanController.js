const Barang = require('../../model/Barang');
const Peminjaman = require('../../model/Peminjaman');

module.exports = {

    viewPeminjaman : async(req, res) => {
        try {
            const category = await Barang.find().sort({ createdAt: -1 });
            res.status(200).json({
                'status' : "Success",
                'data' : category
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
            const { keterangan, userId, barangId } = req.body;
            if(data.length > 0){
                const newPeminjaman = {
                    keterangan,
                    userId,
                    barangId
                };
                const peminjaman = await Peminjaman.create(newPeminjaman);
                const barang = await Barang.findOne({ _id: barangId});
                barang.peminjamanId.push({ _id: peminjaman._id});
                barang.save(); 
                res.status(200).json({
                    'status' : "SuccesS"
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
            const { id, name } = req.body;
            const updatedAt = new Date()
            const category =  await Category.findOne({ _id: id})
            category.name = name;
            category.updatedAt = updatedAt;
            await category.save();
            res.status(200).json({
                'status' : "SuccesS Edit"
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    deletePeminjaman : async(req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne({ _id: id });
            await category.deleteOne();
            res.status(200).json({
                'status' : "SuccesS Edit"
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    }
}