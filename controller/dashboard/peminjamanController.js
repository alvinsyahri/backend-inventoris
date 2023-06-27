const Barang = require('../../model/Barang');
const Peminjaman = require('../../model/Peminjaman');

module.exports = {

    viewPeminjaman : async(req, res) => {
        try {
            const peminjaman = await Peminjaman.find().sort({ createdAt: -1 }).populate({ path: 'barangId'});
            res.status(200).json({
                'status' : "Success",
                'data' : peminjaman
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
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    editPeminjaman : async(req, res) => {
        try {
            const { id, keterangan, userId, barangId } = req.body;
            const updatedAt = new Date()
            const peminjaman =  await Peminjaman.findOne({ _id: id})
            peminjaman.keterangan = keterangan;
            peminjaman.userId = userId;
            peminjaman.barangId = barangId;
            peminjaman.updatedAt = updatedAt;
            await peminjaman.save();
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
            const peminjaman = await Peminjaman.findOne({ _id: id });
            await peminjaman.deleteOne();
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