const express = require('express');

const auth = require('../middleware/auth');

const router = express.Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const getCardsValidate = require('../middleware/validation/getCardsValidate'); //+
const createCardValidate = require('../middleware/validation/createCardValidate'); //+
const deleteCardValidate = require('../middleware/validation/deleteCardValidate'); //+
const likeCardValidate = require('../middleware/validation/likeCardValidate'); //+
const dislikeCardValidate = require('../middleware/validation/dislikeCardValidate'); //+

router.get('/', auth, getCardsValidate, getCards);
router.post('/', auth, createCardValidate, createCard);
router.delete('/:cardId', auth, deleteCardValidate, deleteCard);

router.put('/:cardId/likes', auth, likeCardValidate, likeCard);
router.delete('/:cardId/likes', auth, dislikeCardValidate, dislikeCard);

module.exports = router;
