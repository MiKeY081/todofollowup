import { TopologyClosedEvent } from "mongodb"
import { TodoModel } from "../models/Todo.js"

const createTodo = async (req, res)=>{
    const {task} = req.body
    try {
       const todo = await TodoModel.create({task})
       res.send({todo})
    } catch (error) {
        res.send(error.message)
    }
}

const getTodo = async (req, res)=>{
    try {
    const allTodo =(await TodoModel.find())
    res.send({allTodo})
    } catch (error) {
        res.send(error.message)
        
    }
}

const deleteTodo = async (req, res)=>{
    const {id} = req.params
    await TodoModel.findByIdAndDelete(id)
    res.send({message: "Product deleted"})

}
const updateTodo  =  async( req, res ) => {
     const {id} = req.params
     try {
        const todo = await TodoModel.findById(id)
        todo.checkbox= !todo.checkbox;
        todo.save();
        const allChecked = await TodoModel.find()
        res.send({allChecked})
     } catch (error) {
        console.log(error.message)
        
     }
}
export {createTodo, getTodo, deleteTodo, updateTodo}