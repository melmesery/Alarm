const clock = document.querySelector(".clock"),
  alarmSelect = document.querySelector(".alarm-select"),
  selectMenu = document.querySelectorAll("select"),
  alarmBtn = document.querySelector("button");

let setting;
let alarmIsSet;
let ringtone = new Audio("files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let timing = i == 1 ? "AM" : "PM";
  let option = `<option value="${timing}">${timing}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    timing = "AM";
  if (h >= 12) {
    h = h - 12;
    timing = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  clock.innerText = `${h}:${m}:${s} ${timing}`;

  if (setting === `${h}:${m} ${timing}`) {
    ringtone.play();
    ringtone.loop = true;
  }
});

function setAlarm() {
  if (alarmIsSet) {
    setting = "";
    ringtone.pause();
    alarmSelect.classList.remove("disable");
    alarmBtn.innerText = "Set Alarm";
    return (alarmIsSet = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please, select a valid time to set Alarm!");
  }
  setting = time;
  alarmIsSet = true;
  alarmSelect.classList.add("disable");
  alarmBtn.innerText = "Clear Alarm";
}

alarmBtn.addEventListener("click", setAlarm);
