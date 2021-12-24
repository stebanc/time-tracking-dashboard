const cards = document.querySelectorAll('.card__hours-content');

const daily = <HTMLLinkElement>document.getElementById('daily');
const weekly = <HTMLLinkElement>document.getElementById('weekly');
const monthly = <HTMLLinkElement>document.getElementById('monthly');

const cardsArray = [...cards];

function navClass(element: HTMLLinkElement[]) {
  element[0].classList.add('nav__link--active');
  element[1].classList.remove('nav__link--active');
  element[2].classList.remove('nav__link--active');
}

async function getReport(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function setReport(data: string) {
  getReport('../../data.json').then((value) => {
    for (let i = 0; i < value.length; i++) {
      const current = <HTMLElement>cardsArray[i].querySelector('h3');
      const previous = <HTMLElement>cardsArray[i].querySelector('p');
      current.textContent = `${value[i].timeframes[data].current}hrs`;
      previous.textContent = `Last Week - ${value[i].timeframes[data].previous}hrs`;
    }
  });
}

daily.addEventListener('click', () => {
  navClass([daily, weekly, monthly]);
  setReport('daily');
});

weekly.addEventListener('click', () => {
  navClass([weekly, daily, monthly]);
  setReport('weekly');
});

monthly.addEventListener('click', () => {
  navClass([monthly, daily, weekly]);
  setReport('monthly');
});
