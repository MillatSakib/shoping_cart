let cartArr = [];
let cartCounter = 0;
let cartClick = document.getElementsByClassName('cart_added');
cards = "";
let removeProduct = document.getElementsByClassName('remove');

document.getElementById('cart_goto').addEventListener('click', function () {
    showcart();
    // console.log(removeProduct.length)
})
function showcart() {
    document.getElementById('cart_details').style.display = 'block';

    cards = ""
    for (i of cartArr) {
        cards += `<div class="d-flex product_card justify-content-center"> <div class="customize_card"> <div class="d-flex align-items-center gap-3"> <div><img src="${i.image}" alt="" class="checkOutImg"></div> <div class="textSize">${i.phoneSelected}</div> </div> <div class="d-flex align-items-center"><span class="increment">+</span> <input type="number" class="productNumber" value="${i.productCount}" readonly> <span class="decrement">-</span> <div class="priceDiv">$<span class="checkoutPrice">${(i.productCount) * (i.phonePrice)}</span></div> <span class="remove" onclick="deleteCartProduct('${i.phoneSelected}')">X</span> </div> </div> </div>`
    }
    document.getElementById('cart_details').innerHTML = cards;
    cartCounter = cartArr.length;
    document.getElementById('total_cart').innerText = cartCounter;
    productPriceInvoice();
}


for (let i = 0; i < cartClick.length; i++) {
    cartClick[i].addEventListener('click', cart_operation);

}

const deleteCartProduct = (product) => {
    // console.log(product)
    indexOfDeleteProduct = (checkObjectInArray(product));
    cartArr.splice(indexOfDeleteProduct, 1);
    showcart();

}


// function deleteProduct(ev) {
//     const clickedElement = ev.target;
//     console.log(clickedElement);
// }

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

function productPriceInvoice() {
    let subtotal = 0;
    let tax = 0;
    let discount = 0;
    let total = 0;
    if (cartCounter === 0) {
        document.getElementById('price_invoice').style.display = 'none';
    }
    else {
        document.getElementById('price_invoice').style.display = 'block';
    }

    for (i of cartArr) {

        subtotal += ((i.phonePrice) * (i.productCount));
    }

    if (subtotal < 700) {
        tax = percentageConter(0, subtotal);
        discount = percentageConter(5, subtotal);
    }
    else if (subtotal < 1500) {
        tax = percentageConter(2, (subtotal - 700))
        discount = percentageConter(7, subtotal);

    }

    else if (subtotal < 2700) {
        tax = percentageConter(2, 800) + percentageConter(5, (subtotal - 1500));
        discount = percentageConter(10, subtotal);
    }

    else {
        tax = percentageConter(2, 800) + percentageConter(5, 2700) + percentageConter(8, (subtotal - 2700));
        discount = percentageConter(15, subtotal);
    }

    total = subtotal + tax - discount;

    document.getElementById('price_invoice').innerHTML = `<div class="p-5"> <h3 class="mb-5">Invoice</h3> <div class="d-flex justify-content-between mx-5"> <div>Subtotal:</div> <div>$<span>${subtotal}</span></div> </div> <div class="d-flex justify-content-between mx-5"> <div>Discount:</div> <div>$<span>${discount}</span></div> </div> <div class="d-flex justify-content-between mx-5"> <div>Tax:</div> <div>$<span>${tax}</span></div> </div> <div class="d-flex justify-content-between mx-5"> <div>Total:</div> <div>$<span>${total}</span></div> </div> <div style="text-align: end;" class="mx-5 mt-3"><button type="button" class="btn btn-primary btn-lg" id="checkout">Checkout</button> </div></div> `

}

function checkObjectInArray(phoneName) {
    return cartArr.findIndex(index => index.phoneSelected === phoneName);

}
function percentageConter(percentage, subtotal) {
    return (percentage * subtotal) / 100
}

