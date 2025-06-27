const express = require('express')
import 'dotenv/config'
const app = express()
const port = process.env.PORT || 8080

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
