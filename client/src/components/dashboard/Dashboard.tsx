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

  const groupedOverdueTasks = dashboardData.overdueTasks.reduce((acc, task) => {
    if (!acc[task.meetingId]) {
      acc[task.meetingId] = [];
    }
    acc[task.meetingId].push(task);
    return acc;
  }, {} as Record<string, typeof dashboardData.overdueTasks>);

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
        {Object.entries(groupedOverdueTasks).map(([meetingId, tasks]) => (
          <div key={meetingId}>
            <h3>{tasks[0].meetingTitle}</h3>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  {task.title} - Due:{" "}
                  {formatDistanceToNow(new Date(task.dueDate), {
                    addSuffix: true,
                  })}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
