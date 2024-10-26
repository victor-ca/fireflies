import Root from "./Root.tsx";
import { createBrowserRouter } from "react-router-dom";
import MeetingList from "./components/meetings/list/MeetingList.tsx";
import NewMeeting from "./components/meetings/new/NewMeeting.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Not found</h1>,
    children: [
      {
        path: "/meetings",
        element: <MeetingList />,
      },
      {
        path: "/meetings/new",
        element: <NewMeeting />,
      },
    ],
  },
]);
