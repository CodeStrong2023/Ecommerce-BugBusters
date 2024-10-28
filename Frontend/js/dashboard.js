const apiURL = 'http://localhost:8080/admin'; 

let productos = []

const obtenerProductos = async (url) => {
    try {
        const response = await fetch(url);
        productos = await response.json();

        renderProducts(productos)
        
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};

obtenerProductos(apiURL);


let editingProductId = null;

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').files[0];
    const category = document.getElementById('productCategory').value;

    if (editingProductId === null) {
        addProduct(name, description, price, image, category);
    } else {
        updateProduct(editingProductId, name, description, price, image, category);
    }

    this.reset();
    // renderProducts();
});

async function addProduct(name, description, price, image, category) {
    const formData = new FormData();
    formData.append("nombre", name);
    formData.append("descripcion", description);
    formData.append("precio", price);
    formData.append("imagen", image);
    formData.append("categoria.nombre", category);

    try{
        const response = await fetch(apiURL,{
            method: "POST",
            body: formData,
        });

        if(response.ok){
            const nuevoProducto = await response.json();
            productos.push(nuevoProducto)
            renderProducts(productos)
        }else{
            console.error("Error al añadir el producto:", response.statusText)
        }
    }catch(error){
        console.error("Error en la conexión:", error)
    }

    renderProducts(productos)
}

async function updateProduct(id, name, description, price, image, category) {
    const product = productos.find(p => p.id === id);
    product.nombre = name;
    product.descripcion = description;
    product.precio = price;
    product.categoria = category;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("nombre", name);
    formData.append("descripcion", description);
    formData.append("precio", price);
    formData.append("categoria.nombre", category);

    if (image){
        formData.append("imagen", image)
    }

    try{
        const response = await fetch(apiURL,{
            method: "PUT",
            body: formData,
        });

        if(response.ok){
            const productoActualizado = await response.json();
            const index = productos.findIndex(p => p.id === productoActualizado.id);
    
            if (index !== -1) {
                productos[index] = productoActualizado; 
            }

            renderProducts(productos)
        }else{
            console.error("Error al actualizar el producto:", response.statusText)
        }
    }catch(error){
        console.error("Error en la conexión:", error)
    }

    editingProductId = null;
}

function editProduct(id) {
    const inputId = document.getElementById("productId");
    inputId.removeAttribute("class");

    const product = productos.find(p => p.id === id);

    document.getElementById("productId").value = product.id;
    document.getElementById('productName').value = product.nombre;
    document.getElementById('productDescription').value = product.descripcion;
    document.getElementById('productPrice').value = product.precio;
    document.getElementById('productCategory').value = product.categoria.nombre;
    editingProductId = id;
}

async function deleteProduct(id) {
    try{
        const response = await fetch(`${apiURL}/${id}`, {
            method: "DELETE"
        }); 

        if(response.ok){
            productos = productos.filter(p => p.id !== id);
            renderProducts(productos);
        }else{
            console.error("Error al eliminar el producto:", response.statusText)
        }

    }catch(error){
        console.error("Error en la conexión:", error)
    }
}

function renderProducts(productos) {
    const tbody = document.getElementById('productTable').querySelector('tbody');
    tbody.innerHTML = '';

    productos.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src=http://localhost:8080${product.imagenUrl} width="50"></td>
            <td>${product.nombre}</td>
            <td>${product.descripcion}</td>
            <td>${product.precio.toFixed(2)}</td>
            <td>${product.categoria.nombre}</td>
            <td>
                <button onclick="editProduct(${product.id})" class="btn-actualizar">Actualizar</button>
                <button onclick="deleteProduct(${product.id})" class="btn-borrar">Borrar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

