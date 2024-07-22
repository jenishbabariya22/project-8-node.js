const frontindex = (req,res) => {
    return res.render('front/index');
}

const shop = (req,res) => {
    return res.render('front/shop')
}

module.exports = {
    frontindex,shop
}