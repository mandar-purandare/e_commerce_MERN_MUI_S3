import express from 'express'
import morgan from 'morgan'
import Router from './routes/index.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(morgan('dev'))
dotenv.config()
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use('/api/v1', Router)



mongoose.connect(process.env.MONGO_URL).then(() => console.log('database connected'))

app.listen('8080', () => {console.log('Listening on port 8080..')})