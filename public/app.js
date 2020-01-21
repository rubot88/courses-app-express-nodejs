const toCurrency = price => {
    return new Intl.NumberFormat('en-US', {
        currency: 'usd',
        style: 'currency'
    }).format(price);
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
});

const $cart = document.querySelector('#cart')

if ($cart) {
    cart.addEventListener('click', clickCartButtonHandler);
}
function clickCartButtonHandler(event) {
    const target = event.target;

    if (target.classList.contains('js-remove')) {
        const id = target.dataset.id;

        fetch('/cart/remove/' + id, {
            method: 'delete'
        })
            .then(res => res.json())
            .then(mapCart);
    } else if (target.classList.contains('js-add')) {
        const id = target.dataset.id;

        fetch(`/cart/increase/${id}`)
            .then(res => res.json())
            .then(mapCart);
    }
}

function mapCart(cart) {
    if (cart.courses.length) {
        const html = cart.courses.map(c => {
            return `
                <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                    <button class="btn btn-small js-add" data-id=${c.id}>&plus;</button class="btn btn-primary">
                    <button class="btn btn-small red darken-1 js-remove" data-id="${c.id}">&minus;</button>
                </td>
            </tr>
            `
        }).join('');
        $cart.querySelector('tbody').innerHTML = html;
        const price = $cart.querySelector('.price');
        price.textContent = toCurrency(cart.price);
    } else {
        $cart.innerHTML = '<p>Your Shopping Cart is empty</p>'
    }
}


const $courses = document.querySelector('.courses');
if ($courses) {
    $courses.addEventListener('click', coursesBuyHandler);
}

function coursesBuyHandler(event) {
    const { target } = event;
    if (target.classList.contains('buy')) {
        const id = target.dataset.id;
        fetch(`/cart/add/${id}`);
    }
}


