const Loan = require('../../model/Loan')

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
        
    },
    scanBarang : async(req, res) => {
        
    }
}