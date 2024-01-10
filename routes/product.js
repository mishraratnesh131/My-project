const express = require("express");
const Product = require("../models/Product");
const router = express.Router();



router.get('/products',async (req,res)=>{
   let products = await Product.find({});
   res.render('products/index',{products})
})

router.get('/products/new',(req,res)=>{
    res.render('products/new')
})

router.post('/products',async (req,res)=>{
    let {name , img , price , desc} = req.body;
    await Product.create({name , img , price , desc})
    res.redirect('/products')
})

router.get('/products/:id',async (req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id).populate('reviews');
    //console.log(foundProduct)
    res.render('products/show', {foundProduct});
})

router.get('/products/:id/edit', async (req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit',{foundProduct})
})

router.patch('/products/:id', async (req,res)=>{
    let {id} = req.params;
    let {name , img , price , desc} = req.body;
    await Product.findByIdAndUpdate(id, {name , img , price , desc})
    res.redirect('/products')
})

router.delete('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})


module.exports = router;