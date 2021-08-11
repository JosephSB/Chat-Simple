const express = require('express')
const router = express.Router()
/*
router.get('/',(req,res)=>{
    res.send('works')
})
*/
router.get('/',(req,res)=>{
    const tasks = {body:"hola"}
    res.json(tasks)
})
module.exports = router