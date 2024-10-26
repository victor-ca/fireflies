import { useGetAuthenticated } from "../../../utils/http";

export const MeetingStats: React.FC = () => {
  const { data: stats, isLoading } = useGetAuthenticated(
    `/api/meetings/stats`,
    {
      cacheKey: "meeting-stats",
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <pre>{JSON.stringify(stats, null, 2)}</pre>;
};
