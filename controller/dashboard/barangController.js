const Item = require('../../model/Item');

module.exports = {

    viewBarang : async(req, res) => {
        try {
            const item = await Item.find().sort({ createdAt: -1 }).populate({ path: 'subCategoryId' });
            res.status(200).json({
                'status' : "Success",
                'data' : item
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
            const { name, serialNumber, procurementYear, condition, qty, description, SubCategoryId } = req.body;
            const data = {
                name, 
                serialNumber, 
                procurementYear,
                condition,
                qty,
                description,
                SubCategoryId
            }
            await Item.create(data);
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
            const { id } = req.params;
            const { name, serialNumber, procurementYear, condition, qty, description, subCategoryId } = req.body;
            const data = {
                name, 
                serialNumber, 
                procurementYear,
                condition,
                qty,
                description,
                subCategoryId,
                updatedAt : new Date()
            }
            // const updatedAt = new Date()
            const item =  await Item.findByIdAndUpdate(id, data)
            // item.name = name;
            // item.serialNumber = serialNumber,
            // item.procurementYear = procurementYear,
            // item.condition = condition,
            // item.qty = qty,
            // item.description = description,
            // item.subCategoryId = subCategoryId,
            // item.updatedAt = updatedAt
            await item.save();
            res.status(200).json({
                'status' : "SuccesS Edit"
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    deleteBarang : async(req, res) => {
        try {
            const { id } = req.params;
            await Item.deleteOne({ "_id": id })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    }
}