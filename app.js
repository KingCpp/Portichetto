// Funzione asincrona per caricare le date dal JSON e inizializzare il calendario
async function inizializzaCalendario() {
    try {
        // Carica il file JSON generato da Python
        const response = await fetch('dates.json');
        
        // Se il file non esiste ancora (es. primo avvio), usiamo un array vuoto
        const dateOccupate = response.ok ? await response.json() : [];

        // Inizializzazione di Flatpickr con le date reali
        flatpickr("#calendar-inline", {
            inline: true,
            mode: "range",
            locale: "it",
            minDate: "today",
            dateFormat: "Y-m-d",
            disable: dateOccupate, // <--- Qui passiamo le date lette dal file JSON

            onChange: function(selectedDates, dateStr, instance) {
                if (selectedDates.length === 2) {
                    const dataIn = instance.formatDate(selectedDates[0], "d/m/Y");
                    const dataOut = instance.formatDate(selectedDates[1], "d/m/Y");
                    document.getElementById("checkin").value = dataIn;
                    document.getElementById("checkout").value = dataOut;
                } else {
                    document.getElementById("checkin").value = "";
                    document.getElementById("checkout").value = "";
                }
            }
        });

    } catch (error) {
        print("Errore nel caricamento delle date del calendario:", error);
    }
}

// Avvia la funzione al caricamento della pagina
inizializzaCalendario();