"use client";

import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, isSameMonth, isToday, isSameDay, addMonths, subMonths } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';


interface CalendarProps {
  events: Array<{
    id: number;
    title: string;
    date: Date;
    time: string;
    duration: number;
    type: string;
    name: string;
    phone: string;
    email: string;
    startTime: string;
    endTime: string;
  }>;
  onDateClick: (date: Date) => void;
}

const Calendar = ({ events, onDateClick }: CalendarProps) => {
  // Set to current date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Auto-update calendar to current month
  useEffect(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Only update if we're not already on the current month
    if (currentDate.getMonth() !== currentMonth || currentDate.getFullYear() !== currentYear) {
      setCurrentDate(now);
    }
  }, [currentDate]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // Generate array of days for the month
  const days: Date[] = [];
  
  // Add padding days from previous month to start on correct day of week
  const startDayOfWeek = monthStart.getDay();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(monthStart);
    prevDate.setDate(prevDate.getDate() - (i + 1));
    days.push(prevDate);
  }
  
  // Add all days of current month
  const current = new Date(monthStart);
  while (current <= monthEnd) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  // Add padding days from next month to complete the grid
  const endDayOfWeek = monthEnd.getDay();
  for (let i = 1; i <= 6 - endDayOfWeek; i++) {
    const nextDate = new Date(monthEnd);
    nextDate.setDate(nextDate.getDate() + i);
    days.push(nextDate);
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-700';
      case 'review':
        return 'bg-purple-100 text-purple-700';
      case 'call':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 relative">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-[5000ms]"
          >
            <svg className="w-6 h-6 text-slate-600 dark:text-slate-400 transition-colors duration-[5000ms]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.h2 
            key={format(currentDate, 'MMMM yyyy')}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-2xl font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-[5000ms]"
          >
            {format(currentDate, 'MMMM yyyy')}
          </motion.h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-[5000ms]"
          >
            <svg className="w-6 h-6 text-slate-600 dark:text-slate-400 transition-colors duration-[5000ms]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2 relative z-20">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center py-2 text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-[5000ms]">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 relative">
        <div className="grid grid-cols-7 gap-1">
          {days.map((day: Date) => {
            const events = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isCurrentDay = isToday(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            return (
              <motion.div
                key={day.toString()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (isCurrentMonth) { // Only allow clicking on current month days
                    setSelectedDate(day);
                    onDateClick(day);
                  }
                }}
                className={`
                  min-h-[120px] p-2 rounded-lg
                  ${isCurrentMonth ? 'cursor-pointer bg-white' : 'cursor-default bg-slate-50'}
                  ${isCurrentDay ? 'ring-2 ring-orange-500 dark:ring-cyan-400 bg-orange-50 dark:bg-cyan-50' : ''}
                  ${isSelected ? 'ring-2 ring-blue-400 bg-blue-100' : ''}
                  ${!isCurrentMonth ? 'opacity-50' : 'hover:bg-slate-50'}
                  transition-all duration-[5000ms]
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`
                    text-sm font-medium transition-colors duration-[5000ms]
                    ${isCurrentDay ? 'text-orange-600 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300'}
                  `}>
                    {format(day, 'd')}
                  </span>
                  {events.length > 0 && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-[5000ms]">
                      {events.length} {events.length === 1 ? 'event' : 'events'}
                    </span>
                  )}
                </div>
                
                <div className="space-y-1">
                  <AnimatePresence>
                    {events.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className={`
                          text-xs p-1 rounded truncate
                          ${getEventTypeColor(event.type)}
                        `}
                      >
                        {event.title} ({event.startTime}-{event.endTime})
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="p-6 bg-slate-50 border-t border-slate-100"
        >
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors duration-[5000ms]">
            Events for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="space-y-3">
            {getEventsForDate(selectedDate).map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`
                  p-3 rounded-lg
                  ${getEventTypeColor(event.type)}
                `}
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-sm opacity-75">
                  {event.startTime} - {event.endTime} ({event.duration} min)
                </div>
                {event.phone && (
                  <div className="text-xs opacity-60">
                    Phone: {event.phone}
                  </div>
                )}
                {event.email && (
                  <div className="text-xs opacity-60">
                    Email: {event.email}
                  </div>
                )}
              </motion.div>
            ))}
            {getEventsForDate(selectedDate).length === 0 && (
              <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-[5000ms]">No events scheduled for this day.</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Calendar;