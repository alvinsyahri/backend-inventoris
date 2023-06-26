const Barang = require('../../model/Barang');
const Category = require('../../model/Category');

module.exports = {

    viewBarang : async(req, res) => {
        try {
            const barang = await Barang.find().sort({ createdAt: -1 });
            res.status(200).json({
                'status' : "Success",
                'data' : barang
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
            const newBarang = {
                kode,
                deskripsi,
                serialNumber,
                lokasi,
                tahun,
                keterangan,
                kondisi,
                categoryId
            }
            const barang = await Barang.create(newBarang);
            const category = await Category.findOne({ _id: categoryId});
            category.barangId.push({ _id: barang._id})
            category.save()
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
            const { id, kode, deskripsi, serialNumber, lokasi, tahun, keterangan, kondisi,  categoryId } = req.body;
            const updatedAt = new Date()
            const barang =  await Barang.findOne({ _id: id})
            barang.kode = kode;
            barang.deskripsi = deskripsi,
            barang.serialNumber = serialNumber,
            barang.lokasi = lokasi,
            barang.tahun = tahun,
            barang.keterangan = keterangan,
            barang.kondisi = kondisi,
            barang.categoryId = categoryId,
            barang.updatedAt = updatedAt
            await barang.save();
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
            const barang = await Barang.findOne({ "_id": id })
            // Temukan kategori yang memiliki barang dengan ID yang sesuai
            const category = await Category.findOne({ "_id": barang.categoryId });
            
            if (category) {
            // Temukan index barang yang ingin dihapus
            const indexToDelete = category.barangId.findIndex(
                (barang) => barang._id.toString() === id
            );
                if (indexToDelete !== -1) {
                    category.barangId.splice(indexToDelete, 1);
                    await category.save();

                    // Hapus barang dari koleksi barang
                    await Barang.deleteOne({ _id: id });

                    res.status(200).json({
                    status: "Berhasil Menghapus Barang",
                    });
                } else {
                    res.status(404).json({
                    status: "Barang Tidak Ditemukan",
                    });
                }
            } else {
            res.status(404).json({
                status: "Kategori Tidak Ditemukan",
            });
            }
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    }
}