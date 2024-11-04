import { updateCartCounter } from "./header-update.js";

const apiURL = "http://localhost:8080/productos";

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
        img.src = `http://localhost:8080${producto.imagenUrl}`;
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
    const agregarCarritoBtn = document.getElementById("agregarCarrito"); // Obtén el botón de agregar al carrito

    // Asignar los valores del producto al modal
    modalImagen.src = `http://localhost:8080${producto.imagenUrl}`;
    modalImagen.alt = producto.nombre;
    modalNombre.textContent = producto.nombre;
    modalDescripcion.textContent = producto.descripcion;
    modalPrecio.textContent = `USD $${producto.precio}`;

    // Mostrar el modal
    modal.style.display = "flex";

    // Evento para cerrar el modal
    document.getElementById("cerrar-modal").addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Evento para agregar el producto al carrito
    agregarCarritoBtn.onclick = () => {
        agregarAlCarrito(producto); // Llama a la función para agregar al carrito
        modal.style.display = "none"; // Cierra el modal después de agregar
    };
};

const agregarAlCarrito = (producto) => {
    //validamos que el usario esté registrado
    const token = sessionStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Obtén el carrito actual del localStorage o crea uno nuevo
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verifica si el producto ya está en el carrito
    const productoExistente = carrito.find((item) => item.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad += 1; // Incrementa la cantidad
    } else {
        // Agrega el nuevo producto
        carrito.push({ ...producto, cantidad: 1 });
    }

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    // alert(`${producto.nombre} ha sido agregado al carrito!`);

    updateCartCounter();

    const totalCard = document.getElementById("total-card");
    if (totalCard) {
        totalCard.classList.remove("total-card");
    }
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
