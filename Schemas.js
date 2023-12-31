import joi from "joi"

const CampgroundSchema=joi.object({
    campground:joi.object({
     title:joi.string().required(),
     price:joi.number().required().min(0),
     description:joi.string().required(),
     location:joi.string().required(),
    //  image:joi.string().required()
    }).required(),
    deleteImages:joi.array()
})

const ReviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        body:joi.string().required()
    }).required()
})

export {CampgroundSchema,ReviewSchema}
