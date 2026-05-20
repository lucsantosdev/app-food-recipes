import express from 'express'
import { env } from './config/env.js'

const app = express()
const port = env.PORT || 5001

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// }) for testing purposes only, to check if the server is running

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})