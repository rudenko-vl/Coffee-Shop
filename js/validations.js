const nameError = document.getElementById('name-error');
const phoneError = document.getElementById('phone-error');
const cvvError = document.getElementById('cardCvv-error');
const yearError = document.getElementById('cardYear-error');
const monthError = document.getElementById('cardMonth-error');
const cardNumberError = document.getElementById('cardNumber-error');
const adsressError = document.getElementById('adsress-error');

const inputName = document.getElementById('nameInput');
const inputPhone = document.getElementById('phoneImput');
const inputMonth = document.getElementById('cardMonth');
const inputYear = document.getElementById('cardYear');
const inputCvv = document.getElementById('cardCvv');
const inputcardNumber = document.getElementById('cardNumber');
const inputAddress = document.getElementById('addressInput');

const submitButton = document.querySelector(".payButton");
const form = document.querySelector(".payment");

submitButton.disabled = true;
submitButton.classList.add("disabled");

let isValidName = false;
let isValidPhone = false;
let isValidMonth = false;
let isValidYear = false;
let isValidCvv = false;
let isValidcardNumber = false;
let isValidAddress = false;

inputName.addEventListener('input', () => {
    let name = document.getElementById('nameInput').value;
    if (name.length == 0) {
        nameError.innerHTML = 'Name is required!'
        isValidName = false;
        return false
    }
    else if (!name.match(/^[a-zA-Zа-яА-Я]+(\s[a-zA-Zа-яА-Я]+){1,2}(\s[a-zA-Zа-яА-Я]+)?$/)) {
        nameError.innerHTML = 'Write full name!'
        isValidName = false;
        return false;
    } else {
        nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
        isValidName = true;
        return true;
    }
})

inputPhone.addEventListener('input', () => {
    let phone = document.getElementById('phoneImput').value;

    if (phone.length == 0) {
        phoneError.innerHTML = 'Phone is required!';
        isValidPhone = false;
        return false
    }
    else if (!phone.match(/^\+38\s?0\s?\d{9}$/)) {
        phoneError.innerHTML = 'Uncorrect number!';
        isValidPhone = false;
        return false;
    }
    else {
        phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        isValidPhone = true;
        return true;
    }
})

inputMonth.addEventListener('input', () => {
    let month = document.getElementById('cardMonth').value;

    if (month.length == 0) {
        monthError.innerHTML = 'Required!';
        isValidMonth = false;
        return false
    }
    else if (!month.match(/^(0[1-9]|1[0-2])$/)) {
        monthError.innerHTML = 'From 01 to 12!';
        isValidMonth = false;
        return false;
    } else {
        monthError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        isValidMonth = true;
        return true;
    }
})

inputYear.addEventListener('input', () => {
    let year = document.getElementById('cardYear').value;

    if (year.length == 0) {
        yearError.innerHTML = 'Required!';
        isValidYear = false;
        return false
    }
    // else if (!year.match(/^202\d[4-9]$/))
    else if (!year.match(/^(202[4-9]|203[0-9])$/)) {
        yearError.innerHTML = 'From 2024 to...'
        isValidYear = false;
        return false;
    } else {
        yearError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        isValidYear = true;
        return true;
    }
})

inputCvv.addEventListener('input', () => {
    let cvv = document.getElementById('cardCvv').value;

    if (cvv.length == 0) {
        cvvError.innerHTML = 'Required!';
        isValidCvv = false;
        return false
    }
    else if (!cvv.match(/^\d{3}$/)) {
        cvvError.innerHTML = 'Only 3 digits!';
        isValidCvv = false;
        return false;
    } else {
        cvvError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        isValidCvv = true;
        return true;
    }
})

inputcardNumber.addEventListener('input', () => {
    let number = document.getElementById('cardNumber').value;

    if (number.length == 0) {
        cardNumberError.innerHTML = 'Required!';
        isValidcardNumber = false;
        return false
    }
    else if (!number.match(/^\d{5}$/)) {
        cardNumberError.innerHTML = 'Only 5 digits!';
        isValidcardNumber = false;
        return false;
    } else {
        cardNumberError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        isValidcardNumber = true;
        return true;
    }
})

inputAddress.addEventListener('input', () => {
    let address = document.getElementById('addressInput').value;

    if (address.length == 0) {
        adsressError.innerHTML = 'Required!';
        isValidAddress = false;
        return false
    }
    else if (address.length < 10) {
        adsressError.innerHTML = 'Min 10 characters!';
        isValidAddress = false;
        return false;
    }
    else {
        adsressError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        isValidAddress = true;
        return true;
    }
})

form.addEventListener('input', () => {
    if (isValidName && isValidPhone && isValidMonth && isValidYear && isValidCvv && isValidcardNumber && isValidAddress) {
        submitButton.disabled = false;
        submitButton.classList.remove("disabled");
    } else {
        submitButton.disabled = true;
        submitButton.classList.add("disabled");
    }
})

submitButton.addEventListener('click', () => {
    isValidName = false;
    isValidPhone = false;
    submitButton.disabled = true;
    submitButton.classList.add("disabled");
})


