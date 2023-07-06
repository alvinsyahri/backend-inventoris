const Barang = require('../../model/Barang');
const Peminjaman = require('../../model/Peminjaman');
const User = require('../../model/User');

module.exports = {

    viewPeminjaman : async(req, res) => {
        try {
            const peminjaman = await Peminjaman.find({ 'status': true })
            .sort({ createdAt: -1 })
            .populate({
                path: 'barangId',
                select: 'kode',
              })
            .populate({
                path: 'userId',
                select: 'name'
            });
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
            const { userId, barangId, keterangan } = req.body;
            const newPeminjaman = {
                userId,
                barangId,
                keterangan
            };
            const barang = await Barang.findOne({ _id: barangId});
            if(!barang.status){
                const peminjaman = await Peminjaman.create(newPeminjaman);
                const user = await User.findOne({ _id: userId})
                
                barang.status = true;
                barang.peminjamanId.push({ _id: peminjaman._id});
                barang.save();
                const text = `Data Peminjaman: %0A - Nama User: ${user.name} %0A - Nama Barang: ${barang.deskripsi} %0A - Tanggal Peminjaman: ${new Date()}`
                res.status(200).json({
                    'status' : "Success",
                    'text' : text
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
            const barangUpdate = await Barang.findOne({ _id: barangId})
            if(!barangUpdate.status){
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
    
                barangUpdate.status = true;
                barangUpdate.save();
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
            const peminjaman =  await Peminjaman.findOne({ _id: id})
            peminjaman.status = false
            peminjaman.tanggalKembali = new Date()
            peminjaman.save()
            const barang = await Barang.findOne({ _id: peminjaman.barangId})
            barang.status = false;
            barang.save();
            const text = `Data Pengembalian: %0A - Nama User: ${user.name} %0A - Nama Barang: ${barang.deskripsi} %0A - Tanggal Peminjaman: ${peminjaman.tanggalPinjam} %0A - Tanggal Pengembalian: ${new Date()}`
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

