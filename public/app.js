//format price view
const toCurrency = price => {
    return new Intl.NumberFormat('en-US', {
        currency: 'usd',
        style: 'currency'
    }).format(price);
}
document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
});

// increase decrease courses in cart
const $cart = document.querySelector('#cart')

if ($cart) {
    cart.addEventListener('click', clickCartButtonHandler);
}
async function clickCartButtonHandler(event) {
    const target = event.target;

    if (target.classList.contains('js-remove')) {
        const id = target.dataset.id;

        let cart = await fetch(`/cart/remove/${id}`, {
            method: 'delete'
        });
        cart = await cart.json();
        renderCart(cart);
    } else if (target.classList.contains('js-add')) {
        const id = target.dataset.id;

        let cart = await fetch(`/cart/add/${id}`);

        cart = await cart.json();
        renderCart(cart);
    }
}

function renderCart(cart) {

    if (cart.courses.length) {
        const html = cart.courses.map(c => {
            return `
        <tr>
            <td>${c.title}</td>
            <td>${c.count}</td>
            <td>
            <button class="btn btn-small js-add" data-id="${c.id}">&plus;</button class ="btn btn-primary">
            <button class="btn btn-small red darken-1 js-remove" data-id="${c.id}">&minus;</button>
            </td>
        </tr>
            `
        }).join('');
        $cart.querySelector('tbody').innerHTML = html;
        const price = $cart.querySelector('.price');
        price.textContent = toCurrency(cart.totalPrice);
    } else {
        $cart.innerHTML = '<p>Your Shopping Cart is empty</p>'
    }
}

// add course to cart
const $courses = document.querySelector('.courses');
if ($courses) {
    $courses.addEventListener('click', coursesAddHandler);
}

function coursesAddHandler(event) {
    const { target } = event;
    if (target.classList.contains('add-to-cart')) {
        const id = target.dataset.id;
        fetch(`/cart/add/${id}`);
    }
}


