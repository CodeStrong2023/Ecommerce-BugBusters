document.addEventListener("DOMContentLoaded", () => {
    const usuario = sessionStorage.getItem('usuario');
    const token = sessionStorage.getItem('token');

    const header = document.querySelector('header');
    const nav = header.querySelector('nav'); 
    const loginLinks = header.querySelectorAll('ul:nth-child(2) li'); 

    if (token) {
        nav.innerHTML = ''; //limpia todo el nav para poder crearlo devuelta

        // Crea los elementos de navegación
        const logoDiv = document.createElement('div');
        logoDiv.className = 'text-3xl font-bold flex items-center';
        logoDiv.innerHTML = `
            <img src="assets/logo solo.png" alt="Logo Clave de Sol" class="mr-2 object-contain" style="width: 90px; height: 90px;">
            <h3><a href="index.html">Clave de Sol</a></h3>`;
        
        const navLinks = document.createElement('ul');
        navLinks.className = 'flex space-x-4';
        navLinks.innerHTML = `
            <li style="color: white;"><a href="index.html" class="hover:text-custom-orange">Inicio</a></li>
            <li style="color: white;"><a href="sobre-nosotros.html" class="hover:text-custom-orange">Sobre Nosotros</a></li>
            <li style="color: white;"><a href="productos.html" class="hover:text-custom-orange">Productos</a></li>
            <li style="color: white;"><a href="contacto.html" class="hover:text-custom-orange">Contacto</a></li>`;

        // Crear el contenedor del dropdown
        const seccionUsuario = document.createElement('div');
        seccionUsuario.className = "user-cart-container";

        // Crear el botón que muestra el nombre de usuario
        const usuarioButton = document.createElement('button');
        usuarioButton.className = 'flex items-center space-x-2 font-bold text-white';
        usuarioButton.innerHTML = `
            <div class="usuario-container">
                <span class="usuario">${usuario}</span>
                <img src="./assets/flecha-abajo.png" alt="Flecha abajo" id="flecha">
            </div`;
        usuarioButton.addEventListener('click', () => {
            dropdownContent.classList.toggle('hidden'); 
        });

        // Crear el contenido del dropdown
        const dropdownContent = document.createElement('ul');
        dropdownContent.className = "cerrar-sesion hidden";
        dropdownContent.innerHTML = `
            <li class="logout">
                <a href="./index.html" onclick="logout()">Cerrar Sesión</a>
            </li>`;

        const carrito = document.createElement("a");
        carrito.innerHTML = `
                <a href="carrito.html">
                    <img src="./assets/carrito-icono.png" alt="carrito de compras" id="carrito">
                </a>
                <span class="cart-counter" id="cart-counter">0</span>
        `;    

        // Añade todos los elementos a la navegación
        seccionUsuario.appendChild(usuarioButton);
        seccionUsuario.appendChild(dropdownContent);
        seccionUsuario.appendChild(carrito);

        nav.appendChild(logoDiv);
        nav.appendChild(navLinks);
        nav.appendChild(seccionUsuario);

        updateCartCounter();

    }
});

//Función para actualizar el contador de productos
export function updateCartCounter() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let totalItems = 0;

    carrito.forEach(producto => {
        totalItems += producto.cantidad; 
    });

    const cartCounter = document.getElementById('cart-counter');
    cartCounter.textContent = totalItems;
    cartCounter.style.display = totalItems > 0 ? 'block' : 'none';

    const totalCard = document.getElementById('total-card');
    totalCard.style.display = totalItems > 0 ? "block" : "none";
}

// Función para cerrar sesión
window.logout = function() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    localStorage.removeItem("token");
    localStorage.removeItem("carrito");
    window.location.href = "index.html"; 
}