import  { useState } from 'react';
import { Medal } from 'lucide-react';
import dayjs from 'dayjs';
import { useLeaderboard } from '../../service';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';


const MedalIcon = ({ rank }: { rank: number }) => {
  const colors = {
    1: 'text-yellow-500',
    2: 'text-gray-400',
    3: 'text-amber-600'
  };

  if (rank > 3) return null;

  return (
    <Medal className={`w-6 h-6 ${colors[rank as keyof typeof colors]}`} />
  );
};

export const Leaderboard = () => {


const [selectedMonth, setSelectedMonth] = useState(() => 
    dayjs().startOf('month').format('YYYY-MM')
);
  
  const { leaderboard, loading, error } = useLeaderboard(selectedMonth);

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = dayjs().subtract(i, 'month').toDate();
    return {
      value: dayjs(date).format('YYYY-MM'),
      label: dayjs(date).format('MMMM YYYY')
    };
  });

  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="p-4">
          <p className="text-red-600">Error loading leaderboard: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Recognition Leaderboard</CardTitle>
        <Select
          value={selectedMonth}
          onValueChange={(value) => setSelectedMonth(value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-pulse space-y-4 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Top 3 Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {leaderboard.slice(0, 3).map((entry) => (
                <Card key={entry.to_user_id} className="p-4 text-center">
                  <MedalIcon rank={entry.rank} />
                  <h3 className="font-semibold mt-2">{entry.full_name}</h3>
                  <p className="text-sm text-gray-600">
                    {entry.recognition_count} recognitions
                  </p>
                </Card>
              ))}
            </div>

            {/* Full List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200">
                {leaderboard.slice(3).map((entry) => (
                  <div
                    key={entry.to_user_id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 w-8">#{entry.rank}</span>
                      <span className="font-medium">{entry.full_name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {entry.recognition_count} recognitions
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {leaderboard.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No recognitions found for this month
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};