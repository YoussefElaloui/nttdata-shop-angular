const hamburgerBtn = document.querySelector('.hamburger-btn');
const menu = document.querySelector('.menu');


hamburgerBtn.addEventListener('click', () => {
    if (menu.style.height == '0px') {
        menu.style.height = '350px';
    } else {
        menu.style.height = '0px';
    }
    console.log('open');
})