const mongoose = require('mongoose');

const exsubcategorySchema = mongoose.Schema({
    categoryid : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategoryid : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'subcategory'
    },
    exsubcategory : {
        type : String,
        required : true
    },
    status :{
        type : Number,
        default : 1
    }
})

const exsubcategory = mongoose.model('exsubcategory',exsubcategorySchema);
module.exports = exsubcategory;