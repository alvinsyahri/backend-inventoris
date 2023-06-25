const Peminjaman = require('../../model/Peminjaman');

module.exports = {

    viewPeminjaman : async(req, res) => {
        try {
            const category = await Category.find().sort({ createdAt: -1 });
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
            const { name } = req.body;
            await Category.create({name})
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