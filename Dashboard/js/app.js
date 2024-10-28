let products = [];
let editingProductId = null;

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').files[0];

    if (editingProductId === null) {
        addProduct(name, description, price, image);
    } else {
        updateProduct(editingProductId, name, description, price, image);
    }

    this.reset();
    renderProducts();
});

function addProduct(name, description, price, image) {
    const newProduct = { id: Date.now(), name, description, price, image };
    products.push(newProduct);
}

function updateProduct(id, name, description, price, image) {
    const product = products.find(p => p.id === id);
    product.name = name;
    product.description = description;
    product.price = price;
    if (image) product.image = image;
    editingProductId = null;
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
}

function renderProducts() {
    const tbody = document.getElementById('productTable').querySelector('tbody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${URL.createObjectURL(product.image)}" width="50"></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>
                <button onclick="editProduct(${product.id})">Actualizar</button>
                <button onclick="deleteProduct(${product.id})">Borrar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.price;
    editingProductId = id;
}
