import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);


app.get('/api/students', (req, res) => {
    const students = [
        {id: 1, name: 'Alice',age: 20,enrollment:112},
        {id: 1, name: 'Alice',age: 20,enrollment:112},
        {id: 1, name: 'Alice',age: 20,enrollment:112},
        {id: 1, name: 'Alice',age: 20,enrollment:112},
        {id: 1, name: 'Alice',age: 20,enrollment:112},
        {id: 1, name: 'Alice',age: 20,enrollment:112}
    ];
    res.send(students);
    }
);


       

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }
);
