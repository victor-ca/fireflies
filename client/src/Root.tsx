import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import useUserStore from "./utils/useUser";
import "./Root.scss";

function Root() {
  const { userId, changeUser } = useUserStore();
  const [userIdInput, setUserIdInput] = useState(userId);
  const isLoggedIn = !!userId;
  const isUserIdInputChanged = userIdInput !== userId;

  const onUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserIdInput(e.target.value);
  };
  const login = () => {
    changeUser(userIdInput);
  };

  return (
    <>
      <div id="sidebar">
        <div>
          <input
            id="user-id"
            name="user-id"
            aria-label="user id"
            value={userIdInput}
            placeholder="Your user id"
            onChange={onUserChange}
          />
          {isUserIdInputChanged && <button onClick={login}>Login</button>}
        </div>
        {isLoggedIn && (
          <nav>
            <ul>
              <li>
                <Link to="/meetings/new">New Meeting</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/meetings">Meetings</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div id="detail">{isLoggedIn && <Outlet />}</div>
    </>
  );
}

export default Root;
