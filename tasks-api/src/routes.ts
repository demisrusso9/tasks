import { Router, Request, Response } from "express";
import { getTasks, getTask, saveTask, updateTask, finishedTask, deleteTask } from './controller/TasksController'

const routes = Router();

routes.get("/", (request: Request, response: Response) => response.json({ message: "Hello World" }));

routes.get('/tasks', getTasks); //All tasks
routes.get('/tasks/:id', getTask); //One Task
routes.post('/tasks', saveTask); //Save Task
routes.put('/tasks/:id', updateTask); // Update Task
routes.patch('/tasks/:id', finishedTask); // Update one task column
routes.delete('/tasks/:id', deleteTask); // Delete one Task

export default routes;
