//Registro

const nombreInputRegistro = document.querySelector("#name");
const emailInputRegistro = document.querySelector("#email");
const passwordInputRegistro = document.querySelector("#password");
const btnRegistrarse = document.querySelector("#btn-registro");
const form = document.querySelector("form");

const mensaje = document.createElement("p");
form.appendChild(mensaje);


btnRegistrarse.addEventListener('click', async (event) => {
    event.preventDefault();

    const infoRegistro = {
        usuario: nombreInputRegistro.value.trim(),
        email: emailInputRegistro.value.trim(),
        password: passwordInputRegistro.value.trim()
    }

    if(!infoRegistro.usuario || !infoRegistro.email || !infoRegistro.password){
        mensaje.textContent = "Por favor, complete todos los campos";
        mensaje.classList.add("mensaje-error");
        return
    }

    try{
        const response = await fetch("https://ecommerce-bugbusters-production.up.railway.app/usuarios",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(infoRegistro) 
        });

        
        if (response.ok) {
            const data = await response.json();
            mensaje.textContent = data.message; 
            mensaje.classList.remove("mensaje-error");
            mensaje.classList.add("mensaje-ok");
        } else {
            const errorData = await response.json(); 
            mensaje.textContent = Object.values(errorData).join(', ');
            mensaje.classList.remove("mensaje-ok");
            mensaje.classList.add("mensaje-error");
        }
        
    }catch(error){
        console.error(error)
    }
})
