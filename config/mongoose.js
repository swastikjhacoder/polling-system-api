const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);
// Code for using the cloud mongodb atlas 
const connectParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
// Code for manually using the mongodb of local system
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to database'));
db.once('open', ()=>{
    console.log("Successfully connected to the database :: mongoDB");
});

module.exports = mongoose;