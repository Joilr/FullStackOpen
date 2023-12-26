const express = require('express')
const morgan = require('morgan')
const app = express()

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
    }
]

app.use(express.json())

app.use(morgan((tokens, req, res) => {

  const requestBody = JSON.stringify(req.body);

  return [
    tokens.method(req, res),    
    tokens.url(req, res),        
    tokens.status(req, res),       
    tokens.res(req, res, 'content-length'), 
    tokens['response-time'](req, res), 'ms', 
    `${requestBody}`
  ].join(' ');
}));

app.post('/api/persons', (request, response) => {
  const randomId = () => Math.floor(Math.random() * (3000000 - 100000)) + 100000;

  if (!request.body.name || !request.body.number) {
    return response.status(400).json({ error: 'missing name or number' });
  }

  const existingPerson = persons.find(p => p.name === request.body.name);
  if (existingPerson) {
    return response.status(400).json({ error: 'name must be unique' });
  }

  const person = {
    name: request.body.name,
    phone: request.body.number,
    id: randomId()
  };

  try {
    persons = persons.concat(person);
    response.json(person);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'internal server error' });
  }
})

app.get('/info', (request, response) => {
  const now = new Date();
  const dateString = now.toDateString() + ' ' + now.toLocaleTimeString();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${dateString}</p>` )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
