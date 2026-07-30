import express from 'express'
import { db } from './db'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/liveCheck', (_req, res) => {
    res.send(200).json()
})


app.listen(PORT, async () => {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    console.log(`application is up, running on ${PORT}`)
})
