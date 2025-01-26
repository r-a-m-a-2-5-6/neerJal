const Joi = require('joi');

const dataSchema = Joi.object({
    data:Joi.object({
        color:Joi.string().required(),
        taste:Joi.string().required(),
        phValue:Joi.number().required().min(0).max(14),
        density:Joi.string().required(),
    })
})



module.exports=dataSchema;