import express from 'express'
import { Database } from './repo/db'

const app = express();
const PORT = 3000;

export const db = Database.getDbInstance({ dbName: "ecommerce", userName: "User1", password: "july", host: "localhost" })

app.use(express.json())

app.get('/liveCheck', (_req, res) => {
    res.send(200).json()
})


app.listen(PORT, async () => {
    await Database.checkConnection(db)
    console.log(`application is up, running on ${PORT}`)
})
