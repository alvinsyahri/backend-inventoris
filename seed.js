// untuk running ketikkan saja node .\seed.js

const mongoose = require("mongoose")
const User = require("./model/User")
const Category = require("./model/Category")

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
    const user = {
        name: 'Admin',
        username: 'admin',
        password: 'rahasia',
        isAdmin: true
    }

    const category = [
        {
            name: 'Disposable',
        },
        {
            name: 'Not Disposable'
        }
    ]
    const seedDB = async () => {
        await User.create(user)
        await Category.create(category[0])
        await Category.create(category[1])
    }

    seedDB().then(() => {
        mongoose.connection.close()
        console.log("seed success")
    })
}

seedData()