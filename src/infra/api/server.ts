import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import RoomRoute from './route/RoomRoute'
import BookingRoute from './route/BookingRoute'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.disable('x-powered-by')

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-COntrol-Allow-Headers', 'Content-Type')
    next()
})

app.use('/v1', RoomRoute)
app.use('/v1', BookingRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: 'resource not found',
        statusCode: res.statusCode,
    })
    next()
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (
        err.message === 'capacity is required'
        || err.message === 'price is required'
        || err.message === 'description is required'
    ) {
        return res.status(400).json({
            message: err.message,
            statusCode: res.statusCode,
        })
    }
    if (err.message === 'no available') {
        return res.status(422).json({
            message: err.message,
            statusCode: res.statusCode,
        })
    }
    console.log(err)
    res.status(500).json({
        message: 'internal server error',
        statusCode: res.statusCode,
    })
    next()
})

app.listen(port, () => console.log(`Starting server in ${port}`))
