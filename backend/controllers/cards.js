const NotFoundError = require('../errors/NotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');

const Card = require('../models/card');

const { APP_STATE /* errorHandler */ } = require('../helpers/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFoundError(
        APP_STATE.HTTP_NOTHING_FOUND.MESSAGE,
        APP_STATE.HTTP_NOTHING_FOUND.STATUS
      );
    })
    .then((cards) => {
      res.status(APP_STATE.DEFAULT_OK.STATUS).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(APP_STATE.CREATE_CARD_SUCCESS.STATUS).send({ data: card });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => {
      throw new NotFoundError(
        APP_STATE.HTTP_NOTHING_FOUND.MESSAGE,
        APP_STATE.HTTP_NOTHING_FOUND.STATUS
      );
      /* const error = new Error(APP_STATE.HTTP_NOTHING_FOUND.MESSAGE);
      error.statusCode = APP_STATE.HTTP_NOTHING_FOUND.STATUS; // 404
      throw error; */
    })
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw new AuthorizationError(
          APP_STATE.HTTP_FORBIDDEN.MESSAGE,
          APP_STATE.HTTP_FORBIDDEN.STATUS
        );
        /*   const error = new Error(APP_STATE.HTTP_FORBIDDEN.MESSAGE);
        error.statusCode = APP_STATE.HTTP_FORBIDDEN.STATUS; // 403
        throw error; */
      }
      return Card.findByIdAndRemove(req.params.cardId).then((cardRemoved) => {
        res.send(cardRemoved);
      });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError(
        APP_STATE.HTTP_NOTHING_FOUND.MESSAGE,
        APP_STATE.HTTP_NOTHING_FOUND.STATUS
      );
      /*  const error = new Error({
        message: APP_STATE.HTTP_NOTHING_FOUND.MESSAGE,
      });
      error.statusCode = APP_STATE.HTTP_NOTHING_FOUND.STATUS; // 404
      throw error; */
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError(
        APP_STATE.HTTP_NOTHING_FOUND.MESSAGE,
        APP_STATE.HTTP_NOTHING_FOUND.STATUS
      );
      /* const error = new Error({
        message: APP_STATE.HTTP_NOTHING_FOUND.MESSAGE,
      });
      error.statusCode = APP_STATE.HTTP_NOTHING_FOUND.STATUS; // 404
      throw error; */
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
