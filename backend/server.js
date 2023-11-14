import express from 'express';
import connectDb from './db_conn.js';
import customerRoutes from './routes/customerRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
// import itemsRoutes from './routes/itemsRoutes.js';
import ordersRoutes from './routes/orderRoutes.js';
import slotsRoutes from './routes/slotRoutes.js';
import itemsRoutes from './routes/itemsRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';

import jsonwebtoken from 'jsonwebtoken';


const app = express();


app.use(cors());


const secretKey = "secretKey";

app.use(express.json());
app.use(bodyParser.json())

connectDb();

app.use('/api/customers',customerRoutes);
app.use('/api/address',addressRoutes);
app.use('/api/users', usersRoutes);
// app.uss('/api/items', itemsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/slot', slotsRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/location', locationRoutes);


app.use('/uploads',express.static('uploads'));


app.listen(6001, () => {
    console.log("server running successfully");
})                  