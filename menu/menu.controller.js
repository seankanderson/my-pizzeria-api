const _ = require('lodash')
const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const menuService = require('./menu.service');
const { ObjectId } = require('mongoose');

const { categorySchemaValidation, toppingSchemaValidation } = require('./menu.schema')

// routes
router.get('/category', getCategories);
router.post('/category', authorize(Role.Admin), categorySchemaValidation, addOrUpdateCategory);
//router.put('/category', authorize(Role.Admin), categorySchemaValidation, addOrUpdateCategory);
router.delete('/category', authorize(Role.Admin), categorySchemaValidation, deleteCategory);

router.get('/topping', authorize(Role.Admin), getToppings);
router.post('/topping', authorize(Role.Admin), toppingSchemaValidation, addOrUpdateTopping);
//router.put('/topping', authorize(Role.Admin), toppingSchemaValidation, addOrUpdateTopping);
router.delete('/topping', authorize(Role.Admin), toppingSchemaValidation, deleteTopping);

// router.get('/menu-item', menuItemSchema);
// router.post('/menu-item', authorize(Role.Admin), menuItemSchema, addOrUpdateMenuItem);
// router.put('/menu-item', authorize(Role.Admin), menuItemSchema, addOrUpdateMenuItem);
// router.delete('/menu-item', authorize(Role.Admin), menuItemSchema, deleteMenuItem);

module.exports = router;

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
