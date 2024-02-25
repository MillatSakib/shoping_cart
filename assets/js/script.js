let cartArr = [];
let cartCounter = 0;
let cartClick = document.getElementsByClassName('cart_added');
cards = "";

document.getElementById('cart_goto').addEventListener('click', function () {
    document.getElementById('cart_details').style.display = 'block';
    cards = ""
    for (i of cartArr) {
        cards += `<div class="d-flex product_card justify-content-center"> <div class="customize_card"> <div class="d-flex align-items-center gap-3"> <div><img src="${i.image}" alt="" class="checkOutImg"></div> <div class="textSize">${i.phoneSelected}</div> </div> <div class="d-flex align-items-center"><span class="increment">+</span> <input type="number" class="productNumber" value="${i.productCount}" readonly> <span class="decrement">-</span> <div class="priceDiv">$<span class="checkoutPrice">${(i.productCount) * (i.phonePrice)}</span></div> <span class="remove">X</span> </div> </div> </div>`
    }
    document.getElementById('cart_details').innerHTML = cards;

})


for (let i = 0; i < cartClick.length; i++) {
    cartClick[i].addEventListener('click', cart_operation); // Removed '()' from cart_operation
}

function cart_operation(event) {
    const card = event.target.parentElement.parentElement.parentElement;
    const price = card.querySelector('.price').innerText;
    const phoneName = card.querySelector('.brand_name').innerText;
    const imgSrc = card.querySelector('.imgSrc').src;
    let createdObject = {
        phoneSelected: phoneName,
        phonePrice: price,
        image: imgSrc,
        productCount: 1,
    }

    //bellow I use if  if else condition to check are the object present in the array or not
    let index = checkObjectInArray(phoneName);
    if (index === -1) {
        cartArr.push(createdObject);
    }
    else {
        cartArr[index].productCount++;
    }

    //Here I Update the value of  cart product
    cartCounter = cartArr.length;
    if (cartCounter >= 1) {
        document.getElementById('cart_goto').setAttribute("href", "#cart_details");

    }
    else {
        document.getElementById('cart_details').style.display = 'none';
    }
    document.getElementById('total_cart').innerText = cartCounter;
}

function checkObjectInArray(phoneName) {
    return cartArr.findIndex(index => index.phoneSelected === phoneName);

}


