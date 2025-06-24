let products = [];
let sortedProducts = [];
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        products = data;
        if (sessionStorage.getItem('productOrder')) {
            const savedOrder = JSON.parse(sessionStorage.getItem('productOrder'));
            sortedProducts = products.slice().sort((a, b) => savedOrder.indexOf(a.id) - savedOrder.indexOf(b.id));
        } else {
            sortedProducts = products.slice();
        }
        renderProductGrid();
    })
    .catch(error => console.error(error));

function renderProductGrid() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    sortedProducts.forEach((product, index) => {
        const productHTML = `
            <div class="product" data-id="${product.id}">
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>Price: $${product.price}</p>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productHTML);
    });
    $('#product-grid').sortable({
        update: function(event, ui) {
            const newOrder = [];
            $('.product').each(function() {
                newOrder.push($(this).data('id'));
            });
            sortedProducts = products.slice().sort((a, b) => newOrder.indexOf(a.id) - newOrder.indexOf(b.id));
            sessionStorage.setItem('productOrder', JSON.stringify(newOrder));
        }
    });
    $('.product').on('click', function() {
        const productId = $(this).data('id');
        const product = products.find(product => product.id === productId);
        showProductDetails(product);
    });
    const closepopup = document.getElementById("closepopup");

function handleClick() {
  history.go(0);
}

closepopup.addEventListener("click", handleClick);

    function showProductDetails(product) {
        const popup = document.getElementById('popup');
        popup.style.display = 'block';
    
        document.getElementById('popup-image').src = product.image;
        document.getElementById('popup-name').textContent = product.title;
        document.getElementById('popup-price').textContent = `Price: $${product.price}`;
        document.getElementById('popup-category').textContent = `Category: ${product.category}`;
        document.getElementById('popup-rating').textContent = `Rating: ${product.rating.rate} (${product.rating.count} reviews)`;
    
        document.getElementById}
}