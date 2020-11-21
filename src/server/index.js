const dotenv = require('dotenv');
dotenv.config();


const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', (req, res) => {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

const dataObject ={};

// designates what port the app will listen to for incoming requests
app.listen(8081, () =>  {
    console.log('Example app listening on port 8081!')
})

app.get('/test', (req, res) => {
    res.send(mockAPIResponse)
})

const apiKey = process.env.API_KEY;

app.get('/api', (req,res) => {
    res.send({key: apiKey})
})

app.get('/all', sendData = (req,res) => {
    res.send(dataObject)
})

app.post('/addText', (req,res)  => {
    dataObject['agreement'] = req.body.agreement,
    dataObject['subjectivity'] = req.body.subjectivity,
    dataObject['confidence'] = req.body.confidence,
    dataObject['irony'] = req.body.irony

    res.send(dataObject);    
} )