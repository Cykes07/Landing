let ready = () => {
    console.log('DOM está listo')
    //debugger;
}
let loaded = () => {
    let myform = document.getElementById('form');
    //debugger;
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();

        var emailElement = document.querySelector('.form-control-lg');
        var emailText = emailElement.value;

        if (emailText.length === 0) {
            emailElement.focus();

            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            );
            return;
        }
        sendData();
    });
    console.log('Iframes e Images cargadas')

}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)

const databaseURL = 'https://landing-1ec68-default-rtdb.firebaseio.com/coleccion.json'; 

let sendData = ( ) => {  

    // Obtén los datos del formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })
    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json(); // Procesa la respuesta como JSON
    })
    .then(result => {
        alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
        form.reset()
    })
    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    }); 

}
