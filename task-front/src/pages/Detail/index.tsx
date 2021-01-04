import React, { useState, useEffect } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import api from "../../service/api";

interface ITasks {
   id: number;
   title: string;
   description: string;
   finished: boolean;
   created_at: Date;
   updated_at: Date;
}

interface ParamsTypes {
   id: string;
}

const TasksDetail: React.FC = () => {
   const { id } = useParams<ParamsTypes>();
   const history = useHistory();

   const [task, setTask] = useState<ITasks>();

   useEffect(() => {
      findTask();
   }, [id]);

   function goBack() {
      history.goBack();
   }

   async function findTask() {
      const response = await api.get<ITasks>(`/tasks/${id}`);
      setTask(response.data);
   }

   function formatDate(date: Date | undefined) {
      return moment(date).format("DD/MM/YYYY");
   }

   return (
      <div className="container">
         <br />
         <div className="task-header">
            <h1>Task Detail</h1>
            <Button variant="dark" size="sm" onClick={goBack}>
               Go Back
            </Button>
         </div>

         <div className="container">
            <Card style={{ width: "30rem" }}>
               <Card.Body>
                  <Card.Title>{task?.title}</Card.Title>
                  <Card.Header className="text-muted">
                     <Card.Text>{task?.description}</Card.Text>
                  </Card.Header>

                  <Badge variant={task?.finished ? "success" : "warning"}>
                     {task?.finished ? "Done" : "Pendent"}
                  </Badge>
                  <br />

                  <strong>Created At: </strong>
                  <Badge variant="info">{formatDate(task?.created_at)}</Badge>

                  <br />
                  <strong>Updated At: </strong>
                  <Badge variant="info">{formatDate(task?.updated_at)}</Badge>
               </Card.Body>
            </Card>
         </div>
      </div>
   );
};

export default TasksDetail;
