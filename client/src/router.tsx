import Root from "./Root.tsx";
import { createBrowserRouter } from "react-router-dom";
import MeetingPage from "./components/meetings/list/MeetingPage.tsx";
import NewMeeting from "./components/meetings/new/NewMeeting.tsx";
import SingleMeetingPage from "./components/meetings/single/SingleMeetingPage.tsx";
import TaskListPage from "./components/tasks/TaskListPage.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1 style={{ textAlign: "center", padding: "2rem" }}>:(</h1>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/meetings",
        element: <MeetingPage />,
      },
      {
        path: "/meetings/new",
        element: <NewMeeting />,
      },
      {
        path: "/meetings/:id",
        element: <SingleMeetingPage />,
      },
      {
        path: "/tasks",
        element: <TaskListPage />,
      },
    ],
  },
]);
