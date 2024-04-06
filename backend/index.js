const express = require('express');
const app = express()
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express.json());

app.use((req, res, next) => {   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/test', async (req, res)=>{
    try{
        res.status(200).json({message : 'Api is working '})
    }catch(error){
        res.status(500).json({error : error.message})
    }
})

//get all users 
app.get('/users', async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({error : error.message});
    }
});

//get user by id
app.get('/users/:id', async (req, res) => {
    try{
        const user = await prisma.user.findUnique({
            where : {
                id : parseInt(req.params.id)
            }
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error : error.message});
    }
});

//create user
app.post('/users', async (req, res) => {
    const {name, email} = req.body;
    try{
        const user = await prisma.user.create({
            data : {
                name,
                email
            }
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error : error.message});
    }
});

//update user
app.put('/users/:id', async (req, res) => {
    const {name, email} = req.body;
    try{
        const user = await prisma.user.update({
            where : {
                id : parseInt(req.params.id)
            },
            data : {
                name,
                email
            }
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error : error.message});
    }
});
//delete user
app.delete('/users/:id', async (req, res) => {
    try{
        const user = await prisma.user.delete({
            where : {
                id : parseInt(req.params.id)
            }
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error : error.message});
    }
});
const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});