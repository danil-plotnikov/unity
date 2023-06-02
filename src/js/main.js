const swiper = new Swiper('.swiper', {
 loop: true,
 slidesPerView: 3,
 spaceBetween: 3.5,
 breakpoints: {
  1024: {
   slidesPerView: 4,
   spaceBetween: 8
  }
 }
}); 

let date = new Date();
let currentMonth;
switch (date.getMonth()) {
 case 0:
  currentMonth = 'Января';
  break;
 case 1:
  currentMonth = 'Февраля';
 break;
 case 2:
  currentMonth = 'Марта';
 break;
 case 3:
  currentMonth = 'Апреля';
 break;
 case 4:
  currentMonth = 'Мая';
 break;
 case 5:
  currentMonth = 'Июня';
 break;
 case 6:
  currentMonth = 'Июля';
 break;
 case 7:
  currentMonth = 'Августа';
 break;
 case 8:
  currentMonth = 'Сентября';
 break;
 case 9:
  currentMonth = 'Октября';
 break;
 case 10:
  currentMonth = 'Ноября';
 break;
 case 11:
  currentMonth = 'Декабря';
 break;

 default:
  break;
}


document.querySelector('.main-list__item_dark').innerHTML = `Статья обновлена: ${date.getDate()} ${currentMonth} ${date.getFullYear()} `;


let burger = document.querySelector('.header-burger');
let nav = document.querySelector('.header-nav');
let headerLogo = document.querySelector('.header__logo');
let menuCurrent = document.querySelector('.header-menu__current');

burger.onclick = () => {
 nav.classList.toggle('active');
 burger.classList.toggle('active');
 if (headerLogo.style.display === "none") {
  headerLogo.style.display = "block";
 } else {
   headerLogo.style.display = "none";
 }
 if (menuCurrent.style.display === "none") {
  menuCurrent.style.display = "block";
 } else {
  menuCurrent.style.display = "none";
 }
}