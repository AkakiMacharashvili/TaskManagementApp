const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const users = [];
let cur_user = { firstName: '', lastName: '', username: '', email: '', password: '' };
let tasks = [];


app.post('/signup', (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    users.push({ firstName, lastName, username, email, password });
    res.status(201).send({ message: 'User registered successfully' });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        res.status(200).send({ message: 'Login successful', user });
        cur_user = user;
    } else {
        cur_user = { firstName: '', lastName: '', username: '', email: '', password: '' };
        res.status(401).send({ message: 'Invalid username/email or password' });
    }
});

app.post('/createTask', (req, res) => {
    if(cur_user.username === ''){
        res.status(401).send({ message: 'Please log in the system...' });
    }else{
        const { title, description, day, month, year } = req.body;
        const un = cur_user.username;
        tasks.push({ un, title, description, day, month, year });
        res.status(201).send({ message: 'Task registered successfully', tasks });
    }
});

app.delete('/deletenote', (req, res) => {
    const { title, description } = req.body;  
    const index = tasks.findIndex(task => task.title === title && task.description === description);
    if (index !== -1) {
        tasks.splice(index, 1);
        res.status(200).send({ message: 'Note deleted successfully' });
    } else {
        res.status(404).send({ message: 'Note not found' });
    }
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
