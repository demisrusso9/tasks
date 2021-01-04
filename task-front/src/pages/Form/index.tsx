import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../../service/api";

interface ITasks {
   title: string;
   description: string;
}

interface ParamsTypes {
   id: string;
}

const TasksForm: React.FC = () => {
   const { id } = useParams<ParamsTypes>();
   const history = useHistory();

   const [model, setModel] = useState<ITasks>({
      title: "",
      description: "",
   });

   useEffect(() => {
      if (id !== undefined) findTask(id);
   }, [id]);

   function updatedModel(e: ChangeEvent<HTMLInputElement>) {
      setModel({
         ...model,
         [e.target.name]: [e.target.value],
      });
   }

   async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();

      if (id !== undefined) {
         await api.put(`/tasks/${id}`, model);
      } else {
         await api.post("tasks", model);
      }

      goBack();
   }

   function goBack() {
      history.push('/tasks');
   }

   async function findTask(id: string) {
      const response = await api.get(`/tasks/${id}`);

      setModel({
         title: response.data.title,
         description: response.data.description,
      });
   }

   return (
      <div className="container">
         <br />
         <div className="task-header">
            <h1>New Task</h1>
            <Button variant="dark" size="sm" onClick={goBack}>
               Go Back
            </Button>
         </div>

         <div className="container">
            <Form onSubmit={onSubmit}>
               <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                     type="text"
                     name="title"
                     placeholder="Enter title"
                     value={model.title}
                     onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updatedModel(e)
                     }
                  />
               </Form.Group>

               <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                     as="textarea"
                     rows={3}
                     name="description"
                     placeholder="Description"
                     value={model.description}
                     onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updatedModel(e)
                     }
                  />
               </Form.Group>

               <Button variant="dark" type="submit">
                  Save
               </Button>
            </Form>
         </div>
      </div>
   );
};

export default TasksForm;
