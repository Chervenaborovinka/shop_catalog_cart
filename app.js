let openCart = document.querySelector('.cart');
let closeCart = document.querySelector('.closeCart');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

//открыть корзину
openCart.addEventListener('click', () => {
    body.classList.add('active');
})

//закрыть корзину
closeCart.addEventListener('click', () => {
    body.classList.remove('active');
})


let catalog =
    [
        {
            "id": 1,
            "item": "bracelet",
            "title": "LOVE BRACELET - BRUSHED FINISH",
            "metal": "yellow gold",
            "price": 7350,
            "currency": "$",
            "description": "LOVE bracelet, 18K yellow gold (750/1000), brushed finish. Comes with a screwdriver. Width: 6.1 mm.",
            "photo": "https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw3d4405cf/images/large/91b1733efa5e51ad812f271277503c3d.png?sw=350&sh=350&sm=fit&sfrm=png"
        },
        {
            "id": 2,
            "item": "ring",
            "title": "LOVE RING",
            "metal": "yellow gold",
            "price": 1940,
            "currency": "$",
            "description": "LOVE ring, yellow gold (750/1000). Width: 5.5 mm (for size 52).",
            "photo": "https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw38ed6594/images/large/41bb20649b985d5ea6fc0a93c60b78e4.png?sw=350&sh=350&sm=fit&sfrm=png"
        },
        {
            "id": 3,
            "item": "ring",
            "title": "LOVE RING",
            "metal": "platinum",
            "price": 4000,
            "currency": "$",
            "description": "LOVE ring, platinum 950/1000. Width: 5.5 mm (for size 52).",
            "photo": "https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw606230ea/images/large/17ebe21bb7a3595fb3130ae85f9c0376.png?sw=750&sh=750&sm=fit&sfrm=png"
        },
        {
            "id": 4,
            "item": "earrings",
            "title": "LOVE EARRINGS",
            "metal": "yellow gold",
            "price": 3650,
            "currency": "$",
            "description": "LOVE earrings, yellow gold 750/1000. Width: 5.7 mm.",
            "photo": "https://www.cartier.sg/content/dam/rcq/car/20/88/27/5/2088275.png.scale.600.high.love-earrings-yellow-gold.png"
        }
    ];

let itemsCart = [];

function initApp() {
    catalog.forEach((item, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src=${item.photo}>
            <div class="title">${item.title}</div>
            <div class="figure">${item.item}</div>
            <div class="text">${item.description}</div>
            <div class="price">${item.currency} ${item.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Купить</button>`;
        list.appendChild(newDiv);
    })
}
initApp();

function addToCart(key) {
    if (itemsCart[key] == null) {
        // копирую список из catalog в itemsCart
        itemsCart[key] = JSON.parse(JSON.stringify(catalog[key]));
        itemsCart[key].quantity = 1; //отображает кол-во возле иконки корзина по нажатию кнопки добавить в корзину
    }
    reloadCart();
}

function reloadCart() {
    listCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    itemsCart.forEach((item, key) => {
        totalPrice = totalPrice + item.price;
        count = count + item.quantity; //строчка отвечает за изменение числа возле корзины
        if (item != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${item.photo}"/></div>
                <div class="cart-item-title">${item.title}</div>
                <div>${item.currency} ${item.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${item.quantity - 1})">-</button>
                    <div class="count">${item.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${item.quantity + 1})">+</button>
                    <button id="btn-remove" onclick="changeQuantity(${key}, ${item.quantity === 0})"><i class='bx bx-trash-alt cart-remove'></i></button>
                </div>
                `;
            listCart.appendChild(newDiv);
        }
    })
    total.innerText = `$ ${totalPrice.toLocaleString()}`;
    quantity.innerText = count; //кол-во товаров в корзине, отображаемое в каунтере
}

//изменение кол-ва внутри корзины
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete itemsCart[key];
    } else {
        itemsCart[key].quantity = quantity;
        itemsCart[key].price = quantity * catalog[key].price;
    }
    reloadCart();
}



