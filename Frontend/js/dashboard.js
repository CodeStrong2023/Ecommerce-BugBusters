// Función para verificar si el usuario está autenticado
function checkAuthAndLoadDashboard() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        showError("No tienes permiso para acceder.");
        return;
    }

    //Valida que el usuario tenga el rol de ADMIN
    const decodedToken = parseJwt(token);
    const role = decodedToken.rol; 

    if (role !== 'ROLE_ADMIN') { 
        showError("No tienes permiso para acceder al dashboard. Solo administradores.");
        return;
    }

    loadDashboard();
}

function showError(message) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = message;
    errorContainer.style.display = 'block'; 
    errorContainer.style.textAlign = "center"
}

//Función para decodificar el token
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload); // Devuelve el payload del token como objeto
}


// Llama a la función cuando se carga el dashboard
checkAuthAndLoadDashboard();

function loadDashboard() {
    const dashboardContainer = document.getElementById('dashboardContainer');
    const errorContainer = document.getElementById('errorContainer');


    errorContainer.style.display = 'none';
    dashboardContainer.style.display = 'block'; // Mostrar el contenedor del dashboard
}

const apiURL = 'https://ecommerce-bugbusters-production.up.railway.app/admin';

const token = sessionStorage.getItem('token'); 

let productos = []

const obtenerProductos = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        productos = await response.json();

        renderProducts(productos)

    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};

obtenerProductos(apiURL);


let editingProductId = null;

document.getElementById('productForm').addEventListener('submit', function (event) {
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

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (response.ok) {
            const nuevoProducto = await response.json();
            productos.push(nuevoProducto)
            renderProducts(productos)
        } else {
            console.error("Error al añadir el producto:", response.statusText)
        }
    } catch (error) {
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

    if (image) {
        formData.append("imagen", image)
    }

    try {
        const response = await fetch(apiURL, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (response.ok) {
            const productoActualizado = await response.json();
            const index = productos.findIndex(p => p.id === id);

            if (index !== -1) {
                
                productos[index] = {
                    ...productos[index],
                    nombre: productoActualizado.nombre,
                    descripcion: productoActualizado.descripcion,
                    precio: productoActualizado.precio,
                    imagenUrl: productoActualizado.imagenUrl, 
                    categoria: productoActualizado.categoria 
                };
            }

            renderProducts(productos);
        } else {
            console.error("Error al actualizar el producto:", response.statusText);
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
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
        try {
            const response = await fetch(`${apiURL}/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (response.ok) {
                productos = productos.filter(p => p.id !== id);
                renderProducts(productos);
            } else {
                console.error("Error al eliminar el producto:", response.statusText)
            }

        } catch (error) {
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
            <td><img src=https://ecommerce-bugbusters-production.up.railway.app${product.imagenUrl} width="50"></td>
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

