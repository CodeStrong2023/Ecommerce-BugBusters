import { updateCartCounter } from "./header-update.js";

const apiURL = "https://ecommerce-bugbusters-production.up.railway.app/productos";

const productosContainer = document.getElementById("productos-container");

const ajustarAlturaFooter = () => {
    const productosContainer = document.getElementById('productos-container');
    const cantidadProductos = productosContainer.children.length;
    
    // Ajusta la altura mínima solo si hay pocos productos
    productosContainer.style.minHeight = cantidadProductos < 5 ? '20vh' : '50vh';
}

const crearProductos = (productos) => {
    productosContainer.innerHTML = "";

    productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        const img = document.createElement("img");
        img.src = `https://ecommerce-bugbusters-production.up.railway.app${producto.imagenUrl}`;
        img.alt = producto.nombre;

        const nombre = document.createElement("h2");
        nombre.textContent = producto.nombre;
        nombre.classList.add("producto-titulo");

        const precio = document.createElement("p");
        precio.textContent = `USD $${producto.precio}`;
        precio.classList.add("producto-precio");

        productoDiv.addEventListener("click", () => {
            abrirModal(producto);
        });

        productoDiv.appendChild(img);
        productoDiv.appendChild(nombre);
        productoDiv.appendChild(precio);

        productosContainer.appendChild(productoDiv);
    });
    ajustarAlturaFooter();
};

const obtenerProductos = async (url) => {
    try {
        const response = await fetch(url);
        const productos = await response.json();

        crearProductos(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
};

obtenerProductos(apiURL);

const obtenerProductosPorCategoria = async (categoria) => {
    const urlFiltro = `${apiURL}/${categoria}`;
    obtenerProductos(urlFiltro);
};

document.querySelectorAll(".categoria").forEach((a) => {
    a.addEventListener("click", () => {
        const categoria = a.getAttribute("data-categoria");

        obtenerProductosPorCategoria(categoria);
    });
});

const abrirModal = (producto) => {
    const modal = document.querySelector("#modal");
    const modalImagen = document.querySelector("#imagen");
    const modalNombre = document.querySelector("#nombre");
    const modalDescripcion = document.querySelector("#descripcion");
    const modalPrecio = document.querySelector("#precio");
    const agregarCarritoBtn = document.getElementById("agregarCarrito");

    
    modalImagen.src = `https://ecommerce-bugbusters-production.up.railway.app${producto.imagenUrl}`;
    modalImagen.alt = producto.nombre;
    modalNombre.textContent = producto.nombre;
    modalDescripcion.textContent = producto.descripcion;
    modalPrecio.textContent = `USD $${producto.precio}`;

    // Mostrar el modal
    modal.style.display = "flex";

    // Cerrar el modal
    document.getElementById("cerrar-modal").addEventListener("click", () => {
        modal.style.display = "none";
        cierreModal();  
    });

    // Función para agregar producto al carrito
    agregarCarritoBtn.onclick = () => {
        agregarAlCarrito(producto); // Llama a la función para agregar al carrito
        cierreModal();
    };
};

// Función para mostrar el alerta personalizado
function mostrarAlertaPersonalizada(mensaje) {
    const customAlert = document.getElementById("custom-alert");
    const customAlertMessage = document.getElementById("custom-alert-message");
    const customAlertClose = document.getElementById("custom-alert-close");

    customAlertMessage.textContent = mensaje;
    customAlert.style.display = "flex";

    // Cerrar el alerta al hacer clic en "Aceptar"
    customAlertClose.onclick = () => {
        customAlert.style.display = "none";
    };
}

// Modifica agregarAlCarrito para usar la alerta personalizada
const agregarAlCarrito = (producto) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    // Usa la alerta personalizada en lugar de alert()
    mostrarAlertaPersonalizada(`El producto ${producto.nombre} ha sido agregado al carrito.`);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    updateCartCounter();
    cierreModal();
};

//limpia el carrito luego de la compra
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pagoExitoso = urlParams.get("pagoExitoso");

    if (pagoExitoso === "true") {
        // Borrar el carrito del localStorage
        localStorage.removeItem("carrito");
    }
});

function cierreModal() {
    // Selecciona el modal y lo oculta
    const modal = document.getElementById('modal'); // Eliminamos el #
    if (modal) {
        modal.style.display = 'none'; // Oculta el modal
    }
}
