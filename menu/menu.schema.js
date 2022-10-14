const validateRequest = require('_middleware/validate-request');
const Joi = require('joi');

function categorySchemaValidation(req, res, next) {
    //console.log('categorySchema...', req)
    const schema = Joi.object({
        _id: Joi.string().allow(''),
        name: Joi.string().required(),
        description: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function toppingSchemaValidation(req, res, next) {
    const schema = Joi.object({
        _id: Joi.string().allow(''),
        name: Joi.string(),
        shortDescription: Joi.string(),
        longDescription: Joi.string().optional().allow(''),
        defaultPrice: Joi.number().optional(),
        categories: Joi.array().items(Joi.string())
    });
    validateRequest(req, next, schema);
}

module.exports = {
    categorySchemaValidation,
    toppingSchemaValidation
}
