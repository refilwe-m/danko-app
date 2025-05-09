import { Card, CardContent } from "../ui";
import dayjs from "dayjs";

interface StatsProps {
    month: string;
    totalRecognitions: number;
    participationRate: number;
    topDepartment: string;
  }
  
  export const LeaderboardStats: React.FC<StatsProps> = ({
    month,
    totalRecognitions,
    participationRate,
    topDepartment
  }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm font-medium text-gray-500">Month</div>
            <div className="text-xl font-bold mt-1">
              {dayjs(new Date(month)).format('MMMM YYYY')}
            </div>
          </CardContent>
        </Card>
  
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm font-medium text-gray-500">
              Total Recognitions
            </div>
            <div className="text-xl font-bold mt-1">{totalRecognitions}</div>
          </CardContent>
        </Card>
  
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm font-medium text-gray-500">
              Participation Rate
            </div>
            <div className="text-xl font-bold mt-1">{participationRate}%</div>
          </CardContent>
        </Card>
  
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm font-medium text-gray-500">
              Top Department
            </div>
            <div className="text-xl font-bold mt-1">{topDepartment}</div>
          </CardContent>
        </Card>
      </div>
    );
  };