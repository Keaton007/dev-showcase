"use client";

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, isSameMonth, isToday, isSameDay, addMonths, subMonths } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    date: new Date(2024, 2, 15),
    time: '10:00 AM',
    duration: 60,
    type: 'meeting'
  },
  {
    id: 2,
    title: 'Project Review',
    date: new Date(2024, 2, 15),
    time: '2:00 PM',
    duration: 90,
    type: 'review'
  },
  {
    id: 3,
    title: 'Client Call',
    date: new Date(2024, 2, 20),
    time: '11:00 AM',
    duration: 30,
    type: 'call'
  },
  {
    id: 4,
    title: 'Code Review',
    date: new Date(2024, 2, 22),
    time: '3:00 PM',
    duration: 45,
    type: 'review'
  }
];

const Calendar = () => {
  // Set to current date (August 12th, 2025)
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 12)); // Month is 0-indexed, so 7 = August
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({
    name: '',
    phone: '',
    email: '',
    startTime: '',
    endTime: ''
  });

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
    return sampleEvents.filter(event => isSameDay(event.date, date));
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
      <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 relative">
        {/* Grey overlay when modal is open */}
        {showModal && (
          <div className="absolute inset-0 bg-slate-200 bg-opacity-60 z-10 rounded-t-2xl" />
        )}
        <div className="flex items-center justify-between mb-6 relative z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.h2 
            key={format(currentDate, 'MMMM yyyy')}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-2xl font-semibold text-slate-800"
          >
            {format(currentDate, 'MMMM yyyy')}
          </motion.h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2 relative z-20">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center py-2 text-sm font-medium text-slate-500">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 relative">
        {/* Grey overlay when modal is open */}
        {showModal && (
          <div className="absolute inset-0 bg-slate-200 bg-opacity-60 z-10 rounded-lg" />
        )}
        <div className="grid grid-cols-7 gap-1 relative z-20">
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
                    setClickedDate(day);
                    setShowModal(true);
                    setNewEvent({
                      name: '',
                      phone: '',
                      email: '',
                      startTime: '',
                      endTime: ''
                    });
                  }
                }}
                className={`
                  min-h-[120px] p-2 rounded-lg
                  ${isCurrentMonth ? 'cursor-pointer bg-white' : 'cursor-default bg-slate-50'}
                  ${isCurrentDay ? 'ring-2 ring-orange-500 dark:ring-cyan-400 bg-orange-50 dark:bg-cyan-50' : ''}
                  ${isSelected ? 'ring-2 ring-blue-400 bg-blue-100' : ''}
                  ${!isCurrentMonth ? 'opacity-50' : 'hover:bg-slate-50'}
                  transition-all duration-200
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`
                    text-sm font-medium
                    ${isCurrentDay ? 'text-orange-600 dark:text-cyan-400' : 'text-slate-700'}
                  `}>
                    {format(day, 'd')}
                  </span>
                  {events.length > 0 && (
                    <span className="text-xs text-slate-500">
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
                        {event.title}
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
          className="p-6 bg-slate-50 border-t border-slate-100 relative"
        >
          {/* Grey overlay when modal is open */}
          {showModal && (
            <div className="absolute inset-0 bg-slate-200 bg-opacity-60 z-10 rounded-b-2xl" />
          )}
          <div className="relative z-20">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
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
                  {event.time} ({event.duration} min)
                </div>
              </motion.div>
            ))}
            {getEventsForDate(selectedDate).length === 0 && (
              <p className="text-slate-500 text-sm">No events scheduled for this day.</p>
            )}
          </div>
        </div>
        </motion.div>
      )}

      {/* Add Event Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-slate-800">
                  Add Event for {clickedDate ? format(clickedDate, 'MMMM d, yyyy') : ''}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission here
                console.log('New event:', newEvent);
                setShowModal(false);
              }}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newEvent.phone}
                    onChange={(e) => setNewEvent({...newEvent, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newEvent.email}
                    onChange={(e) => setNewEvent({...newEvent, email: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Enter email"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Start Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      End Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;