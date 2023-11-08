import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import {
  getItems,
  getItemsById,
  postItem,
  putItem,
  deleteItem,
} from './items.js';
import {getUsers, getUserById, postUser, putUser, deleteUser} from './user.js';
import {
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
  deleteMedia,
} from './media.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// simple custom middleware for logging/debugging all requests
app.use((req, res, next) => {
  console.log('Time:', Date.now(), req.method, req.url);
  next();
});

// render pug a file (home.pug) example
app.get('/', (req, res) => {
  const values = {
    title: 'Media sharing REST API',
    message: 'Documentation in readme.md',
  };
  res.render('home', values);
});

// dummy routing example
app.get('/kukkuu', (request, response) => {
  const myResponse = {message: 'No moro!'};
  //response.json(myResponse);
  response.sendStatus(200);
});

// other dummy pug example
app.get('/:message', (req, res) => {
  const values = {title: 'Dummy REST API docs', message: req.params.message};
  res.render('home', values);
});

// get all items
app.get('/api/items', getItems);
// get items by id
app.get('/api/items/:id', getItemsById);
// modify
app.put('/api/items/:id', putItem);
// add new item
app.post('/api/items', postItem);
// remove existing item
app.delete('/api/items/:id', deleteItem);

// media endpoints
// get all media
app.get('/api/media', getMedia);
// get media by id
app.get('/api/media/:id', getMediaById);
// add new media
app.post('/api/media', postMedia);
// put media
app.put('/api/media/:id', putMedia);
// delete media
app.delete('/api/media/:id', deleteMedia);

// user endpoints
// get all user
app.get('/api/user', getUsers);
// get user by id
app.get('/api/user/:id', getUserById);
// add new user
app.post('/api/user', postUser);
// put user
app.put('/api/user/:id', putUser);
// delete user
app.delete('/api/user/:id', deleteUser);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
