const categorymodel = require('../models/categorymodel')
const subcategorymodel = require('../models/subcategorymodel')
const exsubcategorymodel = require('../models/exsubcategorymodel ')
const productmodel = require('../models/productmodel')

const category = async (req, res) => {
    try {
        let category = await categorymodel.find({});

        return res.render('category/category', {
            category
        })
    } catch (err) {
        console.log(err);
        return false
    }

}

const addcategory = (req, res) => {
    return res.render('category/addcategory')
}

const postcategory = async (req, res) => {
    try {
        await categorymodel.create({
            category: req.body.category
        })
        req.flash('add', "category successfully add")
        return res.redirect('/category')
    } catch (err) {
        console.log(err);
        return false
    }
}

const deleterecord = async (req, res) => {
    try {
        let id = req.params.id

        await categorymodel.findByIdAndDelete(id);
        await subcategorymodel.deleteMany({ categoryid: id })
        await exsubcategorymodel.deleteMany({ categoryid: id })
        await productmodel.deleteMany({ categoryid: id })


        req.flash('success', "category successfully Deleted")

        return res.redirect('/category')

    } catch (err) {
        console.log(err);
        return false
    }
}

const editrecord = async (req, res) => {
    try {
        let record = await categorymodel.findById(req.query.id);

        return res.render('category/editcategory', {
            record
        })
    } catch (err) {
        console.log(err);
        return false
    }
}

const editcategory = async (req, res) => {
    try {
        let id = req.body.id
        let all = await categorymodel.findByIdAndUpdate(id, {
            category: req.body.category
        })
        req.flash('update', "category successfully Updated")
        return res.redirect('/category')
    } catch (err) {
        console.log(err);
        return false
    }
}
const instock = async (req, res) => {
    try {
        let id = req.query.id;

        let all = await categorymodel.findByIdAndUpdate(id, {
            status: 0
        })
        return res.redirect('/category')

    } catch (err) {
        console.log(err);
        return false
    }
}

const outstock = async (req, res) => {
    try {
        let id = req.query.id;

        let all = await categorymodel.findByIdAndUpdate(id, {
            status: 1
        })
        return res.redirect('/category')
    } catch (err) {
        console.log(err);
        return false
    }
}

module.exports = {
    category, addcategory, postcategory, deleterecord, editrecord, editcategory, instock, outstock
}