const Peminjaman = require('../../model/Peminjaman')

module.exports = {
    viewPeminjaman : async(req, res) => {
        try {
            const peminjaman = await Peminjaman.find({ "userId": req.username.id })
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
                'data' : peminjaman
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    addPeminjaman : async(req, res) => {
        
    },
    scanBarang : async(req, res) => {
        
    }
}