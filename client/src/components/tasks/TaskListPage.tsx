import React from "react";
import { useGetAuthenticated } from "../../utils/http";
import TaskList from "./TaskList";
import { ITask } from "../../model/task.model";

const TaskListPage: React.FC = () => {
  const { data: tasks, isLoading } = useGetAuthenticated<ITask[]>(
    "/api/tasks",
    {
      cacheKey: "tasks",
    }
  );

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      <h1>Tasks</h1>
      {tasks ? <TaskList tasks={tasks} /> : <p>No tasks found.</p>}
    </div>
  );
};

export default TaskListPage;
