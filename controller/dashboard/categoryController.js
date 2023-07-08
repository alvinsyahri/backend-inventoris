const SubCategory = require('../../model/SubCategory');
const Category = require('../../model/Category');

module.exports = {

    viewCategory : async(req, res) => {
        try {
            const subCategory = await SubCategory.find().sort({ createdAt: -1 }).populate({ path: 'categoryId'});
            res.status(200).json({
                'status' : "Success",
                'data' : subCategory,
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
            const { name, categoryId } = req.body;
            const data = {
                name,
                categoryId
            }
            console.log(req.body)
            const subCategory = await SubCategory.create(data)  
            const category = await Category.findOne({ _id: categoryId});
            category.subCategoryId.push({ _id: subCategory._id})
            category.save()
            res.status(200).json({
                'status' : "Success",
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
            const { id } = req.params;
            const { name, categoryId } = req.body;
            const data = {
                name,
                categoryId,
                updatedAt : new Date()
            }
            const category = await Category.findOne({ _id: categoryId});
            // start -> check category untuk menghapus relasi dulu
            if(category){
                const indexToDelete = category.subCategoryId.findIndex((subCategory) => subCategory._id.toString() === categoryId);
                if(indexToDelete !== -1){
                    category.subCategoryId.splice(indexToDelete, 1);
                    await category.save()
                    // end -> relasi category berhasil dihapus

                    // start -> update data sub category dan menambahkan relasi baru ke category
                    const subCategory =  await SubCategory.findByIdAndUpdate(id,data)
                    category.subCategoryId.push({ _id: subCategory._id})
                    category.save()
                    
                    // mengirim respon ke fron end
                    res.status(200).json({
                        'status' : "Success Edit",
                        'valid': true
                    })
                }else{
                    res.status(400).json({
                        'status' : "Sub Category not found"
                    })
                }
            }else{
                res.status(400).json({
                    'status': "Category not found"
                })
            }
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
            const subCategory = await SubCategory.findOne({ _id: id})
            const category = await Category.findOne({ _id: subCategory._id});

            // start -> check category untuk menghapus relasi dulu
            if(category){
                const indexToDelete = category.subCategoryId.findIndex((subCategory) => subCategory._id.toString() === categoryId);
                if(indexToDelete !== -1){
                    category.subCategoryId.splice(indexToDelete, 1);
                    await category.save()
                    // end -> relasi category berhasil dihapus

                    // start -> update data sub category
                    await SubCategory.deleteOne({ _id: id})
                    
                    // mengirim respon ke fron end
                    res.status(200).json({
                        'status' : "Success Delete",
                        'valid': true
                    })
                }else{
                    res.status(400).json({
                        'status' : "Sub Category not found"
                    })
                }
            }else{
                res.status(400).json({
                    'status': "Category not found"
                })
            }
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'valid': false,
                'message' : error.message
            })
        }
    }
}