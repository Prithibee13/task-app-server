const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId, CommandStartedEvent } = require('mongodb');


const port = process.env.PORT || 8000

const app = express();

app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.txzhis9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const taskCollection = client.db('task-db').collection('tasks');

        app.post('/addTask', async (req, res) => 
        {
            const task = req.body;
            const result = await taskCollection.insertOne(task)
            res.send(result)
        })
    }
    finally {
        /* await client.close(); */
    }
}

run().catch(console.dir)


app.listen(port, () => {
    console.log("compify-server Running in port :", port);
})