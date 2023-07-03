const Category = require('../../model/Category');

module.exports = {

    viewDashboard : async(req, res) => {
        try {
            res.status(200).json({
                'status' : "Success",
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
}