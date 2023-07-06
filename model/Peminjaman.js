const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const peminjamanSchema = new mongoose.Schema({
    tanggalPinjam: {
        type: Date,
        default: Date.now
    },
    tanggalKembali: {
        type: Date,
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    barangId: {
        type: ObjectId,
        ref: 'Barang'
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

module.exports = mongoose.model('Peminjaman', peminjamanSchema);