//Main
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http , {
   cors: {
      origin: '*',
   }});
const cors = require('cors');

//Other
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

//DB resources
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Model
const MarkersSchema = new Schema({
   name: {
      type: String
   },
   longitude: {
      type: Number
   },
   latitude: {
      type: Number
   }
});

const Markers = mongoose.model('Markers', MarkersSchema );
const changeStream =  Markers.watch();


app.use(bodyParser.json())
app.use(cors())

dotenv.config({
   path: 'server/config/.env',
});

// DB Init
mongoose.connect(`${process.env.DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   },
   (err) => {
      if (err) {
         throw err
      }
      console.log('Database connected')
   })

//Get date from DB
app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

const getAndSendData = () => {
   Markers.find()
      .then(results => {
         io.emit("FromAPI", results);
      })
      .catch(error => console.error(error))
}

// Listen changes in DB
changeStream.on('change', (change) => {
   console.log(change);
   getAndSendData()
});


// Socket connection
io.on('connection', (socket) => {
   getAndSendData()
   console.log('IO connected');
   socket.on('disconnect', () => {
      console.log('IO disconnected');
   });
});


// Listen port
http.listen(3030, () => {
   console.log('listening on 3030');
});


