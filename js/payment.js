const payBtn = document.querySelector('.payButton');
const nameInput = document.getElementById('nameInput');
const addressInput = document.getElementById('addressInput');
const phoneImput = document.getElementById('phoneImput');
const cardNumber = document.getElementById('cardNumber');
const cardMounth = document.getElementById('cardMounth');
const cardYear = document.getElementById('cardYear');
const cardCvv = document.getElementById('cardCvv');
const usersInfo = [];

const resetForm = () => {
    nameInput.value = ''
    addressInput.value = ''
    phoneImput.value = ''
    cardNumber.value = ''
    cardMounth.value = ''
    cardYear.value = ''
    cardCvv.value = ''
}

payBtn.onclick = (ev) => {
    ev.preventDefault();
    const payInfo = {
        "name": nameInput.value,
        "address": addressInput.value,
        "phone": phoneImput.value,
        "card": cardNumber.value,
        "mounth": cardMounth.value,
        "year": cardYear.value,
        "cvv": cardCvv.value,
    }
    const allInputs = payInfo.name && payInfo.address && payInfo.phone && payInfo.card && payInfo.mounth && payInfo.year && payInfo.cvv;

    if (!allInputs) {
        alert('Fill in all information')
    } else {
        usersInfo.push(payInfo)
        console.log(usersInfo)
        resetForm()
    }
}