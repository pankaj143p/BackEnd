require('dotenv').config()
const express = require('express');
const app = express();
const port = 4000;

const college_data = {
    "name": "TIT",
    "location": "Mumbai",
    "established": 1958,
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "departments": ["CSE", "ME", "EE", "CE", "Mathematics"],
    "hostels": 18,
    "students": 10000
};

app.get('/college', (req, res) => {
    res.json(college_data);
}
);


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
app.get('/instagram', (req, res) => {
    res.send("welcome to instagram");
});
app.get('/*', (req, res) => {
    res.send("welcome to wrong page");
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});




