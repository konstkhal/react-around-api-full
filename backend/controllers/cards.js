const Card = require('../models/card');

const { APP_STATE, errorHandler } = require('../helpers/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(APP_STATE.DEFAULT_OK.STATUS).send(cards);
    })
    .catch((err) => errorHandler(res, err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(APP_STATE.CREATE_CARD_SUCCESS.STATUS).send({ data: card });
    })
    .catch((err) => errorHandler(res, err));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error(APP_STATE.HTTP_NOTHING_FOUND.MESSAGE);
      error.statusCode = APP_STATE.HTTP_NOTHING_FOUND.STATUS; // 404
      throw error;
    })
    .then((card) => {
      res
        .status(APP_STATE.REMOVE_CARD_SUCCESS.STATUS)
        .send({ message: APP_STATE.REMOVE_CARD_SUCCESS.MESSAGE, data: card });
    })
    .catch((err) => errorHandler(res, err));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error({
        message: APP_STATE.HTTP_NOTHING_FOUND.MESSAGE,
      });
      error.statusCode = APP_STATE.HTTP_NOTHING_FOUND.STATUS; // 404
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => {
      const error = new Error({
        message: APP_STATE.HTTP_NOTHING_FOUND.MESSAGE,
      });
      error.statusCode = APP_STATE.HTTP_NOTHING_FOUND.STATUS; // 404
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
