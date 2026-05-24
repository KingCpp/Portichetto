// 1. Array di date occupate (finto per ora, simuliamo prenotazioni esistenti)
// Il formato deve essere rigorosamente YYYY-MM-DD
const dateOccupate = [
    "2026-06-05", "2026-06-06", "2026-06-07", // Occupato a inizio Giugno
    "2026-06-15", "2026-06-16", 
    "2026-07-01", "2026-07-02"                // Occupato a inizio Luglio
];

// 2. Inizializzazione di Flatpickr
const calendario = flatpickr("#calendar-inline", {
    inline: true,             // Il calendario è sempre visibile, non a comparsa
    mode: "range",            // Permette di selezionare un range (Check-in -> Check-out)
    locale: "it",             // Lingua italiana
    minDate: "today",         // Non si possono selezionare date passate
    dateFormat: "Y-m-d",      // Formato data
    disable: dateOccupate,    // Disabilita i giorni già prenotati

    // Questa funzione scatta ogni volta che l'utente clicca sulle date
    onChange: function(selectedDates, dateStr, instance) {
        // Se l'utente ha selezionato sia Check-in che Check-out (quindi 2 date)
        if (selectedDates.length === 2) {
            const dataIn = instance.formatDate(selectedDates[0], "d/m/Y");
            const dataOut = instance.formatDate(selectedDates[1], "d/m/Y");
            
            // Inseriamo le date formattate nei campi di input del form di contatto
            document.getElementById("checkin").value = dataIn;
            document.getElementById("checkout").value = dataOut;
        } else {
            // Se la selezione è incompleta svuotiamo i campi
            document.getElementById("checkin").value = "";
            document.getElementById("checkout").value = "";
        }
    }
});