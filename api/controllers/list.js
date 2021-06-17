const mongoose = require('mongoose');

const List = require('../models/list')
const Card = require('../models/card')

exports.find_list_by_id = (req, res, next) => { 
     Card.find({})
        .exec()
        .then(cards => {
            List.find({boardId: req.params.boardId},function (err, docs) {})
            .exec()
            .then(lists => {
                res.status(200).json({
                    lists: lists,
                    cards: cards
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
}

exports.get_all_lists = (req, res, next) => { 
    List.find({boardId: req.params.boardId}, function (err, docs) {})
        .exec()
        .then(lists => {
            console.log(req.params)
            res.status(200).json({
                lists: lists
            });
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
}



exports.add_card =(req, res, next) => {

    let card={"_id": new mongoose.Types.ObjectId(),
        "cardName": req.body.cardName}
    List.findByIdAndUpdate(req.body.listId, 
        {$push: {cards: card}},
        {new: true},
        function (error, result){
            if (error) {
                console.log(error);
                res.status(500).json({error: err})
            } else if(result){
                res.status(200).json({
                    card: result.cards[result.cards.length-1],
                    listId: result._id
                })
            }
        }
    )

}
exports.update_list_cards=(req, res, next) => {
    List.findByIdAndUpdate(req.body.listId, 
        {$set: {cards: req.body.cards}},
        function (error, result){
            if (error) {
                console.log(error);
                res.status(500).json({error: err})
            } else if(result){
                res.status(200).json({
                    card: result.cards,
                    listId: result._id
                })
            }
        }
    )

     
}

exports.add_list =(req, res, next) => {
    const id= req.params.boardId;
    const list = new List({

        _id: new mongoose.Types.ObjectId(),
        listName: req.body.listName,
        boardId: req.params.boardId
    });
    list
        .save()
        .then((result)=> {
            console.log(result);
            res.status(201).json({
                list: result
            });
        })
        .catch(err => {    
            console.log(err);
            res.status(500).json({error: err})
        }); 
}


exports.delete_list= (req, res, next) => {
    List.deleteOne({_id: req.body.listId})
        .exec()
        .then(doc => {
        res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        }); 
    
}


exports.delete_all_lists=(req, res, next) => {
    
    List.deleteMany({})
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

exports.delete_card= (req, res, next) => {
    List.findOne({'_id': req.body.listId}, function (err, result){
        if(err){
            res.status(500).json({error: err})
        }
        
        result.cards.pull({"_id": req.body.cardId}).remove();
        result.save();
        res.status(200).json(result);
    })
  }