const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ListsController = require('../controllers/list')

router.get('/:boardId', ListsController.get_all_lists);
router.post('/newCard',checkAuth, ListsController.add_card);
router.post('/:boardId/newList',checkAuth, ListsController.add_list);
router.post('/deleteList',checkAuth, ListsController.delete_list);
router.post('/deleteLists', ListsController.delete_all_lists);
router.post('/deleteCard', ListsController.delete_card);
router.post('/updatecards', ListsController.update_list_cards);

module.exports = router;