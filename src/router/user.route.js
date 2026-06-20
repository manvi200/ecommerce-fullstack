const express=require('express');
const userHandler=require('../handlers/user.handler');
const router=express.Router();

router.post('/users',userHandler.createUser);
router.get('/users',userHandler.getAllUsers);
router.get('/users/:id',userHandler.getUserById);
router.put('/users/:id',userHandler.updateUser);
router.delete('/users/:id',userHandler.deleteUser);

module.exports=router;

