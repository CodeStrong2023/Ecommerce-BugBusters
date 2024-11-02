document.addEventListener('DOMContentLoaded', () => {
    const carritoJSON = localStorage.getItem('carrito');

    if (carritoJSON) {
        const carrito = JSON.parse(carritoJSON);
        const contenedorCarrito = document.getElementById('contenedor-carrito');

        if (!contenedorCarrito) {
            console.error('Contenedor para productos no encontrado');
            return;
        }

        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.className = 'producto-agregado bg-custom-very-light-brown pt-20 mb-10';
            const precioTotal = (producto.precio * producto.cantidad).toFixed(2);

            productoDiv.innerHTML = `
                <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div class="rounded-lg md:w-2/3">
                        <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" data-product-id="${producto.id}" id="producto">
                            <img src="http://localhost:8080${producto.imagenUrl}" alt="product-image" class="w-full rounded-lg sm:w-40" />
                            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div class="mt-5 sm:mt-0">
                                    <h2 class="text-lg font-bold text-gray-900">${producto.nombre}</h2>
                                    <p class="mt-1 text-xs text-gray-700">$${producto.precio}</p>
                                </div>
                                <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                    <div class="flex items-center border-gray-100">
                                        <span class="decrement cursor-pointer rounded-l bg-gray-700 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" data-product-id="${producto.id}">-</span>
                                        <input id="quantity-${producto.id}" class="h-8 w-8 border text-black bg-white text-center text-xs outline-none" type="number" value="${producto.cantidad}" min="1" readonly />
                                        <span class="increment cursor-pointer rounded-r bg-gray-700 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" data-product-id="${producto.id}">+</span>
                                    </div>
                                    <div class="flex items-center space-x-4">
                                        <p class="text-sm text-black precio-total" id="total-id-${producto.id}" data-product-id="${producto.id}">Precio total: $${precioTotal}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 rounded-full bg-black hover:text-red-500 remove-product">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            contenedorCarrito.appendChild(productoDiv);
        });

        updateTotal(); // Calcular el total general inicial
        updateCartCounter();
        setupEventListeners(); // Configurar los oyentes de eventos
    } else {
        console.log('No hay productos en el carrito');
    }

    document.getElementById("btn-mp").addEventListener("click", iniciarPago);
});

//Función para actualizar el contador de productos del carrito
function updateCartCounter() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let totalItems = 0;

    carrito.forEach(producto => {
        totalItems += producto.cantidad; 
    });

    const cartCounter = document.getElementById('cart-counter');
    cartCounter.textContent = totalItems;
    cartCounter.style.display = totalItems > 0 ? 'block' : 'none';
}

// Función para actualizar el precio total al incrementar o decrementar
function updateTotal() {
    const totalElement = document.getElementById('total'); // Asegúrate de tener un elemento con este ID
    if (!totalElement) {
        console.error('Elemento total no encontrado');
        return;
    }

    const preciosTotales = document.querySelectorAll('.precio-total');
    let total = 0;

    preciosTotales.forEach(precioTotal => {
        const currentTotalPrice = parseFloat(precioTotal.textContent.replace(/[^0-9.-]+/g, "").match(/[\d.,]+/)[0]);
        total += currentTotalPrice; // Sumar el precio de cada producto
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`; // Actualizar el precio total en la interfaz
}

function eliminarProducto(productoid) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoActualizado = carrito.filter(item => item.id !== Number(productoid));
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    updateCartCounter();
}

// Función para configurar oyentes de eventos para incrementar y decrementar
function setupEventListeners() {
    const incrementButtons = document.querySelectorAll('.increment');
    const decrementButtons = document.querySelectorAll('.decrement');

    incrementButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const quantityInput = document.getElementById(`quantity-${productId}`);
            let currentQuantity = parseInt(quantityInput.value);
            quantityInput.value = currentQuantity + 1;

            // Actualizar el precio total del producto
            const precioTotalElement = document.getElementById(`total-id-${productId}`);
            const productPrice = parseFloat(precioTotalElement.textContent.match(/[\d.,]+/)[0]) / currentQuantity; // Obtener el precio unitario
            const newTotalPrice = (productPrice * (currentQuantity + 1)).toFixed(2); // Calcular el nuevo precio total
            precioTotalElement.textContent = `Precio total: $${newTotalPrice}`;

            actualizarCarritoEnLocalStorage(productId, currentQuantity + 1);

            // Actualizar el total general
            updateTotal();
            updateCartCounter();
        });
    });

    decrementButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const quantityInput = document.getElementById(`quantity-${productId}`);
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) {
                quantityInput.value = currentQuantity - 1;

                // Actualizar el precio total del producto
                const precioTotalElement = document.getElementById(`total-id-${productId}`);
                const productPrice = parseFloat(precioTotalElement.textContent.match(/[\d.,]+/)[0]) / currentQuantity; // Obtener el precio unitario
                const newTotalPrice = (productPrice * (currentQuantity - 1)).toFixed(2); // Calcular el nuevo precio total
                precioTotalElement.textContent = `Precio total: $${newTotalPrice}`;

                actualizarCarritoEnLocalStorage(productId, currentQuantity - 1);

                // Actualizar el total general
                updateTotal();
                updateCartCounter();
            }
        });
    });

    const removeButtons = document.querySelectorAll('.remove-product');

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productDiv = this.closest('.producto-agregado');
            const producto = productDiv.querySelector("#producto")
            const productoId = producto.getAttribute('data-product-id');
            if (productDiv) {
                eliminarProducto(productoId)
                productDiv.remove();
                updateTotal(); // Actualizar el total general al eliminar un producto
                updateCartCounter();
            }
        });
    });

}
 //Actualiza el carrito en el local storage
 function actualizarCarritoEnLocalStorage(productId, nuevaCantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(item => item.id === Number(productId));
    if (producto) {
        producto.cantidad = nuevaCantidad; 
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}


async function iniciarPago() {
    const carritoJSON = localStorage.getItem('carrito');
    const carrito = JSON.parse(carritoJSON);

    const productosConCantidad = carrito.map(producto => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad 
    }));

    try {
        const response = await fetch('http://localhost:8080/create_preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productosConCantidad)
        });

        const urlDePago = await response.text();
        console.log(urlDePago);
        window.location.href = urlDePago;
    } catch (error) {
        console.error('Error al iniciar el pago:', error);
    }
}