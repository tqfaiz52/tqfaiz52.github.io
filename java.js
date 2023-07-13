let getProducts = async () => {
    let products = await fetch("https://dummyjson.com/products/");
    let response = await products.json();
    localStorage.setItem("products", JSON.stringify(response.products))
    productsRendering(response.products);
}
// category/furniture/
let productsRendering = (data) => {
    let ShopContent = document.getElementById("shopContent");
    data.forEach(prod => {
        let product = document.createElement("div");

        product.innerHTML = `
        <div class="product-box">
        <a href="./details.html?pid=${prod.id}"><img src="${prod.thumbnail}" alt="" class="product-img"></a>
        <h2 class="product-title">${prod.title}</h2>
        <span class="price">${prod.price}$</span>
        <div class="stars text-dark">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
        </div>
        <p>${prod.rating}</p>
        <button class="btn btn-dark add-cart" onclick="addToCart(${prod.id})">Add to cart <i class="bi bi-cart-plus"></i></button>

    </div>`;
        ShopContent.appendChild(product);

    });
}
getProducts();
let cart = [];
let addToCart = (id) => {
    event.preventDefault();
    let product = JSON.parse(localStorage.getItem("products"));
    product.quantity = 1;
    cart.push(product[id-1]);
    console.log(product[id-1]);
    alert("Product Added " + id);
    renderCartItems();
    let subtotal = calculateSubtotal();
  document.querySelector(".total-price").textContent = `${subtotal}$`;
};
let renderCartItems = () => {
    document.getElementById("cartItems").innerHTML = "";
    let cartItems = document.getElementById("cartItems");
    cart.forEach((product, index) => {
        cartItems.innerHTML +=`
            <div class="cart-box">
                <img src="${product.thumbnail}" class="cart-img" alt="">
                <div class="details-box">
                    <h5 class="cart-product-title">${product.title}</h5>
                    <p class="cart-price">${product.price}$</p>
                    <input type="number" value="${product.quantity}" class="cart-quantity" required onchange="updateQuantity(${index}, this.value)">
                
                </div>
                <i class="bi bi-x cart-remove" onclick="removeFromCart(${index})"></i>
             </div>  `;
    });
    console.log(cart);
    let subtotal = calculateSubtotal();
  document.querySelector(".total-price").textContent = `${subtotal}$`;
}
let removeFromCart=(index)=>{
    cart.splice(index, 1);
    renderCartItems();
}

let calculateSubtotal = () => {
    let subtotal = cart.reduce((total, product) => total + product.price, 0);
    return subtotal.toFixed(2);
};

  let updateQuantity = (index, quantity) => {
    cart[index].quantity = parseInt(quantity);
    renderCartItems();
    let subtotal = calculateSubtotal();
    document.querySelector(".total-price").textContent = `${subtotal}$`;
};

































function scrollWin(x, y) {
    window.scrollBy(x, y);
  }