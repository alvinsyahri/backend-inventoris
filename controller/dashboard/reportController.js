const Loan = require('../../model/Loan')

module.exports = {
    dataPeminjaman : async(req, res) => {
        try {
            const loan = await Loan.find({ "userId": req.username.id}).populate({ path: 'itemId' }).populate({ path: 'userId' }).sort({ createdAt: -1 })
            res.status(200).json({
                'status' : "Success",
                'data' : loan
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    }
}