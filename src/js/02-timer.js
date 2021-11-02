import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const datePicker = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('button[data-start]');

const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectDate = null;
let timerId = null;

    const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0];
     const currentDate = Date.now();
      if (selectDate.getTime() > currentDate) {
          btnStart.removeAttribute('disabled')
          Notiflix.Notify.info('Date correct, press "Start"');
      }
      else {
            Notiflix.Notify.failure('Please choose a date in the future');
      }
  },
};

btnStart.addEventListener('click', onBtnStart);

function onBtnStart() {
    
timerId = setInterval(() => {
const delTime = selectDate.getTime() - Date.now();
document.getElementById('datetime-picker').setAttribute('disabled', 'disabled');
const dif = convertMs(delTime);
for (const [key, value] of Object.entries(dif)) {
refs[key].textContent = addLeadingZero(value);
    }     
if (delTime <= 1000) {
    clearInterval(timerId);
    Notiflix.Notify.success('Done, timer is over');
    document.getElementById('datetime-picker').removeAttribute('disabled');
    }
  }, 1000);
    btnStart.setAttribute('disabled', 'disabled');    
}

init();
function init() {
  btnStart.setAttribute('disabled', 'disabled');
}

flatpickr(datePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}