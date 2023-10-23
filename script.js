if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', startOff)
} else {
    startOff();
}

function startOff() {
    //remove items from cart
    let cart = document.querySelector('.cart-items');
    cart.addEventListener('click', removeItem);
    
    //add items to cart
    let addButtons = document.querySelectorAll('.shop-item-button');
    for(let i = 0; i < addButtons.length; i++) {
        let addButton = addButtons[i];
        addButton.addEventListener('click', cartClicked);
    }
}

//function to add items to cart
function cartClicked(e) {
    let addButton = e.target;
    let title = document.querySelectorAll('.shop-item-title')[0].innerText;
    let imgSrc = addButton.parentElement.parentElement.querySelector('.shop-item-image').src;
    price = addButton.parentElement.querySelector('.shop-item-price').innerText;
    addtoCart(imgSrc, title, price);
   
}

function addtoCart(imgSrc, title, price) {
    let cartItemHead = document.querySelector('.cart-items');
    let titles = cartItemHead.querySelectorAll('.cart-item-title');
    let cartRow= document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `<div class="cart-item cart-column">
        <img class="cart-item-image" src= ${imgSrc} width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
     </div>
    `
    cartItemHead.append(cartRow);
    
    
     calculateCartTotal();


}



function removeItem(e){
 if(e.target.classList.contains('btn-danger')) {
    const item = e.target.parentElement.parentElement;
    item.remove();
 }
 calculateCartTotal();
}


function changeCartTotal() {
    let cart = document.querySelector('.cart-items');
    const observer = new MutationObserver(update);
    const config = { childList: true, subtree: true }; // Watch for changes in the cart and its descendants
    observer.observe(cart, config);
  }

function update(mutationsList) {
    // When the cart is updated, recalculate the cart total
    calculateCartTotal();
  }

function calculateCartTotal() {
    let cart = document.querySelector('.cart-items');
    let cartRows = cart.querySelectorAll('.cart-row');
    let total = 0;
    cartRows.forEach((cartRow) => {
        let priceElement = cartRow.querySelector('.cart-price');
        let quantityElement = cartRow.querySelector('.cart-quantity-input');
        let price = parseFloat(priceElement.textContent.replace('$', ''));
        let quantity = parseInt(quantityElement.value);
        if (!isNaN(price) && !isNaN(quantity)) { 
            total += price * quantity;
        }

        if(quantityElement.value < 0){
           window.alert('cannot go below zero');
           quantityElement.value = 0;
           total = 0;
        }

});
  
 
    let totalPriceElement = document.querySelector('.cart-total-price');
    totalPriceElement.textContent = `Total Price: $${total.toFixed(2)}`;
}
