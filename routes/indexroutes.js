const express = require('express')

const routes = express.Router();

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const productimage = multer({ storage: storage }).single('image')

const usercontroller = require('../controller/usercontroller')
const categorycontroller = require('../controller/categorycontroller')
const subcategorycontroller = require('../controller/subcategorycontroller')
const exsubcategorycontroller = require('../controller/exsubcategorycontroller ')
const productcontroller = require('../controller/productcontroller')
const frontcontroller = require('../controller/front/frontcontroller')
const passport = require('passport')


//user
routes.get('/admin',usercontroller.login)
routes.get('/register',usercontroller.register);
routes.post('/registerform',usercontroller.registerform);
routes.post('/loginform',passport.authenticate('local',{failureRedirect : '/'}),usercontroller.loginform);
routes.get('/index',passport.checkUser,usercontroller.index);

//profile
routes.get('/profile',passport.checkUser,usercontroller.profile)
routes.get('/logout',passport.checkUser,usercontroller.logout)
routes.post('/changeprofile',passport.checkUser,usercontroller.changeprofile)

//category

routes.get('/category',passport.checkUser,categorycontroller.category)
routes.get('/addcategory',passport.checkUser,categorycontroller.addcategory)
routes.post('/postcategory',passport.checkUser,categorycontroller.postcategory)
routes.get('/deleterecord/:id',passport.checkUser,categorycontroller.deleterecord)
routes.get('/editrecord',passport.checkUser,categorycontroller.editrecord)
routes.post('/editcategory',passport.checkUser,categorycontroller.editcategory)
routes.get('/instock',passport.checkUser,categorycontroller.instock)
routes.get('/outstock',passport.checkUser,categorycontroller.outstock)


//subcategory

routes.get('/subcategory',passport.checkUser,subcategorycontroller.subcategory)
routes.get('/addsubcategory',passport.checkUser,subcategorycontroller.addsubcategory);
routes.post('/postsubcategory',passport.checkUser,subcategorycontroller.postsubcategory);
routes.get('/deletesubrecord/:id',passport.checkUser,subcategorycontroller.deletesubrecord);
routes.get('/editsubrecord',passport.checkUser,subcategorycontroller.editsubrecord);
routes.post('/editsubcategory',passport.checkUser,subcategorycontroller.editsubcategory);
routes.get('/instock',passport.checkUser,subcategorycontroller.instock);
routes.get('/outstock',passport.checkUser,subcategorycontroller.outstock);

//exsubcategory

routes.get('/exsubcategory',passport.checkUser,exsubcategorycontroller.exsubcategory)
routes.get('/addexsubcategory',passport.checkUser,exsubcategorycontroller.addexsubcategory)
routes.post('/postexsubcategory',passport.checkUser,exsubcategorycontroller.postexsubcategory)
routes.post('/editexsubcategory',passport.checkUser,exsubcategorycontroller.editexsubcategory)

routes.get('/deleteexsubrecord/:id',passport.checkUser,exsubcategorycontroller.deleteexsubrecord);
routes.get('/editexsubrecord',passport.checkUser,exsubcategorycontroller.editexsubrecord);
routes.get('/instock',passport.checkUser,exsubcategorycontroller.instock);
routes.get('/outstock',passport.checkUser,exsubcategorycontroller.outstock);

//product

routes.get('/product',passport.checkUser,productcontroller.product);
routes.get('/addproduct',passport.checkUser,productcontroller.addproduct);
routes.post('/productadd',passport.checkUser,productimage,productcontroller.productadd);
routes.get('/deleteproduct',passport.checkUser,productimage,productcontroller.deleteproduct)
routes.get('/editproduct',passport.checkUser,productimage,productcontroller.editproduct)
routes.post('/productedit',passport.checkUser,productimage,productcontroller.productedit)
routes.get('/instock',passport.checkUser,productcontroller.instock);
routes.get('/outstock',passport.checkUser,productcontroller.outstock);

//forgot password

routes.get('/reset',usercontroller.reset)
routes.get('/otp',usercontroller.otp)


routes.get('/newpassword',usercontroller.newpassword)
routes.post('/verifyotp',usercontroller.verifyotp)
routes.post('/forgotpass',usercontroller.forgotpass)
routes.post('/forgotmail',usercontroller.forgotmail)

//front

routes.get('/',frontcontroller.frontindex)
routes.get('/shop',frontcontroller.shop)

module.exports = routes