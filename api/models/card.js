const mongoose = require('mongoose')

const cardSchema=mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	cardName: String,
	listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true }
});

module.exports = mongoose.model('Card', cardSchema);