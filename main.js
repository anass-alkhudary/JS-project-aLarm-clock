const currantTime = { hour: null, minute: null, period: null };
const alarmsData = [];

function renderClock() {
  const date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let period;

  // format the hours
  if (hours === 0) {
    hours = 12;
  }

  // get the am or pm
  if (hours > 12) {
    hours = hours - 12;
    period = 'PM';
  } else {
    period = 'AM';
  }

  // set the hour & minute before formatting to string
  currantTime.hour = hours;
  currantTime.minute = minutes;

  if (hours < 10) {
    hours = '0' + hours;
  }

  // format the minutes
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  // format the seconds
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  currantTime.period = period.toLowerCase();

  // format the time
  const time = hours + ':' + minutes + ':' + seconds + ' ' + period;

  // render the time
  document.getElementById('clock').innerText = time;
}

function renderAlarms() {
  document.getElementById('alarms-list').innerText = '';
  for (let i = 0; i < alarmsData.length; i++) {
    const alarm = alarmsData[i];

    let hour = alarm.hour;
    let minute = alarm.minute;
    let period = alarm.period.toUpperCase();

    if (hour < 10) {
      hour = '0' + hour;
    }

    // format the minutes
    if (minute < 10) {
      minute = '0' + minute;
    }

    const alarmTime = hour + ':' + minute + ' ' + period;
    document.getElementById('alarms-list').innerHTML +=
      '<li>' + alarmTime + '</li>\n';
  }
}

function addAlarm(e) {
  e.preventDefault();
  const hour = Number(document.getElementById('hour').value);
  const minute = Number(document.getElementById('minute').value);
  const period = document.getElementById('period').value;

  alarmsData.push({ hour, minute, period });
  renderAlarms();
}

function checkAlarms() {
  for (let i = 0; i < alarmsData.length; i++) {
    const alarm = alarmsData[i];

    if (
      currantTime.hour === alarm.hour &&
      currantTime.minute === alarm.minute &&
      currantTime.period === alarm.period
    ) {
      alert('Alarm!');
      alarmsData.splice(i, 1);
      renderAlarms();
    }
  }
}

// init the clock
setInterval(function () {
  renderClock();
  checkAlarms();
}, 1000);

document.getElementById('alarm-form').addEventListener('submit', addAlarm);
