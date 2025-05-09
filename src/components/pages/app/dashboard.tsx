import { useRecognitions } from "../../../service";
import { Leaderboard, LeaderboardStats } from "../../common";
import { AppLayout } from "../../layouts";

export const DashboardPage = () => {
  const { recognitions } = useRecognitions();
  const currentMonth = new Date().toISOString().slice(0, 7);

    console.log( recognitions)

  return (
    <AppLayout>
      <LeaderboardStats
        month={currentMonth}
        totalRecognitions={recognitions.length}
        participationRate={0}
        topDepartment="Development"
      />

      <Leaderboard/>
    </AppLayout>
  );
};
