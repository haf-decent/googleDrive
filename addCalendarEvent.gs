/*
the date input is the MM/dd/yyyy and the time input is military time HH:mm
This creates a Calendar event entry with the specified name, start time, and duration
*/

function createCal(name, date, time) {
  var duration = 60; //duration of event in minutes
  var startTime = new Date(date + ' ' + time);
  var endTime = new Date(startTime.getTime() + (duration*60*1000)); //sets endTime to be __min after startTime ( __min * 60 sec/min * 1000 ms/sec)
  var event = CalendarApp.getDefaultCalendar().createEvent(name, startTime, endTime); //name is the name of the Event
}
