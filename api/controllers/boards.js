const mongoose = require('mongoose');

const Board = require('../models/board')


exports.boards_get_all = (req, res, next) => {
    Board.find({user: req.params.username})
        .exec()
        .then(doc => {
            console.log(req.params.username, doc)
        res.status(200).json({
            boards: doc
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        }); 
    
}

exports.boards_create_board = (req, res, next) => {
   const board = new Board({
        _id: new mongoose.Types.ObjectId(),
        boardName: req.body.boardName,
        user : req.params.userName
    });
    board
        .save()
        .then((result)=> {
            res.status(201).json({
                boards: result
            });
        })
        .catch(err => {    
            console.log(err);
            res.status(500).json({error: err})
        });
}


exports.deleate_all_boards = (req, res, next) => {
    
    Board.deleteMany({})
        .exec()
        .then(doc => {
        res.status(200).json({
            hi:  "hi"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        }); 
    
}

exports.deleate_board = (req, res, next) => {
    Board.deleteOne({_id: req.body.boardId})
        .exec()
        .then(doc => {
        res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        }); 
    
}