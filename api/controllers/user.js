const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const User = require('../models/user')

exports.user_get_users = (req, res, next)=>{
	try{
		User.find({})
		.exec()
		.then((a)=>res.json(a))
	}
	catch{
		return res.status(500).json({
			error: "Cant connect"
		});
	}
}
exports.user_signup = (req, res, next) => { 

	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: "Mail exists"
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							name: req.body.name,
							email: req.body.email,
							password: hash
						});
						user
							.save()
							.then(result => {
								res.status(201).json({
									message: "User created",
									result: result

								});
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									error: err
								});
							});
					}
				});
			}
		});
}


exports.user_login = (req, res, next)=>{
	/*console.log(process.env.MONGO_ATLAS_PW, 'mongodb+srv://maklaut:'+process.env.MONGO_ATLAS_PW+'@trello-aktlt.mongodb.net/test?retryWrites=true', 90)*/
	User.findOne({ email: req.body.email})
	.exec()
	.then(user => {
		if(!user){
			return res.status(401).json({
				message: 'Auth failed'
			});
		}
		bcrypt.compare(req.body.password, user.password, (err, result)=>{
			if(err){
				return res.status(401).json({
					message: 'Auth failed'
				});
			}
			if(result){
				const token = jwt.sign({
						email: user.email,
						userId: user._id,
						userName: user.name
					}, process.env.JWT_KEY || "secret",
					{
						expiresIn: "23h"
					});
				
				return res.status(200).json({
					message: "Auth successful",
					token: token,
					adressName: user.email.split("@")[0] 
				})
			}
			return res.status(401).json({
				message: 'Auth failed'
			});
		});
		
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({
			error: err
		});
	});

}


exports.user_delete = (req, res, next)=>{
	User.remove({})
	.exec()
	.then(result=>{
		res.status(200).json({
			message: 'User deleted'
		})
	})
	.catch(err=>{
		console.log(err);
			res.status(500).json({
				error: err
			});
	});
}