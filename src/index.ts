import express from 'express'
import { Database } from './repo/db'
export const db = Database.getDbInstance({ dbName: "ecommerce", userName: "User1", password: "july", host: "localhost" });
import { bootstrap } from './bootstrap'

export const app = express();
const PORT = 3000;


app.use(express.json())


app.get('/liveCheck', (_req, res) => {
    res.status(200).json({ status: "up" })
})

bootstrap(app)

app.listen(PORT, async () => {
    await Database.checkConnection(db)
    console.log(`application is up, running on ${PORT}`)
})
