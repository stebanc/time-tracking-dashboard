"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cards = document.querySelectorAll('.card__hours-content');
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const cardsArray = [...cards];
function navClass(element) {
    element[0].classList.add('nav__link--active');
    element[1].classList.remove('nav__link--active');
    element[2].classList.remove('nav__link--active');
}
function getReport(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const data = yield response.json();
        return data;
    });
}
function setReport(data) {
    getReport('../data.json').then((value) => {
        for (let i = 0; i < value.length; i++) {
            const current = cardsArray[i].querySelector('h3');
            const previous = cardsArray[i].querySelector('p');
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
