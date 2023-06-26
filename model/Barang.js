const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const barangSchema = new mongoose.Schema({
    kode: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true 
    },
    serialNumber: {
        type: String,
       required: true 
    },
    lokasi: {
        type: String,
       required: true 
    },
    tahun: {
        type: String,
       required: true 
    },
    keterangan: {
        type: String, 
    },
    kondisi: {
        type: String,
    },
    categoryId: {
        type: ObjectId,
        ref: 'Category'
    },
    status:{
        type: Boolean,
        default: false
    },
    peminjamanId: [{
        type: ObjectId,
        ref: 'Peminjaman'
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

module.exports = mongoose.model('Barang', barangSchema);