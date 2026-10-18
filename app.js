// Funzione asincrona per caricare le date dal JSON e inizializzare il calendario
async function inizializzaCalendario() {
    try {
        // Carica il file JSON generato da Python
        // NUOVA RIGA:
        const response = await fetch('https://raw.githubusercontent.com/KingCpp/Portichetto/main/dates.json?v=' + Date.now(), 
                                     {cache: 'no-store'});
        
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

// ==========================================================================
// GESTIONE INGRANDIMENTO FOTO GALLERIA (VERSIONE SICURA)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');

    // Controlliamo che gli elementi esistano davvero nella pagina
    if (galleryItems.length > 0 && modal && modalImg && closeModal) {
        
        // Quando clicchi su una foto
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgInside = item.querySelector('img');
                modal.style.display = 'flex'; // Mostra il pop-up centrato
                modalImg.src = imgInside.src; // Copia la foto dentro il pop-up
                modalImg.alt = imgInside.alt;
            });
        });

        // Chiudi il pop-up quando clicchi sulla "X"
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Chiudi anche se clicchi sullo sfondo scuro
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
