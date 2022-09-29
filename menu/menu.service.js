const _ = require('lodash');
const { ObjectId } = require('mongodb');
const db = require('../_helpers/db');

module.exports = {
    getAllCategories,
    getAllToppings,
    getCategoryById,
    saveCategory,
    saveTopping,
    deleteCategory
};

async function getAllToppings() {
    return await db.Menu.Topping.find({});
}

async function saveTopping(params) {
    console.log('save topping request...', params);
    db.removeEmptyOrNullIdIfExists(params);
    const existingToppingWithSameName = await db.Menu.Topping.findOne({ name: params.name });

    const idToUpdate = _.get(params, '_id')

    if (idToUpdate) {

        const toppingToUpdate = await db.Menu.Topping.findOne({ _id: idToUpdate })

        if (!existingToppingWithSameName || existingToppingWithSameName._id === toppingToUpdate._id) {
            toppingToUpdate.name = _.get(params, 'name');
            toppingToUpdate.description = _.get(params, 'description');
            toppingToUpdate.defaultPrice = _.get(params, 'defeaultPrice');
            toppingToUpdate.categories = _.get(params, 'categories');
            return toppingToUpdate.save();
        }
    }

    if (existingToppingWithSameName) {
        throw 'Topping already exists';
    }

    
    const newTopping = new db.Menu.Topping(params);
    await newTopping.save();
    return newTopping;
}

async function getAllCategories() {
    return await db.Menu.Category.find({});
}

async function deleteCategory(id) {
    const category = await getCategory(id);
    await category.remove();
}

async function getCategoryById(id) {
    if (!db.isValidId(id)) throw 'category not found';
    const category = await db.Menu.Category.findById(id);
    if (!category) throw 'category not found';
    return category;
}

async function saveCategory(params) {

    db.removeEmptyOrNullIdIfExists(params);
    const existingCategoryWithSameName = await db.Menu.Category.findOne({ name: params.name });

    const idToUpdate = _.get(params, '_id')

    if (idToUpdate) {

        const categoryToUpdate = await db.Menu.Category.findOne({ _id: idToUpdate })

        if (!existingCategoryWithSameName || existingCategoryWithSameName._id === categoryToUpdate._id) {
            categoryToUpdate.name = _.get(params, 'name');
            categoryToUpdate.description = _.get(params, 'description');
            return categoryToUpdate.save();
        }
    }

    if (existingCategoryWithSameName) {
        throw 'Category already exists';
    }

    const newCategory = new db.Menu.Category(params);
    await newCategory.save();
    return newCategory;

}
