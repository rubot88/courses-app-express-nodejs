const price = Array.from(document.querySelectorAll('.price'));
price.forEach(node => {
    node.textContent = new Intl.NumberFormat('en-US', {
        currency: 'usd',
        style: 'currency'
    }).format(node.textContent);
});
