    document.addEventListener('DOMContentLoaded', function() {
      const datetimePicker = document.getElementById('datetime-picker');
      const startButton = document.querySelector('[data-start]');
      const daysElement = document.querySelector('[data-days]');
      const hoursElement = document.querySelector('[data-hours]');
      const minutesElement = document.querySelector('[data-minutes]');
      const secondsElement = document.querySelector('[data-seconds]');

      let countdownInterval;
      let selectedDate;

      // Ініціалізація Flatpickr
      const fp = flatpickr(datetimePicker, {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose: function(selectedDates) {
          selectedDate = selectedDates[0];
          const now = new Date();
          
          if (selectedDate <= now) {
            window.alert("Please choose a date in the future");
            startButton.disabled = true;
          } else {
            startButton.disabled = false;
          }
        }
      });

      startButton.addEventListener('click', startCountdown);

      function startCountdown() {
        startButton.disabled = true;
        datetimePicker.disabled = true;
        
        countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
      }

      function updateCountdown() {
        const now = new Date();
        const diff = selectedDate - now;
        
        if (diff <= 0) {
          clearInterval(countdownInterval);
          resetTimer();
          return;
        }
        
        const time = convertMs(diff);
        
        daysElement.textContent = addLeadingZero(time.days);
        hoursElement.textContent = addLeadingZero(time.hours);
        minutesElement.textContent = addLeadingZero(time.minutes);
        secondsElement.textContent = addLeadingZero(time.seconds);
      }

      function resetTimer() {
        clearInterval(countdownInterval);
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        datetimePicker.disabled = false;
      }

      function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
      }

      function addLeadingZero(value) {
        return String(value).padStart(2, '0');
      }
    });
  