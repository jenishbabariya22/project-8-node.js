const categorymodel = require('../models/categorymodel')
const subcategorymodel = require('../models/subcategorymodel')
const exsubcategorymodel = require('../models/exsubcategorymodel ')
const productmodel = require('../models/productmodel')

const fs = require('fs') 


const product = async(req,res) => {
    try{
        let product = await productmodel.find({}).populate('categoryid').populate('subcategoryid').populate('exsubcategoryid')
       console.log();
        return res.render('product/product',{
            product
        });
    }catch(err){
        console.log(err);
        return false
    }
    
}

const addproduct = async(req,res) => {
    try{
        let category = await categorymodel.find({})
        let subcategory = await subcategorymodel.find({})
        let exsubcategory = await exsubcategorymodel.find({})
        
        return res.render('product/addproduct',{
            category,subcategory,exsubcategory
        })
    }catch(err) {
        console.log(err);
        return false
    }
}
const productadd = async(req,res) => {
    try{
        if(req.file){
            let all = await productmodel.create({
                categoryid : req.body.category,
                subcategoryid : req.body.subcategory,
                exsubcategoryid : req.body.exsubcategory,
                productname : req.body.productname,
                qty : req.body.qty,
                image : req.file.path
            })
            req.flash('add',"product successfully add")
            return res.redirect('/product');
        }
    }catch(err){
        console.log(err);
        return false
    }
}

const deleteproduct = async(req,res) => {
    try{
        let all = await productmodel.findById(req.query.id)
        fs.unlinkSync(all.image)

        let record = await productmodel.findByIdAndDelete(req.query.id)
        req.flash('success',"product successfully Deleted")
        return res.redirect('/product')
    }catch(err){
        console.log(err);
        return false
    }
}

const editproduct = async(req,res) => {
    try{
        let record = await productmodel.findById(req.query.id).populate('exsubcategoryid').populate('subcategoryid').populate('categoryid')
        let category = await categorymodel.find({})
        let subcategory = await subcategorymodel.find({})
        let exsubcategory = await exsubcategorymodel.find({})
        
        return res.render('product/editproduct',{
            category , subcategory, record ,exsubcategory
        })
    }catch(err){
        console.log(err);
        return false
    }
}

const productedit = async(req,res) => {
    try{    
        let id = req.body.id

        if(req.file){
            let oldrecord = await productmodel.findById(id)
          fs.unlinkSync(oldrecord.image);  

            let record = await productmodel.findByIdAndUpdate(id,{
                categoryid : req.body.category,
                subcategoryid : req.body.subcategory,
                exsubcategoryid : req.body.exsubcategory,
                productname : req.body.productname,
                qty : req.body.qty,
                image : req.file.path
            })
            req.flash('updated',"product successfully Updated")
            return res.redirect('/product');


        }else{
            let oldrecord = await productmodel.findById(id)

            let record = await productmodel.findByIdAndUpdate(id,{
                categoryid : req.body.category,
                subcategoryid : req.body.subcategory,
                exsubcategoryid : req.body.exsubcategory,
                productname : req.body.productname,
                qty : req.body.qty,
                image : req.body.iamge
            })
            req.flash('updated',"product successfully Updated")
            return res.redirect('/product');

        }

    }catch(err){
        console.log(err);
        return false
    }
}
const instock = async(req,res) => {
    try{    
        let id = req.query.id;
       
        let all = await productmodel.findByIdAndUpdate(id,{
            status : 0
        })
            return res.redirect('/product')

    }catch(err){
        console.log(err);
        return false
    }
}

const outstock = async(req,res) => {
    try{    
        let id = req.query.id;
       
        let all = await productmodel.findByIdAndUpdate(id,{
            status : 1
        })
        return res.redirect('/product')



    }catch(err){
        console.log(err);
        return false
    }
}

module.exports ={
    product,addproduct,productadd,deleteproduct,editproduct,productedit,outstock,instock
}