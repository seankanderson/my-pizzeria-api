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
    console.log('existingToppingWithSameName...', existingToppingWithSameName)
    const idToUpdate = _.get(params, '_id')

    if (idToUpdate) {

        const toppingToUpdate = await db.Menu.Topping.findOne({ _id: idToUpdate })
        
        console.log('toppingToUpdate...', toppingToUpdate)

        if (!existingToppingWithSameName || (existingToppingWithSameName._id.toString() === toppingToUpdate._id.toString())) {
            toppingToUpdate.name = _.get(params, 'name');
            toppingToUpdate.shortDescription = _.get(params, 'shortDescription');
            toppingToUpdate.defaultPrice = _.get(params, 'defaultPrice');
            toppingToUpdate.categories = _.get(params, 'categories');
            return toppingToUpdate.save();
        }
    }

    if (existingToppingWithSameName) {
        throw new Error('Topping already exists');
    }

    const newTopping = new db.Menu.Topping(params);
    await newTopping.save();
    return newTopping;
}

async function getAllCategories() {
    return await db.Menu.Category.find({});
}

async function deleteCategory(id) {
    return await db.Menu.Category.remove(id);
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
        throw new Error('Category already exists');
    }

    const newCategory = new db.Menu.Category(params);
    await newCategory.save();
    return newCategory;

}
