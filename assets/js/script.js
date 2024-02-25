let cartArr = [{}];
let cartCounter = 0;
let cartClick = document.getElementsByClassName('cart_added');

for (let i = 0; i < cartClick.length; i++) {
    cartClick[i].addEventListener('click', cart_operation); // Removed '()' from cart_operation
}

function cart_operation(event) {
    console.log(event.target.innerText);
    const card = event.target.parentElement.parentElement.parentElement;
    const price = card.querySelector('.price').innerText;
    const phoneName = card.querySelector('.brand_name').innerText;
    let createdObject = {
        phoneSelected: phoneName,
        phonePrice: price,
        productCount: 1,
    }

    //bellow I use if  if else condition to check are the object present in the array or not
    let index = checkObjectInArray(phoneName);
    if (index === -1) {
        cartArr.push(createdObject);
        console.log("If Executed with", index)
    }
    else {
        cartArr[index].productCount++;
        console.log("else Executed with", index)
    }

    //Here I Update the value of  cart product
    cartCounter = cartArr.length - 1;
    document.getElementById('total_cart').innerText = cartCounter;
}

function checkObjectInArray(phoneName) {
    return cartArr.findIndex(index => index.phoneSelected === phoneName);

}