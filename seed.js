const mongoose = require("mongoose")
const User = require("./model/User")

async function seedData() {
    // Connection URL
    const uri = 'mongodb://127.0.0.1:27017/inventoris';
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log("error", err)
    })
    const data = {
        name: 'Admin',
        username: 'admin',
        password: 'rahasia',
        isAdmin: true
    }
    const seedDB = async () => {
        await User.create(data)
    }

    seedDB().then(() => {
        mongoose.connection.close()
        console.log("seed success")
    })
}

seedData()