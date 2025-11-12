import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { syncDatabase } from './models/Models.js'
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/', (req, res) => {
    res.send('API is Working')
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    syncDatabase()  
})