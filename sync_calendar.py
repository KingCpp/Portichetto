import json
from datetime import datetime, timedelta
import requests
from icalendar import Calendar
import os

# URL inserito direttamente nel codice per il test sul tuo PC
ICAL_URL = os.environ.get("BOOKING_ICAL_URL", "https://ical.booking.com/v1/export?t=70b2bb59-235a-4cfa-ac90-97d703e89d63")

def download_ical(url):
    """Scarica il file iCal dall'URL fornito."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Errore durante il download dell'iCal: {e}")
        return None

def estrai_date_occupate(ical_data):
    """Parsa il file iCal ed espande i range di date in giorni singoli."""
    date_bloccate = set()
    gcal = Calendar.from_ical(ical_data)
    
    for component in gcal.walk():
        if component.name == "VEVENT":
            dtstart = component.get('dtstart').dt
            dtend = component.get('dtend').dt
            
            if isinstance(dtstart, datetime):
                dtstart = dtstart.date()
            if isinstance(dtend, datetime):
                dtend = dtend.date()
                
            giorno_corrente = dtstart
            while giorno_corrente < dtend:
                date_bloccate.add(giorno_corrente.strftime("%Y-%m-%d"))
                giorno_corrente += timedelta(days=1)
                
    return sorted(list(date_bloccate))

def main():
    print("Inizio sincronizzazione calendario in locale...")
    ical_data = download_ical(ICAL_URL)
    
    if ical_data:
        date_occupate = estrai_date_occupate(ical_data)
        
        # Salva il file dates.json nella stessa cartella
        with open("dates.json", "w", encoding="utf-8") as f:
            json.dump(date_occupate, f, indent=4)
            
        print(f"Sincronizzazione completata! Trovati {len(date_occupate)} giorni occupati.")
        print("Il file dates.json è stato generato con successo.")
    else:
        print("Sincronizzazione fallita.")

if __name__ == "__main__":
    main()