const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://ToDo_user:t8WVEqIMD7eis1mt@cluster0.r9q87.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const todoCollection = client.db('user_TODO').collection('TODO')


        app.get('/task', async (req, res) => {
            const query = {}
            const cursor = todoCollection.find(query);
            const taskes = await cursor.toArray();
            res.send(taskes);

        })

        app.post('/task', async (req, res) => {
            const newTask = req.body;
            const result = await todoCollection.insertOne(newTask);
            res.send(result);

        })

        app.delete('/task/:id', async())


    }
    finally {

    }
}
run().catch(console.dir());


app.get('/', (req, res) => {
    res.send('Hello')
})
app.listen(port, () => {
    console.log('listening')
})