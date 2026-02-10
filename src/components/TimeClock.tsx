import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Clock, Coffee, LogIn, LogOut } from 'lucide-react';
import { TimeEntry } from '../types';

interface TimeClockProps {
  employeeName: string;
  onBack: () => void;
}

export function TimeClock({ employeeName, onBack }: TimeClockProps) {
  const [timeEntry, setTimeEntry] = useState<TimeEntry>({
    id: '1',
    employeeId: '1',
    employeeName,
    clockIn: new Date(),
    totalHours: 0,
  });
  const [onBreak, setOnBreak] = useState(false);

  const handleClockOut = () => {
    setTimeEntry({
      ...timeEntry,
      clockOut: new Date(),
      totalHours: (new Date().getTime() - timeEntry.clockIn.getTime()) / (1000 * 60 * 60),
    });
  };

  const handleBreak = () => {
    if (!onBreak) {
      setTimeEntry({ ...timeEntry, breakStart: new Date() });
      setOnBreak(true);
    } else {
      setTimeEntry({ ...timeEntry, breakEnd: new Date() });
      setOnBreak(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const currentDuration = timeEntry.clockOut
    ? timeEntry.totalHours || 0
    : (new Date().getTime() - timeEntry.clockIn.getTime()) / (1000 * 60 * 60);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1>Time Clock</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-4">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h2 className="mb-2">{employeeName}</h2>
              <Badge variant={timeEntry.clockOut ? 'secondary' : 'default'}>
                {timeEntry.clockOut ? 'Clocked Out' : 'Clocked In'}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Clock In</p>
                  <p>{formatTime(timeEntry.clockIn)}</p>
                </div>
                <LogIn className="w-5 h-5 text-green-600" />
              </div>

              {timeEntry.clockOut && (
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Clock Out</p>
                    <p>{formatTime(timeEntry.clockOut)}</p>
                  </div>
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
              )}

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Time</p>
                <p className="text-3xl">{formatDuration(currentDuration)}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {!timeEntry.clockOut && (
                <>
                  <Button
                    variant={onBreak ? 'default' : 'outline'}
                    className="w-full h-12"
                    onClick={handleBreak}
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    {onBreak ? 'Resume from Break' : 'Take Break'}
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full h-12"
                    onClick={handleClockOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Clock Out
                  </Button>
                </>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Today's Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm">Clocked In</p>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(timeEntry.clockIn)}
                    </span>
                  </div>
                </div>
              </div>

              {timeEntry.breakStart && (
                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm">Break Started</p>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(timeEntry.breakStart)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {timeEntry.breakEnd && (
                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm">Break Ended</p>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(timeEntry.breakEnd)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {timeEntry.clockOut && (
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm">Clocked Out</p>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(timeEntry.clockOut)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
