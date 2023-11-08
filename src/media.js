// mock data for assignment, could be placed to separate json-file too.
const mediaItems = [
  {
    media_id: 9632,
    filename: 'ffd8.jpeg',
    filesize: 887574,
    title: 'Favorite drink',
    description: '',
    user_id: 1606,
    media_type: 'image/jpeg',
    created_at: '2023-10-16T19:00:09.000Z',
  },
  {
    media_id: 9626,
    filename: 'dbbd.jpeg',
    filesize: 60703,
    title: 'Miika',
    description: 'My Photo',
    user_id: 3671,
    media_type: 'image/jpeg',
    created_at: '2023-10-13T12:14:26.000Z',
  },
  {
    media_id: 9625,
    filename: '2f9b.jpeg',
    filesize: 30635,
    title: 'Aksux',
    description: 'friends',
    user_id: 260,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T20:03:08.000Z',
  },
  {
    media_id: 9592,
    filename: 'f504.jpeg',
    filesize: 48975,
    title: 'Desert',
    description: '',
    user_id: 3609,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:59:05.000Z',
  },
  {
    media_id: 9590,
    filename: '60ac.jpeg',
    filesize: 23829,
    title: 'Basement',
    description: 'Light setup in basement',
    user_id: 305,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:56:41.000Z',
  },
];

/**
 * Get all media request handler
 *
 * @param {*} req
 * @param {*} res
 */
const getMedia = (req, res) => {
  res.json(mediaItems);
};

/**
 * Get a media by its id
 *
 * @param {*} req
 * @param {*} res
 */
const getMediaById = (req, res) => {
  // if media with id exists send it, otherwise send 404
  console.log('getMediaById', req.params);
  const media = mediaItems.find((element) => element.media_id == req.params.id);
  if (media) {
    res.json(media);
  } else {
    res.status(404);
    res.json({message: 'Media not found.'});
  }
};

/**
 * Post/add a media
 *
 * @param {*} req
 * @param {*} res
 */
const postMedia = (req, res) => {
  console.log('new media posted', req.body);
  const newId = Math.floor(Math.random() * 9000 + 1000);
  if (req.body.filename) {
    mediaItems.push({
      media_id: newId,
      filename: req.body.filename,
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id,
      media_type: req.body.media_type,
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

/**
 * Modify/update media by its ID
 *
 * @param {object} req
 * @param {object} res
 */
const putMedia = (req, res) => {
  const id = parseInt(req.params.id);
  const index = mediaItems.findIndex((element) => element.media_id === id);
  if (index !== -1) {
    mediaItems[index].title = req.body.title;
    mediaItems[index].description = req.body.description;
    console.log(index);
    res.sendStatus(200);
  } else {
    res.status(404);
    res.json({message: 'Media not found.'});
  }
};

/**
 * Delete media by its ID
 *
 * @param {object} req
 * @param {object} res
 */
const deleteMedia = (req, res) => {
  const id = parseInt(req.params.id);
  const index = mediaItems.findIndex((element) => element.media_id === id);
  if (index !== -1) {
    mediaItems.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.status(404);
    res.json({message: 'Media not found.'});
  }
};

export {getMedia, getMediaById, postMedia, putMedia, deleteMedia};
