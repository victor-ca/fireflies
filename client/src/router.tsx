import Root from "./Root.tsx";
import { createBrowserRouter } from "react-router-dom";
import MeetingList from "./components/meetings/list/MeetingList.tsx";
import NewMeeting from "./components/meetings/new/NewMeeting.tsx";
import SingleMeeting from "./components/meetings/single/SingleMeeting.tsx";

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
      {
        path: "/meetings/:id",
        element: <SingleMeeting />,
      },
    ],
  },
]);
