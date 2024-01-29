const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  // Validate password length
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Password must be at least 3 characters long.' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });

  response.json(users);
});

usersRouter.get('/users', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const userId = request.params.id;
  try {
    const user = await User.findById(userId);
    if (user) {
      response.json(user);
    } else {
      response.status(404).send('User not found');
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = usersRouter;
