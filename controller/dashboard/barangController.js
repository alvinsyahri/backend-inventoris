const Barang = require('../../model/Barang');

module.exports = {

    viewBarang : async(req, res) => {
        try {
            const barang = await Barang.find().sort({ createdAt: -1 });
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
    addBarang : async(req, res) => {
        try {
            const { kode, deskripsi, serialNumber, lokasi, tahun, keterangan, kondisi,  categoryId} = req.body;
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
    editBarang : async(req, res) => {
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
    deleteBarang : async(req, res) => {
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