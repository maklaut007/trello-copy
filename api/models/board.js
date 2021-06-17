const mongoose = require('mongoose')

const boardSchema=mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user: String,
	boardName: String
});

module.exports = mongoose.model('Board', boardSchema);