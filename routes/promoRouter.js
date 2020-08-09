const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const Promotions = require('../models/promoModel');
var authenticate = require('../authenticate');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors,(req,res,next) => {
        
        Promotions.find({})
        .then((promos) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promos);
            }, 
            (err) => next(err)
        )
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {

        Promotions.create(req.body)
        .then((promotion) => {
            console.log('promotion Created ', promotion);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
            }, 
            (err) => next(err)
        )
        .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {

        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    .delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {

        Promotions.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
            }, 
            (err) => next(err)
        )
        .catch((err) => next(err));    
    });

promoRouter.route('/:promoId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions,(req,res,next) => {

        Promotions.findById(req.params.promoId)
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
            }, 
            (err) => next(err)
        )
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

        res.statusCode = 403;
        res.end('POST operation not supported on /promos/'+ req.params.promoId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {

        Promotions.findByIdAndUpdate(
            req.params.promoId, 
            { $set: req.body }, 
            { new: true }
        )
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
            }, 
            (err) => next(err)
        )
        .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

        Promotions.findByIdAndRemove(req.params.promoId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
            }, 
            (err) => next(err)
        )
        .catch((err) => next(err));
    });


module.exports = promoRouter;