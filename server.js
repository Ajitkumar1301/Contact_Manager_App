const express = require('express');
const dotenv = require('dotenv').config();
const contactRoute = require('./routes/contactRoute');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

const app = express();

const Port = process.env.PORT || 5000;
connectDb();
app.use(express.json());
app.use("/api/contacts", contactRoute)
app.use("/api/users", userRoute)
app.use(errorHandler)

app.listen(Port, (req, res) => {
    console.log(`sever running on Port :${Port}`);
})