'use strict';

// Modules:
var $ = require('jquery');
var FullCalendar = require('fullcalendar');

// Load styles:
require('fullcalendar/dist/fullcalendar.css'); 

// Render the calendar on document load.
$(function () {
  $('#class-calendar').fullCalendar({
    // Display the month name and previous/next month buttons:
    header: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },

    // Fetch events from the API and format them for FullCalendar
    events: function (start, end, timezone, callback) {
      // Get the month currently in view:
      var month = start.endOf('week').format('YYYY-MM-DD');

      // Formats class data from the API for a FullCalendar event:
      function createCalendarEventFromClassData (classData) {
        return {
          title: classData.name+' ('+(classData.slots - classData.slotsAvailable)+'/'+classData.slots+')',
          start: classData.time,
          color: classData.color,
          data: classData // for the "click" handler
        };
      }

      // And request the classes for that month:
      $.get('/api/classes?month='+month)
        .then(function (classes) {
          // Map the classes data to events for calendars:
          var eventsData = [];
          for (var i = 0; i < classes.length; i++) {
            eventsData.push(
              createCalendarEventFromClassData(classes[i])
            );
          };
          // Send the events data to the calendar:
          callback(eventsData);
        }, function (error) {
          console.error(error);
        });
    },

    // Open the client scheduler on click:
    eventClick: function (event) {
      var data = event.data;
      if (typeof ACUITY_USER_ID === 'undefined') {
        console.error('Acuity user ID missing.  Please start webpack with `--define ACUITY_USER_ID=YOUR_ID`');
      }
      window.open('https://app.acuityscheduling.com/schedule.php?' +
        'owner=' + ACUITY_USER_ID +
        '&datetime='+data.time +
        '&calendarID='+data.calendarID +
        '&appointmentType='+data.appointmentTypeID
      );
    }
  });
});
