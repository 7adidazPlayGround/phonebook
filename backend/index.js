const express = require('express');
const app = express();
const moment = require("moment");
const dexter = require('morgan');
const cors = require('cors');



// this is token that will be intruduced in the format! 
dexter.token('data', function (req, res) {
    return JSON.stringify(req.body);
});
// const requestLogger = (req, res, next) => {
//     console.log('hi from request logger');
//   next()
// }

app.use(dexter(':method :url :status :res[content-length] - :response-time ms :data'));
app.use(express.json());
app.use(cors());
app.use(express.static('build'));
// app.use(requestLogger);


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": "Testing Delete",
        "number": "10 10"
    }
]

app.get('/api/persons', (request, response) => {
    // response.json(persons);
    response.set('content-Type', 'application/json');
    response.send(persons);
})

app.get('/api/info', (req, res) => {
    const formattedTime = moment().format("DD/MM/YYYY HH:mm:ss");
    console.log(formattedTime);

    res.send(`
        <p>Phonebook has info of ${persons.length} people</p>
        <p>${formattedTime}</p> `);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    console.log('delete is called');
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id);

    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const newId = Math.floor(Math.random() * 100000);
    console.log('id is ', newId);
    const body = req.body; // this is the json of the body of the request

    // check if the info is complete
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number is missing' })
    }

    // check for duplicates
    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique' })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: newId
    }
    persons = persons.concat(person);

    res.json(person)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`running at ${PORT}`)
})
