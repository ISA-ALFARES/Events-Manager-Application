

document.addEventListener("DOMContentLoaded", function() {
    flatpickr(".event-date", {
      dateFormat: "Y-m-d",  // Set date format
      minDate: new Date().toISOString().split("T")[0],  // Set minimum date
      maxDate: "" // Set maximum date
      // Additional options and customizations

    });
  });

  function  addEvent() {
    const eventName = document.querySelector(".event-name").value; // Get event name
    const eventDate = document.querySelector(".event-date").value; // Get event date
    const eventOrganizer = document.querySelector(".organizer").value; // Get event organizer
    // GEt Time milliseconds From  Eposh Time To Event Date
    const eventTimeStmp = new Date(eventDate).getTime(); 

    // Create event object
    const event = {
      name: eventName,
      date: eventDate,
      organizer: eventOrganizer,
      timeStamp: eventTimeStmp
    };
    let events = JSON.parse(localStorage.getItem("events")) || []; // Get events from local storage
    events.push(event); // Add event to events array
    localStorage.setItem("events", JSON.stringify(events)); // Save events to local storage
    console.log(events);
    const  inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = "" ));

    displayEvents();
    }

    function  displayEvents(){
      const events = JSON.parse(localStorage.getItem("events")) || []; // Get events from local storage
      const eventsList = document.querySelector(".events"); // Get events container
      eventsList.innerHTML = ""; // Clear events container=
      events.forEach((event) => {
        eventsList.innerHTML += `
        <div class="event">
        <h3>${event.name}</h3>
        <p><span>By</span>${event.organizer}</p>
        <p><span>On</span>${event.date}</p>
        <p><span>Time Left:</span>Time</p>
        <button onclick="deleteEvent(${index})">Delete</button>
        </div>
        `;
      });
    }
    
    displayEvents();

    function delteEvent(index){
      const events = JSON.parse(localStorage.getItem("events")); // Get events from local storage
      events.splice(index, 1);  // Remove event from events array
      localStorage.setItem("events", JSON.stringify(events)); // Save events to local storage
      displayEvents(); 
    }

