const mongoose = require('mongoose');
const config = require('config'); 
const db = config.get('mongoURI'); 
//Using the require method would bring all the global variables, because of this we used a GET request on the config module instead


const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        //This calls a promise

        console.log('MongoDB Connected...')
    } catch(err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;