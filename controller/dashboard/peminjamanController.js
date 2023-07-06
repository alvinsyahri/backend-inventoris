const Barang = require('../../model/Barang');
const Peminjaman = require('../../model/Peminjaman');

module.exports = {

    viewPeminjaman : async(req, res) => {
        try {
            const peminjaman = await Peminjaman.find().sort({ createdAt: -1 }).populate('barangId')
            .populate('userId');
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
            const { userId, barangId, tanggalPinjam } = req.body;
            const newPeminjaman = {
                userId,
                barangId,
                tanggalPinjam
            };
            const peminjaman = await Peminjaman.create(newPeminjaman);
            
            const barang = await Barang.findOne({ _id: barangId});
            barang.status = true;
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
            const updateBarangId = peminjaman.barangId;

            peminjaman.keterangan = keterangan;
            peminjaman.userId = userId;
            peminjaman.barangId = barangId;
            peminjaman.updatedAt = updatedAt;
            await peminjaman.save();

            const barang = await Barang.findOne({ _id: updateBarangId})
            barang.status = false;
            barang.save();

            const barangUpdate = await Barang.findOne({ _id: barangId})
            barangUpdate.status = true;
            barangUpdate.save();
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
            const peminjaman = await Peminjaman.findOne({ "_id": id })
            const barang = await Barang.findOne({ "_id": peminjaman.barangId });
            
            if (barang) {
            const indexToDelete = barang.peminjamanId.findIndex(
                (peminjaman) => peminjaman._id.toString() === id
            );
                if (indexToDelete !== -1) {
                    barang.peminjamanId.splice(indexToDelete, 1);
                    await barang.save();
                    await Peminjaman.deleteOne({ _id: id });
                    res.status(200).json({
                        status: "Berhasil Menghapus peminjaman",
                    });
                } else {
                    res.status(404).json({
                        status: "peminjaman Tidak Ditemukan",
                    });
                }
            } else {
            res.status(404).json({
                status: "Kategori Tidak Ditemukan",
            });
            }
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    }
}