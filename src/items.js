// mock items data
const items = [
  {id: 5, name: 'porkkana'},
  {id: 6, name: 'omena'},
  {id: 19, name: 'appelsiini'},
  {id: 11, name: 'bataatti'},
  {id: 15, name: 'peruna'},
  {id: 10, name: 'salaatti'},
  {id: 3, name: 'kirsikka'},
];

/**
 * Get all items request handler
 * Amount of  objects in response can be limited by using 'limit' query param
 *
 * @param {object} req - http request
 * @param {object} res - http response
 */
const getItems = (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    res.json(items.slice(0, limit));
  } else {
    res.json(items);
  }
};

/**
 * Get an item by its id
 *
 * @param {*} req
 * @param {*} res
 */
const getItemsById = (req, res) => {
  // if item with id exists send it, otherwise send 404
  console.log('getItemsById', req.params);
  const item = items.find((element) => element.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({message: 'Item not found.'});
  }
};

/**
 * Post/add an item
 *
 * @param {*} req
 * @param {*} res
 */
const postItem = (req, res) => {
  console.log('new item posted', req.body);
  if (req.body.name) {
    const newId = items[items.length - 1].id + 1;
    items.push({id: newId, name: req.body.name});
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

/**
 * Modify/update item by its ID
 *
 * @param {object} req
 * @param {object} res
 */
const putItem = (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((element) => element.id === id);
  if (index !== -1) {
    items[index].name = req.body.name;
    console.log(index);
    res.sendStatus(200);
  } else {
    res.status(404);
    res.json({message: 'Item not found.'});
  }
};

/**
 * Delete media by its ID
 *
 * @param {object} req
 * @param {object} res
 */
const deleteItem = (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((element) => element.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.status(404);
    res.json({message: 'Item not found.'});
  }
};

export {getItems, getItemsById, postItem, deleteItem, putItem};
