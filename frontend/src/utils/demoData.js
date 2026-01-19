// Demo data to showcase the app
export const initializeDemoData = () => {
  // Check if demo data already exists
  if (localStorage.getItem('demo_initialized')) {
    return;
  }

  const demoUsers = [
    {
      _id: 'demo_user_1',
      name: 'Anna Schmidt',
      email: 'anna@example.com',
      password: 'demo123',
      telefon: '+49 170 1234567',
      postleitzahl: '10115',
      rolle: 'beides',
      profilbild: '',
      verfuegbareTage: ['Montag', 'Mittwoch', 'Freitag'],
      platzverfuegbarkeit: 'mittel',
      nurKleineHunde: false,
      erfahrung: 'viel',
      beschreibung: 'Ich arbeite im Home-Office und habe viel Erfahrung mit Hunden. Ich freue mich darauf, neue vierbeinige Freunde kennenzulernen!',
      durchschnittsBewertung: 4.8,
      anzahlBewertungen: 5,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      _id: 'demo_user_2',
      name: 'Max Müller',
      email: 'max@example.com',
      password: 'demo123',
      telefon: '+49 171 9876543',
      postleitzahl: '10178',
      rolle: 'hundesitter',
      profilbild: '',
      verfuegbareTage: ['Dienstag', 'Donnerstag', 'Samstag', 'Sonntag'],
      platzverfuegbarkeit: 'gross',
      nurKleineHunde: false,
      erfahrung: 'profi',
      beschreibung: 'Professioneller Hundesitter mit 10 Jahren Erfahrung. Ich habe einen großen Garten und viel Zeit für Ihre Lieblinge.',
      durchschnittsBewertung: 5.0,
      anzahlBewertungen: 12,
      createdAt: '2024-01-10T09:00:00Z'
    },
    {
      _id: 'demo_user_3',
      name: 'Sarah Weber',
      email: 'sarah@example.com',
      password: 'demo123',
      telefon: '+49 172 5554433',
      postleitzahl: '10247',
      rolle: 'hundebesitzer',
      profilbild: '',
      verfuegbareTage: [],
      platzverfuegbarkeit: 'mittel',
      nurKleineHunde: false,
      erfahrung: 'keine',
      beschreibung: 'Stolze Hundebesitzerin, die gelegentlich Unterstützung bei der Betreuung benötigt.',
      durchschnittsBewertung: 0,
      anzahlBewertungen: 0,
      createdAt: '2024-01-20T14:30:00Z'
    },
    {
      _id: 'demo_user_4',
      name: 'Tom Klein',
      email: 'tom@example.com',
      password: 'demo123',
      telefon: '+49 173 2223344',
      postleitzahl: '10405',
      rolle: 'hundesitter',
      profilbild: '',
      verfuegbareTage: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
      platzverfuegbarkeit: 'klein',
      nurKleineHunde: true,
      erfahrung: 'mittel',
      beschreibung: 'Ich habe eine kleine Wohnung, daher kann ich nur kleine Hunde betreuen. Bin sehr liebevoll und zuverlässig!',
      durchschnittsBewertung: 4.5,
      anzahlBewertungen: 8,
      createdAt: '2024-01-12T11:00:00Z'
    }
  ];

  const demoDogs = [
    {
      _id: 'demo_dog_1',
      besitzer: 'demo_user_1',
      name: 'Bella',
      rasse: 'Golden Retriever',
      groesse: 'gross',
      alter: 3,
      geschlecht: 'weiblich',
      charaktereigenschaften: ['freundlich', 'verspielt', 'gutmütig'],
      vertraeglichMitHunden: true,
      vertraeglichMitKatzen: true,
      vertraeglichMitKindern: true,
      besonderheiten: 'Sehr lieb und gut erzogen. Mag lange Spaziergänge.',
      foto: '',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: 'demo_dog_2',
      besitzer: 'demo_user_3',
      name: 'Rocky',
      rasse: 'Jack Russell Terrier',
      groesse: 'klein',
      alter: 2,
      geschlecht: 'männlich',
      charaktereigenschaften: ['energiegeladen', 'verspielt', 'freundlich'],
      vertraeglichMitHunden: true,
      vertraeglichMitKatzen: false,
      vertraeglichMitKindern: true,
      besonderheiten: 'Sehr aktiv, braucht viel Bewegung und Beschäftigung.',
      foto: '',
      createdAt: '2024-01-20T15:00:00Z'
    },
    {
      _id: 'demo_dog_3',
      besitzer: 'demo_user_3',
      name: 'Luna',
      rasse: 'Französische Bulldogge',
      groesse: 'klein',
      alter: 5,
      geschlecht: 'weiblich',
      charaktereigenschaften: ['ruhig', 'freundlich', 'schüchtern'],
      vertraeglichMitHunden: true,
      vertraeglichMitKatzen: true,
      vertraeglichMitKindern: true,
      besonderheiten: 'Ruhig und verschmust. Perfekt für entspannte Tage.',
      foto: '',
      createdAt: '2024-01-20T15:30:00Z'
    }
  ];

  const demoReviews = [
    {
      _id: 'demo_review_1',
      bewerter: 'demo_user_3',
      bewerteter: 'demo_user_1',
      bewertung: 5,
      kommentar: 'Anna war großartig! Bella hat sich sehr wohl gefühlt. Sehr empfehlenswert!',
      zeitraum: {
        von: '2024-02-01T00:00:00Z',
        bis: '2024-02-03T00:00:00Z'
      },
      createdAt: '2024-02-04T10:00:00Z'
    },
    {
      _id: 'demo_review_2',
      bewerter: 'demo_user_1',
      bewerteter: 'demo_user_2',
      bewertung: 5,
      kommentar: 'Max ist ein Profi! Perfekte Betreuung, kann ich nur empfehlen.',
      zeitraum: {
        von: '2024-01-25T00:00:00Z',
        bis: '2024-01-27T00:00:00Z'
      },
      createdAt: '2024-01-28T09:00:00Z'
    }
  ];

  // Save demo data to localStorage
  localStorage.setItem('users', JSON.stringify(demoUsers));
  localStorage.setItem('dogs', JSON.stringify(demoDogs));
  localStorage.setItem('reviews', JSON.stringify(demoReviews));
  localStorage.setItem('demo_initialized', 'true');

  console.log('✅ Demo-Daten geladen! Sie können sich mit diesen Accounts anmelden:');
  console.log('📧 anna@example.com / demo123');
  console.log('📧 max@example.com / demo123');
  console.log('📧 sarah@example.com / demo123');
  console.log('📧 tom@example.com / demo123');
};
