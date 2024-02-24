let cart_arr = [];
let cart_click = document.getElementsByClassName('cart_added');

for (let i = 0; i < cart_click.length; i++) {
    cart_click[i].addEventListener('click', cart_operation); // Removed '()' from cart_operation
}

function cart_operation(event) {
    console.log(event.target.innerText);
    cart_arr.push({});
    // console.log(cart_click[i].parentElement.parentElement);

    const card = event.target.parentElement.parentElement; // 'event.target' instead of 'cart_click[i]'
    const price = card.querySelector('.price').innerText;
    console.log(price);
}
