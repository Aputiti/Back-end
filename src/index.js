import http from 'http';
import {
  getItems,
  getItemsById,
  postItem,
  deleteItem,
  putItem,
  funfacts,
} from './items.js';
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log('request', req.method, req.url);
  const {method, url} = req;
  const reqParts = url.split('/');
  // check method, url and generate response accordingly (=routing)
  if (method === 'GET' && url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Welcome to my Car Company API!</h1>');
    res.write(
      '<p>This is a simple REST API server that serves a list of car companies and also provides a random fun fact generator.</p>'
    );
    res.write('<p>Documentation:</p>');
    res.write("<p>/items - get all car companies with their id's.</p>");
    res.write('<p>/random-fact - get a random fact.</p>');
    res.write('<p>/items/:id - get a car company using its id.</p>');
    res.write('<p>POST /items - add a new car company.</p>');
    res.write('<p>DELETE /items/:id - delete a car company using its id.</p>');
    res.write('<p>PUT /items/:id- change a car company using its id.</p>');
    res.write(
      '<br><a href="https://www.cosmopolitan.com/uk/worklife/a33367076/fun-facts-random/">Fun facts source</a>'
    );
    res.end();
  } else if (method === 'GET' && url === '/random-fact') {
    const randomize = Math.floor(Math.random() * funfacts.length);
    const randomFact = funfacts[randomize];
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(`{"message": "Random Fact", "fact": "${randomFact}"}`);
  } else if (method === 'GET' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('GETting item with id', reqParts[2]);
    getItemsById(res, reqParts[2]);
  } else if (method === 'GET' && reqParts[1] === 'items') {
    console.log('GETting all items');
    getItems(res);
  } else if (method === 'POST' && reqParts[1] === 'items') {
    console.log('POSTing a new item');
    postItem(req, res);
  } else if (method === 'DELETE' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('DELETING item with id', reqParts[2]);
    deleteItem(req, res, reqParts[2]);
  } else if (method === 'PUT' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('UPDATING item with id', reqParts[2]);
    putItem(req, res, reqParts[2]);
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end('{"message": "404 Resource not found!"}');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
