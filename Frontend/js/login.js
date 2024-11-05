
//Inciar Sesión

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const btnLogin = document.querySelector("#btn-login");
const form = document.querySelector("form");

const mensaje = document.createElement("p");
form.appendChild(mensaje);

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();

    const infoLogin = {
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
    }

    if(!infoLogin.email || !infoLogin.password){
        mensaje.textContent = "Por favor, complete todos los campos";
        mensaje.classList.add("mensaje-error");
        return
    }

    try{
        const response = await fetch("https://ecommerce-bugbusters-production.up.railway.app/iniciar-sesion",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(infoLogin) 
        });

        
        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('token', data.token); //guardamos el token en el session storage
            sessionStorage.setItem('usuario', data.usuario); //guardamos el usuario en el session storage
            window.location.href = "index.html"   
        } else {
            const errorData = await response.json();
            mensaje.textContent = errorData.error || Object.values(errorData).join(', ');
            mensaje.classList.remove("mensaje-ok");
            mensaje.classList.add("mensaje-error");
        }
        
    }catch(error){
        console.error(error)
    }
})
