const mongoose = require('mongoose')
const { lg, blueBgWhite, redBgGray } = require('./constants')

exports.connectToDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            lg(blueBgWhite('Connected to MongoDB'))
        })
        .catch((err) => {
            lg(redBgGray(`Error connecting to database: ${err}`))
        })
}
