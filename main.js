document.addEventListener("DOMContentLoaded", function() {
    flatpickr(".event-date", {
      dateFormat: "Y-m-d",  // Set date format
      minDate: new Date().toISOString().split("T")[0],  // Set minimum date
      maxDate: "" // Set maximum date
      // Additional options and customizations

    });
  });


