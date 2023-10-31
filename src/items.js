// mock items data
const items = [
  {id: 1, name: 'Toyota'},
  {id: 2, name: 'Ford'},
  {id: 3, name: 'Nissan'},
  {id: 4, name: 'Kia'},
  {id: 5, name: 'BMW'},
  {id: 6, name: 'Lexus'},
  {id: 7, name: 'Tesla'},
  {id: 8, name: 'Audi'},
  {id: 9, name: 'Volvo'},
  {id: 10, name: 'Polestar'},
  {id: 11, name: 'Mazda'},
  {id: 12, name: 'Acura'},
  {id: 13, name: 'Subaru'},
  {id: 14, name: 'Jeep'},
  {id: 15, name: 'Mini'},
];

// random fun facts
const funfacts = [
  'Competitive art used to be an Olympic sport.',
  "There's a fruit that tastes like chocolate pudding.",
  "You can hear a blue whale's heartbeat from over 2 miles away.",
  'Baby rabbits are called kits.',
  'Venus is the only planet to spin clockwise.',
  'Nutmeg is a hallucinogen.',
  'M&Ms are named after the businessmen who created them.',
];

// also in api mode
// getting all items
const getItems = (res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  const jsonItems = JSON.stringify(items);
  res.end(`{"message": "All items", "items": ${jsonItems}}`);
};

// getting an item by id
const getItemsById = (res, id) => {
  // if item with id exists send it, otherwise send 404
  console.log('getItemsById', id);
  const item = items.find((element) => element.id == id);
  if (item) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(item));
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end('{"message": "Item not found."}');
  }
};

// posting an item
const postItem = (req, res) => {
  let body = [];
  req
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('req body', body);
      body = JSON.parse(body);
      // check if body is "valid"
      if (!body.name) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(`{"message": "Missing data."}`);
        return;
      }
      // check id of the last item in items and add 1
      const newId = items[items.length - 1].id + 1;
      items.push({id: newId, name: body.name});
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(`{"message": "New item added."}`);
    });
};

// deleting an item
const deleteItem = (req, res, id) => {
  const index = items.findIndex((item) => item.id == id);
  if (index !== -1) {
    items.splice(index, 1);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(`{"message": "Item with ID ${id} deleted."}`);
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end('{"message": "Item not found."}');
  }
};

// "updating" an item
const putItem = (req, res, id) => {
  let body = [];
  req
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('req body', body);
      body = JSON.parse(body);

      const index = items.findIndex((item) => item.id == id);

      if (index !== -1) {
        items[index] = {id, name: body.name};
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(`{"message": "Item with id ${id} updated."}`);
      } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end('{"message": "Item not found."}');
      }
    });
};

export {getItems, getItemsById, postItem, deleteItem, putItem, funfacts};
