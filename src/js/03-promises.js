import Notiflix from 'notiflix';

const formPromise = document.querySelector('.form');
formPromise.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
evt.preventDefault()
  let { elements: { delay, step, amount },} = evt.currentTarget;
delay = Number(delay.value);
step = Number(step.value);
amount = Number(amount.value);
  
  for (let position = 1; position <= amount; position++) {
createPromise(position, delay)
.then(({ position, delay }) => {
    setTimeout(() => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }, delay);
  })
.catch(({ position, delay }) => {
    setTimeout(() => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
});
delay += step;}};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
})
};
