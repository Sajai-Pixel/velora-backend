import express from 'express'
import cors from 'cors'
import "dotenv/config";
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js';
import adminRouter from './routes/admin.routes.js';

const app = express();
const port = 5000 || process.env.PORT
connectDB();
// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

app.listen(port, () => {
    console.log("Server Listening on port: " + port);
})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/admin', adminRouter)