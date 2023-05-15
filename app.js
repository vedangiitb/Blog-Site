const express = require('express');
const app = express();
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const path = require('path');
const index = require('./routes/index');
const enterpren = require('./routes/enterpren')
const startup = require('./routes/startup') 

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(methodOverride('_method'));

app.use('/',index)
app.use('/enterpren',enterpren)
app.use('/startup',startup)


app.listen(3000,()=>{
    console.log('Listening on port 3000')
})