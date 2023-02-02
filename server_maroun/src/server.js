const http = require('http');

const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://Maroun36:pass76346292@nasacluster.rqjpjwy.mongodb.net/medicine?retryWrites=true&w=majority'

const app = require('./app');

mongoose.connection.once('open',()=>{
    console.log('MongoDB connection ready!');
})
mongoose.connection.on('error',(err)=>{
    console.error(err);
})
mongoose.set('strictQuery', false);

const server = http.createServer(app);
async function startServer(){
    await mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`)
})
}
startServer();