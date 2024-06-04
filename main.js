  document.addEventListener("DOMContentLoaded", function() {
    flatpickr(".event-date", {
        enableTime: true,     
        dateFormat: "Y-m-d H:i", 
        minDate: new Date().toISOString().split("T")[0],   
        time_24hr: true    
        // Additional options and customizations
    });
});

  function  addEvent() {
    const eventName = document.querySelector(".event-name").value; // Get event name
    const eventDate = document.querySelector(".event-date").value; // Get event date
    const eventOrganizer = document.querySelector(".organizer").value; // Get event organizer
    // GEt Time milliseconds From  Eposh Time To Event Date
    const eventTimeStmp = new Date(eventDate).getTime();  // Get event time stamp
    
    if(eventName && eventDate && eventOrganizer){
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
    else{
      alert("All fields are required");
    }

    }

    function  displayEvents(){
      const events = JSON.parse(localStorage.getItem("events")) || []; // Get events from local storage
      const eventsList = document.querySelector(".events"); // Get events container
      eventsList.innerHTML = ""; // Clear events container=
      events.forEach((event , index) => {
        const  now = new Date().getTime(); // Get current time
        const timeleft = event.timeStamp - now; // Calculate time left


        if (timeleft <= 0) {
          eventsList.innerHTML += `
          <div class="event">
              <h3>${event.name}</h3>
              <p><span>By:</span>${event.organizer}</p>
              <p><span>On:</span>${event.date}</p>
              <p><span>Time Left:</span> <span class="active">Event has passed</span></p>
              <button onclick="deleteEvent(${index})">Delete</button>
          </div>
          `;
        }else{
            const days = Math.floor(timeleft / (1000 * 60 * 60 * 24)); // Calculate days
            const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60  * 60)); // Calculate hours
            const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
            const seconds = Math.floor((timeleft % (1000 * 60)) / 1000); // Calculate seconds
            eventsList.innerHTML += `
            <div class="event">
            <h3>${event.name}</h3>
            <p><span>By:</span>${event.organizer}</p>
            <p><span>On:</span>${event.date}</p>
            <p><span>Time Left:</span>${days}d ${hours}h ${minutes}m  ${seconds}s </p>
            <button onclick="deleteEvent(${index})">Delete</button>
            </div>
            `;
          }
      });
    }
    setInterval(displayEvents, 1000);
    displayEvents();
    function deleteEvent(index){
      const events = JSON.parse(localStorage.getItem("events")); // Get events from local storage
      events.splice(index, 1);  // Remove event from events array
      localStorage.setItem("events", JSON.stringify(events)); // Save events to local storage
      displayEvents(); 
    }



