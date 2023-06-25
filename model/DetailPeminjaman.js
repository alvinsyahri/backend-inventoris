const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    barangId: {
        type: ObjectId,
        ref: 'Barang'
    },
    peminjamanId: {
        type: ObjectId,
        ref: 'Peminjaman'
    },
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