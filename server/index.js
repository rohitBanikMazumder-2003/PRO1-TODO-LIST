import express from 'express';
import cors from 'cors';
import pool from './db.js'
const app=express();

//middleware
app.use(cors());
app.use(express.json());

pool.connect();

//create a todo
app.post('/todos',async(req,res)=>{
    try {
        const {description}=req.body;
        const newTodo=await pool.query(
            "INSERT INTO todo(description) values($1) returning *",[description]
        );
        res.json(newTodo.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
})

//get all todo

app.get('/todos',async(req,res)=>{
    try {
        const allTodos=await pool.query("select * from todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//get a todo
app.get('/todos/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const todo=await pool.query('select * from todo where todo_id=$1',[id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//update a todo
app.put('/todos/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const {description}=req.body;

        const updateTodo=await pool.query("update todo set description=$1 where todo_id=$2",
            [description,id]
        );

        res.json("todo was updated");

    } catch (error) {
        console.error(error.message);
    }
})

//delete a todo
app.delete('/todos/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        await pool.query("delete from todo where todo_id=$1",[id]);
        res.json(id+" was deleted succesfully");
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000,()=>{
    console.log("server has started on port 5000");
})