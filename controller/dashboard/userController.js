const User = require('../../model/User')

module.exports = {
    viewUser : async(req, res) => {
        try {
            const user = await User.find().sort({ createdAt: -1 });
            res.status(200).json({
                'status' : "Success",
                'data' : user
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    addUser : async(req, res) => {
        try {
            const { name, username, password, isAdmin } = req.body;
            await User.create({name, username, password, isAdmin})
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
    editUser : async(req, res) => {
        try {
            const { id, name, username, password, isAdmin } = req.body;
            const updatedAt = new Date()
            const user =  await User.findOne({ _id: id})
            user.name = name;
            user.username = username;
            user.password = password;
            user.isAdmin = isAdmin;
            user.updatedAt = updatedAt;
            await user.save();
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
    deleteUser : async(req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id });
            await user.deleteOne();
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