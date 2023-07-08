const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subCategoryId: [{
        type: ObjectId,
        ref: 'SubCategory'
    }],
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Category', categorySchema);