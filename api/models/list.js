const mongoose = require('mongoose')

const listSchema=mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	listName: String,
	cards:[{
		_id: mongoose.Schema.Types.ObjectId,
		cardName: String
	}],
	boardId: String
});

module.exports = mongoose.model('List', listSchema);