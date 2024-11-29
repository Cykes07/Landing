const databaseURL = 'https://landing-1ec68-default-rtdb.firebaseio.com/coleccion.json'; 

let sendData = () => {  
    // Obtén los datos del formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto

    // Obtén los juegos seleccionados
    const games = [];
    formData.forEach((value, key) => {
        if (key === 'games') {
            games.push(value); // Agrega cada juego marcado al array
        }
    });

    // Agrega los juegos al objeto `data`
    data['games'] = games;
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' }); // Fecha de guardado

    // Enviar datos al servidor
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
        alert('Agradeciendo tu preferencia, gracias por tu comentarios'); // Mensaje de confirmación
        form.reset(); // Resetea el formulario
    })
    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    }); 
};


let getData = async () => {  
    try {
        const response = await fetch(databaseURL, { method: 'GET' });

        if (!response.ok) {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); 
            return;
        }

        const data = await response.json();

        if (data != null) {
            let gameCounts = new Map();

            if (Object.keys(data).length > 0) {
                for (let key in data) {
                    const { games } = data[key];
                    if (Array.isArray(games)) {
                        games.forEach(game => {
                            let count = gameCounts.get(game) || 0;
                            gameCounts.set(game, count + 1);
                        });
                    }
                }
            }

            // Mostrar el top 5 de juegos más jugados
            if (gameCounts.size > 0) {
                const sortedGames = [...gameCounts.entries()]
                    .sort(([, countA], [, countB]) => countB - countA) // Orden descendente
                    .slice(0, 5); // Top 5 juegos

                topGames.innerHTML = ''; // Limpia la tabla

                sortedGames.forEach(([game, count], index) => {
                    let rowTemplate = `
                    <tr>
                        <th>${index + 1}</th>
                        <td>${game}</td>
                        <td>${count}</td>
                    </tr>`;
                    topGames.innerHTML += rowTemplate;
                });
            }
        }
    } catch (error) {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); 
    }
};


let ready = () => {
    console.log('DOM está listo')
    getData()
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
