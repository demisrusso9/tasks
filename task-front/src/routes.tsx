import React from "react";
import { Switch, Route } from "react-router-dom";

import Tasks from "./pages/Tasks";
import TasksForm from "./pages/Form";
import TasksDetail from "./pages/Detail";

const Routes: React.FC = () => {
   return (
      <Switch>         
         <Route path="/tasks" exact component={Tasks} />
         <Route path="/tasks/add" exact component={TasksForm} />
         <Route path="/tasks/add/:id" exact component={TasksForm} />
         <Route path="/tasks/:id" exact component={TasksDetail} />
      </Switch>
   );
};

export default Routes;
