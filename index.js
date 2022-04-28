const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Running the server");
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.qjgv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run(){
   try{
    await client.connect();
    const volunteerCollections = client.db("volunteerCollections").collection("volunteer");
    console.log("db connected");


    app.get("/volunteer", async(req, res) => {
        const query = {};
        const cursor = volunteerCollections.find(query)
        const result = await cursor.toArray();
        res.send(result);
    });

    app.post('/volunteers', async(req, res) => {
      const newVolunteer = req.body;
      const result = volunteerCollections.insertOne(newVolunteer);
      res.send(result);
    });

    app.get('')

   }
   finally{

   }
 }

run().catch(console.dir);

app.listen(port, () => {
    console.log("running the server", port);
})
