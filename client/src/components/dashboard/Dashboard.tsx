import React from "react";
import { DashboardData } from "../../model/dashboard.model";
import { useGetAuthenticated } from "../../utils/http";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { data: dashboardData, isLoading } = useGetAuthenticated<DashboardData>(
    "/api/dashboard",
    { cacheKey: "dash" }
  );

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-summary">
        <h2>Summary</h2>
        <p>Total Meetings: {dashboardData.totalMeetings}</p>
        <h3>Task Summary</h3>
        <ul>
          <li>Pending: {dashboardData.taskSummary.pending}</li>
          <li>In Progress: {dashboardData.taskSummary.inProgress}</li>
          <li>Completed: {dashboardData.taskSummary.completed}</li>
        </ul>
      </div>
      <div className="upcoming-meetings">
        <h2>Upcoming Meetings</h2>
        <ul>
          {dashboardData.upcomingMeetings.map((meeting) => (
            <li key={meeting.id}>
              <Link to={`/meetings/${meeting.id}`}>{meeting.title}</Link> -{" "}
              {formatDistanceToNow(new Date(meeting.date), { addSuffix: true })}{" "}
              - Participants: {meeting.participantCount}
            </li>
          ))}
        </ul>
      </div>
      <div className="overdue-tasks">
        <h2>Overdue Tasks</h2>
        <ul>
          {dashboardData.overdueTasks.map((task) => (
            <li key={task.id}>
              {task.title} - Due: {new Date(task.dueDate).toLocaleString()} -
              Meeting: {task.meetingTitle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
