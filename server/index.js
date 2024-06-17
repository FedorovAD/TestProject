import express from 'express';
import {showcaseRouter} from './routes/showcase_routes.js';
import { productsRouter } from './routes/products_routes.js';
import cors from 'cors'
import { ApiError } from './routes/apiError.js';

const PORT = process.env.PORT || 8080

const app = express()

app
    .use (cors({origin: 'http://localhost:3000'}))
    .use(express.json())
    .use('/api', showcaseRouter)
    .use('/api', productsRouter)
    .use((err, _req, res, next) => {
        if (err instanceof ApiError){
            console.log(err)
           res.status(err.statusCode).json({message: err.message}) 
        } else {
            res.status(500).json(err);
        }
    })

app.listen(PORT, () => console.log(`Server started on post ${PORT}`))