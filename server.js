require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb://localhost:27017/trackerDB';

mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected"))
.catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance");
});


mongoose.connection.on("error", (err)  => {
    console.error("Error connecting to mongo", err);
})

app.get('/', requireAuth ,(req,res) => {
    res.send(`Your Email: ${req.user.email}`);
});




app.listen(process.env.PORT || 5000, () => {
    console.log("server is running on port 5000");
});