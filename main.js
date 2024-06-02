  document.addEventListener("DOMContentLoaded", function() {
    flatpickr(".event-date", {
      dateFormat: "Y-m-d",  // Set date format
      minDate: "2024-06-06",  // Set minimum date
      maxDate: "",  // Set maximum date
      theme: "dark",  // Set theme
      // Additional options and customizations
      defaultDate: "Select Date"   // Set default date

    });
  });


