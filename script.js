let cart = [];


/* ----------------------------------
   ADD PRODUCT TO CART
----------------------------------- */

function addToCart(productName, price) {

    const existingProduct =
        cart.find(item =>
            item.name === productName
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });

    }


    updateCart();

    showCart();
}


/* ----------------------------------
   REMOVE PRODUCT
----------------------------------- */

function removeFromCart(productName) {

    cart =
        cart.filter(item =>
            item.name !== productName
        );


    updateCart();

}


/* ----------------------------------
   UPDATE CART
----------------------------------- */

function updateCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );

    const cartCount =
        document.getElementById(
            "cart-count"
        );

    const cartTotal =
        document.getElementById(
            "cart-total"
        );


    cartItems.innerHTML = "";


    let totalItems = 0;
    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p id="empty-cart-message">
                Your cart is empty.
            </p>`;

    }


    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price *
            item.quantity;


        const cartItem =
            document.createElement(
                "div"
            );


        cartItem.classList.add(
            "cart-item"
        );


        cartItem.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    ${currencySymbols[selectedCurrency]}
                    ${(item.price * currencyRates[selectedCurrency]).toFixed(2)}
                    ×
                    ${item.quantity}
                </p>

            </div>

            <button
                class="remove-button"
                onclick="
                    removeFromCart(
                        '${item.name}'
                    )
                "
            >
                Remove
            </button>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    cartCount.textContent =
        totalItems;


    cartTotal.textContent =
    currencySymbols[selectedCurrency] +
    (totalPrice * currencyRates[selectedCurrency]).toFixed(2);

}


/* ----------------------------------
   SHOW / HIDE CART
----------------------------------- */

function toggleCart() {

    const cart =
        document.getElementById(
            "cart-panel"
        );


    cart.classList.toggle(
        "open"
    );

}


function showCart() {

    const cart =
        document.getElementById(
            "cart-panel"
        );


    cart.classList.add(
        "open"
    );

}


/* ----------------------------------
   DEMO CHECKOUT
----------------------------------- */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    alert(
        "Thank you for shopping with Early Bird Coffee! This checkout is only a class project demonstration."
    );

}


/* ----------------------------------
   NEWSLETTER FORM
----------------------------------- */

const newsletterForm =
    document.getElementById(
        "newsletter-form"
    );


newsletterForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "email"
            ).value;


        const message =
            document.getElementById(
                "newsletter-message"
            );


        message.textContent =
            `Thanks! ${email} has been added to the Early Bird Coffee list.`;


        newsletterForm.reset();

    }
);

/* ----------------------------------
   CURRENCY SELECTOR
----------------------------------- */

let selectedCurrency = "USD";

const currencyRates = {
    USD: 1,
    MXN: 18.50,
    EUR: 0.86
};

const currencySymbols = {
    USD: "$",
    MXN: "MX$",
    EUR: "€"
};


function changeCurrency(currency) {

    selectedCurrency = currency;

    const prices =
        document.querySelectorAll(".product-price");

    prices.forEach(price => {

        const usdPrice =
            Number(price.dataset.usd);

        const convertedPrice =
            usdPrice * currencyRates[currency];

        price.textContent =
            currencySymbols[currency] +
            convertedPrice.toFixed(2);

    });

    updateCart();
}

/* ----------------------------------
   LANGUAGE SELECTOR
----------------------------------- */

function changeLanguage(language) {

    const translatedElements =
        document.querySelectorAll("[data-en][data-es]");

    translatedElements.forEach(element => {

        if (language === "es") {

            element.textContent =
                element.dataset.es;

        } else {

            element.textContent =
                element.dataset.en;

        }

    });

}