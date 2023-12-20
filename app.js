const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const { resolve } = require('path');

// app.use(bodyParser.json());
app.use(express.static('./'))
app.use(express.json());
function getChaptersLength(directory){
    return new Promise((resolve)=>{
        fs.readdir(directory, (err, files) => {
            resolve(files.length)
        })
    })
}


app.post('/getChapters', async (req, res) => {
    const directory = req.body.chapter;
    const result = await getChaptersLength(directory);
    res.json({ text: result })
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
