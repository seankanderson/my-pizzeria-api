const db = require('../_helpers/db');
const menu = require('./menu.service')
const mongoose = require('mongoose');



describe('menu-service', () => {

    afterAll(() => {
        db.cleanup()
    })

    describe('saveCategory', () => {

        beforeEach(async () => {
            await db.Menu.Category.deleteMany({})
        })

        it('should save a new category calling the mongoose model directly (i.e database is working)', async () => {

            const newCat = new db.Menu.Category()
            newCat.name = "TEST CAT"
            newCat.description = 'test category description...'
            const result = await newCat.save()
            const category = await db.Menu.Category.findOne({ name: 'TEST CAT' })

            expect(category._id.toString()).toEqual(expect.any(String))
            const recordHasMongoId = db.isValidId(category._id)
            expect(recordHasMongoId).toEqual(true)

        });

        it('should save a new category when missing _id', async () => {

            const category = {
                name: '..test category..',
                description: 'A tasty test category'
            }
            const result = await menu.saveCategory(category)
            expect(result._id).toEqual(expect.any(mongoose.Types.ObjectId))
            expect(result.name).toEqual(category.name)
            expect(result.description).toEqual(category.description)
            expect(result.created).toEqual(expect.any(Date))
            expect(result.__v).toEqual(0)

        });

        it('should save a new category when _id is invalid', async () => {

            const category = {
                _id: 'ABC BAD OBJECTID',
                name: '..test category..',
                description: 'A tasty test category'
            }
            const result = await menu.saveCategory(category)
            expect(result._id).toEqual(expect.any(mongoose.Types.ObjectId))
            expect(result.name).toEqual(category.name)
            expect(result.description).toEqual(category.description)
            expect(result.created).toEqual(expect.any(Date))
            expect(result.__v).toEqual(0)

        });

        it('should update an existing category', async () => {

            const category = {
                name: '..test category..',
                description: 'A tasty test category'
            }
            const newCategory = await menu.saveCategory(category)

            category._id = newCategory._id.toString()
            category.name = '..UPDAED test category..'
            const updated = await menu.saveCategory(category)

            expect(updated._id).toEqual(newCategory._id)
            expect(updated.name).toEqual(category.name)
            expect(updated.description).toEqual(category.description)
            expect(updated.created).toEqual(expect.any(Date))
            expect(updated.__v).toEqual(0)

        });

        it('should throw an error when trying to save a new category with exsisting name', async () => {

            await menu.saveCategory({
                name: '..test category..',
                description: 'A tasty test category'
            })

            await expect(menu.saveCategory({
                name: '..test category..',
                description: 'A tasty test category'
            })).rejects.toThrow('Category already exists')

        });

    })

    describe('saveTopping', () => {

        beforeEach(async () => {
            await db.Menu.Topping.deleteMany({})
        })

        it('should save a new topping when missing _id', async () => {

            const topping = {
                name: '..test topping..',
                shortDescription: 'A tasty test topping'
            }
            try {
                const result = await menu.saveTopping(topping)
                console.log('result...', result)
                expect(result._id).toEqual(expect.any(mongoose.Types.ObjectId))
                expect(result.name).toEqual(category.name)
                expect(result.shortDescription).toEqual(topping.shortDescription)
                expect(result.created).toEqual(expect.any(Date))
                expect(result.__v).toEqual(0)
            } catch (error) {
                console.log('error....', error)
            }
        });

        it('should save a new topping when _id is invalid', async () => {

            const topping = {
                _id: 'ABC BAD OBJECTID',
                name: '..test topping..',
                shortDescription: 'A tasty test topping'
            }
            const result = await menu.saveTopping(topping)
            expect(result._id).toEqual(expect.any(mongoose.Types.ObjectId))
            expect(result.name).toEqual(topping.name)
            expect(result.shortDescription).toEqual(topping.shortDescription)
            expect(result.created).toEqual(expect.any(Date))
            expect(result.__v).toEqual(0)

        });

        it('should update an existing topping', async () => {

            const topping = {
                name: '..test topping..',
                shortDescription: 'A tasty test topping'
            }
            const newTopping = await menu.saveTopping(topping)

            topping._id = newTopping._id.toString()
            topping.name = '..UPDAED test topping..'
            const updated = await menu.saveTopping(topping)

            expect(updated._id).toEqual(newTopping._id)
            expect(updated.name).toEqual(topping.name)
            expect(updated.shortDescription).toEqual(topping.shortDescription)
            expect(updated.created).toEqual(expect.any(Date))
            expect(updated.__v).toEqual(0)

        });

        it('should throw an error when trying to save a new topping with exsisting name', async () => {

            await menu.saveTopping({
                name: '..test topping..',
                shortDescription: 'A tasty test topping'
            })

            await expect(menu.saveTopping({
                name: '..test topping..',
                shortDescription: 'A tasty test topping'
            })).rejects.toThrow('Topping already exists')

        });

    })



});
