import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())


app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`application is up, running on ${PORT}`)
})
