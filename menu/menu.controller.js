const _ = require('lodash')
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const menuService = require('./menu.service');
const db = require('../_helpers/db');
const { ObjectId } = require('mongoose');

// routes
router.get('/category', authorize(Role.Admin), getCategories);
router.post('/category', authorize(Role.Admin), categorySchema, addOrUpdateCategory);
router.put('/category', authorize(Role.Admin), categorySchema, addOrUpdateCategory);
router.delete('/category', authorize(Role.Admin), categorySchema, deleteCategory);

router.get('/topping', authorize(Role.Admin), getToppings);
router.post('/topping', authorize(Role.Admin), toppingSchema, addOrUpdateTopping);
router.put('/topping', authorize(Role.Admin), toppingSchema, addOrUpdateTopping);
router.delete('/topping', authorize(Role.Admin), toppingSchema, deleteTopping);

// router.get('/menu-item', menuItemSchema);
// router.post('/menu-item', authorize(Role.Admin), menuItemSchema, addOrUpdateMenuItem);
// router.put('/menu-item', authorize(Role.Admin), menuItemSchema, addOrUpdateMenuItem);
// router.delete('/menu-item', authorize(Role.Admin), menuItemSchema, deleteMenuItem);

module.exports = router;

function categorySchema(req, res, next) {
    //console.log('categorySchema...', req)
    const schema = Joi.object({
        _id: Joi.string().allow(''),
        name: Joi.string().required(),
        description: Joi.string().required()
    });
    validateRequest(req, next, schema);
}
function getCategories(req, res, next) {

    menuService.getAllCategories()
        .then(result => res.json(result))
        .catch(next);
}

function addOrUpdateCategory(req, res, next) {

    const category = req.body
    menuService.saveCategory(category)
        .then(result => res.json(result))
        .catch(next);
    // if () return res.status(400).json({ message: 'Token is required' });

}

function deleteCategory(req, res, next) {
    return menuService.getAllCategories()
}

function toppingSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string(),
        shortDescription: Joi.string(),
        longDescription: Joi.string(),
        calories: Joi.number(),
        categories: Joi.array().items(Joi.string())
    });
    validateRequest(req, next, schema);
}

function getToppings(req, res, next) {

    menuService.getAllToppings()
        .then(result => res.json(result))
        .catch(next);
}
function addOrUpdateTopping(req, res, next) {

    console.log('controller req body...', req.body)
    const topping = req.body
    menuService.saveTopping(topping)
        .then(result => res.json(result))
        .catch(next);
    // if () return res.status(400).json({ message: 'Token is required' });

}

function deleteTopping(req, res, next) {
    // return menuService.getAllCategories()
}



// function menuItemSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string(),
//         firstName: Joi.string(),
//         lastName: Joi.string(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(6).required(),
//         confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
//         acceptTerms: Joi.boolean().valid(true).required()
//     });
//     validateRequest(req, next, schema);
// }

