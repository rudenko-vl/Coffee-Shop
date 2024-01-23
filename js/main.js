const search = document.querySelector('.search-box');
const searchBtn = document.getElementById('search-icon');

searchBtn.addEventListener('click', () => {
    search.classList.toggle('active')
})