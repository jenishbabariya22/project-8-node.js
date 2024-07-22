const mongoose = require('mongoose')

const productschema = mongoose.Schema({
    categoryid : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategoryid : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'subcategory'
    },
    exsubcategoryid : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'exsubcategory'
    },
   
    productname : {
        type : String,
        required : true
    },
    qty : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    status :{
        type : Number,
        default : 1
    }
})

const product = mongoose.model('product',productschema);

module.exports = product