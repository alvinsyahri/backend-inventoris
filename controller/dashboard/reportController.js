const Peminjaman = require('../../model/Peminjaman')

module.exports = {
    dataPeminjaman : async(req, res) => {
        try {
            const peminjaman = await Peminjaman.find({ "userId": req.username.id}).populate({ path: 'barangId' }).populate({ path: 'userId' }).sort({ createdAt: -1 })
            res.status(200).json({
                'status' : "Success",
                'data' : peminjaman
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    }
}