const express = require('express');
const cors = require('cors');
const path = require('path'); 

const app = express();

const URI = '';
const port = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})


//Return response for invalid JSON
//https://github.com/expressjs/express/issues/4065
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ success: false, message: 'Invalid JSON. Please try again.' });
    }
    next();
});


app.all('*', (req, res) => { 
    res.status(404).send({ success: false, message: 'Invalid route call. Please try again.' }); 
});

module.exports = app;