# 🐕 Hundesitting Plattform

Eine interne Hundesitting-Plattform für Unternehmen, die es Mitarbeitern ermöglicht, sich gegenseitig bei der Hundebetreuung zu unterstützen.

## Funktionen

### Für Hundebesitzer
- Profil erstellen mit Postleitzahl und Kontaktinformationen
- Hundeprofile anlegen (Rasse, Größe, Alter, Charaktereigenschaften)
- Fotos von Hunden hochladen
- Nach verfügbaren Hundesittern in der Nähe suchen
- Bewertungen abgeben und erhalten

### Für Hundesitter
- Verfügbare Tage angeben (ideal für Home-Office-Tage)
- Platzverfügbarkeit angeben (klein/mittel/groß)
- Erfahrungslevel angeben
- Nach Hunden zum Sitten suchen
- Bewertungen sammeln

### Suche & Filter
- Suche nach Postleitzahl mit Entfernungsfilter
- Filter nach Hundegröße
- Filter nach verfügbaren Tagen
- Filter nach Erfahrungslevel

## Technologie-Stack

### Backend
- Node.js + Express
- MongoDB mit Mongoose
- JWT Authentifizierung
- Multer für Foto-Uploads
- bcryptjs für Passwort-Hashing

### Frontend
- React mit Vite
- React Router für Navigation
- Axios für API-Calls
- Context API für State Management

## Installation

### Voraussetzungen
- Node.js (v16 oder höher)
- MongoDB (lokal oder MongoDB Atlas)
- npm oder yarn

### Backend Setup

1. Navigieren Sie zum Backend-Ordner:
```bash
cd backend
```

2. Installieren Sie die Abhängigkeiten:
```bash
npm install
```

3. Konfigurieren Sie die Umgebungsvariablen:
Die `.env` Datei ist bereits erstellt. Passen Sie die Werte bei Bedarf an:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dogsitting
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

4. Starten Sie MongoDB (falls lokal):
```bash
mongod
```

5. Starten Sie den Backend-Server:
```bash
npm run dev
```

Der Server läuft nun auf `http://localhost:5000`

### Frontend Setup

1. Öffnen Sie ein neues Terminal und navigieren Sie zum Frontend-Ordner:
```bash
cd frontend
```

2. Installieren Sie die Abhängigkeiten:
```bash
npm install
```

3. Starten Sie den Development-Server:
```bash
npm run dev
```

Die Anwendung läuft nun auf `http://localhost:5173`

## Verwendung

### Erste Schritte

1. **Registrierung**: Besuchen Sie `http://localhost:5173/register`
   - Geben Sie Ihren Namen, E-Mail, Postleitzahl ein
   - Wählen Sie Ihre Rolle (Hundebesitzer/Hundesitter/Beides)

2. **Profil vervollständigen**: Nach der Registrierung
   - Laden Sie ein Profilbild hoch
   - Geben Sie Ihre Telefonnummer an
   - Für Hundesitter: Verfügbare Tage, Erfahrung und Platzverfügbarkeit angeben

3. **Hunde hinzufügen** (für Hundebesitzer):
   - Navigieren Sie zu "Meine Hunde"
   - Fügen Sie Hundeprofile mit Details hinzu
   - Laden Sie Fotos Ihrer Hunde hoch

4. **Suchen**:
   - Verwenden Sie die Suchfunktion auf der Startseite
   - Filtern Sie nach Postleitzahl, Entfernung, verfügbaren Tagen
   - Kontaktieren Sie passende Hundesitter über die angezeigten Kontaktdaten

5. **Bewertungen**:
   - Nach erfolgreicher Hundebetreuung können Bewertungen abgegeben werden
   - Bewertungen erscheinen im Profil und helfen beim Vertrauensaufbau

## API-Endpunkte

### Authentifizierung
- `POST /api/auth/register` - Registrierung
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Aktuellen Benutzer abrufen

### Benutzer
- `GET /api/users/:id` - Benutzerprofil abrufen
- `PUT /api/users/profile` - Profil aktualisieren
- `POST /api/users/profile/photo` - Profilbild hochladen

### Hunde
- `POST /api/dogs` - Hund erstellen
- `GET /api/dogs/my` - Eigene Hunde abrufen
- `GET /api/dogs/:id` - Hund abrufen
- `PUT /api/dogs/:id` - Hund aktualisieren
- `DELETE /api/dogs/:id` - Hund löschen
- `POST /api/dogs/:id/photo` - Hundefoto hochladen

### Suche
- `GET /api/search/sitters` - Hundesitter suchen
- `GET /api/search/owners` - Hundebesitzer suchen
- `GET /api/search/dogs` - Hunde suchen

### Bewertungen
- `POST /api/reviews` - Bewertung erstellen
- `GET /api/reviews/user/:userId` - Bewertungen eines Benutzers
- `GET /api/reviews/my` - Eigene Bewertungen
- `PUT /api/reviews/:id` - Bewertung aktualisieren
- `DELETE /api/reviews/:id` - Bewertung löschen

## Projektstruktur

```
DogSitting/
├── backend/
│   ├── config/         # Datenbank-Konfiguration
│   ├── controllers/    # Business-Logik
│   ├── middleware/     # Authentifizierungs-Middleware
│   ├── models/         # Mongoose-Schemas
│   ├── routes/         # API-Routes
│   ├── uploads/        # Hochgeladene Dateien
│   ├── .env            # Umgebungsvariablen
│   ├── server.js       # Haupt-Server-Datei
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/  # React-Komponenten
    │   ├── context/     # Context API (Auth)
    │   ├── pages/       # Seiten-Komponenten
    │   ├── utils/       # API-Utilities
    │   ├── App.jsx      # Haupt-App mit Routing
    │   └── main.jsx     # Entry-Point
    └── package.json
```

## Features für zukünftige Versionen

- [ ] In-App-Messaging zwischen Benutzern
- [ ] Kalender-Integration für Verfügbarkeiten
- [ ] Push-Benachrichtigungen
- [ ] Mobile App (iOS/Android)
- [ ] Erweiterte Entfernungsberechnung mit echter Geocoding-API
- [ ] Favoriten-Liste für häufig genutzte Sitter
- [ ] Notfall-Kontakte
- [ ] Versicherungsinformationen

## Sicherheit

- Passwörter werden mit bcryptjs gehasht
- JWT-basierte Authentifizierung
- Geschützte API-Routes
- Input-Validierung mit express-validator
- File-Upload-Beschränkungen (Typ, Größe)

## Lizenz

Dieses Projekt ist für den internen Gebrauch bestimmt.

## Support

Bei Fragen oder Problemen wenden Sie sich bitte an das Entwicklerteam.
