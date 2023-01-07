const hamburger = document.querySelector('.hamburger');
const displayer = document.querySelector('.displayer');
const closer = document.querySelector('.closer');

hamburger.addEventListener('click', () => {
    if (displayer.style.display === 'none') {
        displayer.style.display = 'block';
    } else {
        displayer.style.display = 'none';
    }
});

closer.addEventListener('click', () => {
    if (displayer.style.display === 'block') {
        displayer.style.display = 'none';
    } else {
        displayer.style.display = 'block';
    }
});