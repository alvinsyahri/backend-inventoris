const Category = require('../../model/Category');

module.exports = {

    viewCategory : async(req, res) => {
        try {
            const category = await Category.find().sort({ createdAt: -1 }).populate({ path: 'barangId', populate:{ path: 'peminjamanId' }});
            res.status(200).json({
                'status' : "Success",
                'data' : category,
                'valid': true,
                'username': req.username
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'valid': false,
                'message' : error.message
            })
        }
    },
    addCategory : async(req, res) => {
        try {
            const { name } = req.body;
            await Category.create({name})
            res.status(200).json({
                'status' : "SuccesS",
                'valid': true
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'valid': false,
                'message' : error.message
            })
        }
    },
    editCategory : async(req, res) => {
        try {
            const { id, name } = req.body;
            const updatedAt = new Date()
            const category =  await Category.findOne({ _id: id})
            category.name = name;
            category.updatedAt = updatedAt;
            await category.save();
            res.status(200).json({
                'status' : "SuccesS Edit",
                'valid': true
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'valid': false,
                'message' : error.message
            })
        }
    },
    deleteCategory : async(req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne({ _id: id });
            await category.deleteOne();
            res.status(200).json({
                'status' : "SuccesS Edit",
                'valid': true,
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'valid': false,
                'message' : error.message
            })
        }
    }
}