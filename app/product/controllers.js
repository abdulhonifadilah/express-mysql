const fs = require('fs');
const Product = require('./model')


const index = async (req,res)=>{
    try{
        const result = await Product.findAll();
        res.json({
            status : 'success',
            message: 'GET data berhasil',
            data : result
        });
    }catch(e){
        res.json(e);
    }
}

const view = async(req,res)=>{
    const {id}= req.params;
    try{
        const result = await Product.findAll({
            where:{
                id: id
            }
        });
        if(result.length < 1){
            res.json({
                status : 'not found',
                message: `data id ${id} tidak ditemukan`
            });
        }
        res.json({
            status: 'success',
            message : 'GET data berhasil',
            data : result
        });
    }catch(e){
        res.json(e);
    }
}

const store = async(req,res)=>{
    const {name, price, stock ,status}= req.body;
    const image = req.file;
    try{
        await Product.sync();
        const result = await Product.create({
            name,price,stock,status, image_url : "uploads/" + image.filename
        });
        res.json({
            status: 'success',
            message : 'data berhasil di tambahkan',
            data : result
        });
    }catch(e){
        res.json(e);
    }
}

const update = async(req, res)=>{
    const {name, price, stock, status}= req.body;
    const id= req.params.id;
    const image = req.file;
    let body = {name , price, stock, status};
    if(image){
        body = {
            name,price,stock, status,image_url : 'upload/'+ image.filename
        }
    }
    const result = await Product.findAll({
        where: {
            id : id
        }
    });
    if(result.length < 1){
        res.json({
            status : 'not found',
            message: `data id ${id} tidak ditemukan`
        });
    }else{
        try{
            await Product.update(body, {
                where: {
                    id: id
                }
            });
            removeImage(result[0].image_url);
            res.json({
                status: 'success',
                message: 'data berhasil diupdate'
            });
        }catch(e){
            res.json(e);
        }
    }
}

const destroy = async(req, res)=>{
    let {id}= req.params;
    const result = await Product.findAll({
        where :{
            id: id
        }
    });
    if(result.length < 1){
        res.json({
            status: 'not found',
            message: `data id ${id} tidak ditemukan`
        });
    }else{
        try{
            await Product.destroy({
                where :{
                    id: id
                }
            });
            removeImage(result[0].image_url);
            res.send({
                status: 'success',
                message: 'data berhasil dihapus'
            });
        }catch(e){
            res.json(e);
        }
    }
}


const removeImage = (fileName)=>{
    fs.unlink(fileName, (err)=>{
        if(err){
            console.log(err)
        }
        console.log('delete file image success')
    })
}


module.exports = {
    index, store, view, update, destroy
}