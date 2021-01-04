import React, { useState, useEffect } from "react";
import { Badge, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../../service/api";
import moment from "moment";

import "./style.css";

interface ITasks {
   id: number;
   title: string;
   description: string;
   finished: boolean;
   created_at: Date;
   updated_at: Date;
}

const Tasks: React.FC = () => {
   const [tasks, setTasks] = useState<ITasks[]>([]);
   const history = useHistory();

   useEffect(() => {
      loadTasks();
   }, []);

   async function loadTasks() {
      const response = await api.get("/tasks");
      setTasks(response.data);
   }

   function formatDate(date: Date) {
      return moment(date).format("DD/MM/YYYY");
   }

   function newTask() {
      history.push("/tasks/add");
   }

   function editTask(id: number) {
      history.push(`tasks/add/${id}`);
   }

   function viewTask(id: number) {
      history.push(`tasks/${id}`);
   }

   async function finishTask(id: number) {
      await api.patch(`/tasks/${id}`);
      loadTasks();
   }

   async function deleteTask(id: number) {
      await api.delete(`/tasks/${id}`);
      loadTasks();
   }

   return (
      <div className="container">
         <br />
         <div className="task-header">
            <h1>Tasks Page</h1>
            <Button variant="dark" size="sm" onClick={newTask}>
               New Task
            </Button>
         </div>
         <br />

         <Table striped bordered hover className="text-center">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {tasks.map((task) => (
                  <tr key={task.id}>
                     <td>{task.id}</td>
                     <td>{task.title}</td>
                     <td>
                        <Badge variant={task.finished ? "success" : "warning"}>
                           {task.finished ? "Done" : "Pendent"}
                        </Badge>
                     </td>
                     <td>{formatDate(task.created_at)}</td>
                     <td>
                        <Button
                           disabled={task.finished}
                           size="sm"
                           variant="primary"
                           onClick={() => editTask(task.id)}
                        >
                           Edit
                        </Button>{" "}
                        <Button
                           disabled={task.finished}
                           size="sm"
                           variant="success"
                           onClick={() => finishTask(task.id)}
                        >
                           Finish
                        </Button>{" "}
                        <Button
                           size="sm"
                           variant="info"
                           onClick={() => viewTask(task.id)}
                        >
                           See Description
                        </Button>{" "}
                        <Button
                           size="sm"
                           variant="danger"
                           onClick={() => deleteTask(task.id)}
                        >
                           Delete
                        </Button>{" "}
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </div>
   );
};

export default Tasks;
