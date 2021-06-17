const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


const BoardsController = require('../controllers/boards')

router.get('/getboards/:userName', BoardsController.boards_get_all);

router.post('/:userid', checkAuth, BoardsController.boards_create_board);

router.delete('/', BoardsController.deleate_all_boards);
router.delete('/deleteBoard', BoardsController.deleate_board);

module.exports = router;