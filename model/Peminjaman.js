const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const peminjamanSchema = new mongoose.Schema({
    tanggalPinjam: {
        type: Date,
        required: true
    },
    tanggalKembali: {
        type: Date,
        required: true
    },
    keterangan: {
        type: String,
        default: "Aman"
    },
    UserId: {
        type: ObjectId,
        ref: 'User'
    },
    detailPeminjamanId: [{
        type: ObjectId,
        ref: 'DetailPeminjaman'
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

module.exports = mongoose.model('Peminjaman', peminjamanSchema);