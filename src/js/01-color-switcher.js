const btnStart = document.querySelector('button[data-start]')
const btnStop = document.querySelector('button[data-stop]')

let timerId = 0;

btnStart.addEventListener('click', onButtonStart);
btnStop.addEventListener('click', onButtonStop);

function onButtonStart() {
    btnStart.setAttribute('disabled', 'disabled')

   timerId = setInterval(() => {
        let bgColor = getRandomHexColor();
        document.body.style.backgroundColor = bgColor;
  console.log(" Run bg-color changing");
    }, 1000);
}

function onButtonStop(){
    clearInterval(timerId);
    btnStart.removeAttribute('disabled');
    console.log(`Interval with id ${timerId} has stopped!`);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
