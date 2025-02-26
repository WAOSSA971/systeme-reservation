// Données des clients
const clients = [
  { 
    id: "CLI-78945", 
    nom: "Dubois", 
    prenom: "Marie", 
    email: "m.dubois@email.com", 
    telephone: "06 12 34 56 78", 
    dateInscription: "12/05/2023",
    initialVerse: true,
    mensualitesPayees: 10,
    mensualitesRestantes: 50,
    reservations: 2, 
    solde: -1500 
  },
  { 
    id: "CLI-23567", 
    nom: "Martin", 
    prenom: "Thomas", 
    email: "t.martin@email.com", 
    telephone: "07 45 67 89 01", 
    dateInscription: "23/09/2023",
    initialVerse: true,
    mensualitesPayees: 6,
    mensualitesRestantes: 54,
    reservations: 1, 
    solde: -2200 
  },
  { 
    id: "CLI-45982", 
    nom: "Petit", 
    prenom: "Sophie", 
    email: "s.petit@email.com", 
    telephone: "06 98 76 54 32", 
    dateInscription: "05/01/2024",
    initialVerse: true,
    mensualitesPayees: 2,
    mensualitesRestantes: 58,
    reservations: 0, 
    solde: -800 
  }
];

// Données des réservations
const reservations = [
  { 
    id: "RES-12458", 
    clientId: "CLI-78945", 
    clientNom: "Dubois Marie", 
    dates: "15/07 - 22/07/2025", 
    logement: "Villa Azur", 
    statut: "Confirmé", 
    creeLe: "12/01/2024"
  },
  { 
    id: "RES-23987", 
    clientId: "CLI-78945", 
    clientNom: "Dubois Marie", 
    dates: "10/08 - 17/08/2024", 
    logement: "Appartement Panorama", 
    statut: "Terminé", 
    creeLe: "15/03/2024"
  },
  { 
    id: "RES-34521", 
    clientId: "CLI-23567", 
    clientNom: "Martin Thomas", 
    dates: "01/08 - 15/08/2025", 
    logement: "Chalet Alpin", 
    statut: "En attente", 
    creeLe: "30/01/2024"
  }
];

// Données des paiements
const paiements = [
  { 
    id: "PAY-12345", 
    clientId: "CLI-78945", 
    clientNom: "Dubois Marie", 
    date: "12/05/2023", 
    type: "Initial", 
    montant: 1000, 
    statut: "Payé",
    note: "" 
  },
  { 
    id: "PAY-12346", 
    clientId: "CLI-78945", 
    clientNom: "Dubois Marie", 
    date: "12/06/2023", 
    type: "Mensualité", 
    montant: 50, 
    statut: "Payé",
    note: "" 
  },
  { 
    id: "PAY-23675", 
    clientId: "CLI-23567", 
    clientNom: "Martin Thomas", 
    date: "23/09/2023", 
    type: "Initial", 
    montant: 1000, 
    statut: "Payé",
    note: "" 
  },
  { 
    id: "PAY-23676", 
    clientId: "CLI-23567", 
    clientNom: "Martin Thomas", 
    date: "23/02/2024", 
    type: "Mensualité", 
    montant: 300, 
    statut: "Payé",
    note: "Paiement de 6 mensualités en avance" 
  },
  { 
    id: "PAY-45982", 
    clientId: "CLI-45982", 
    clientNom: "Petit Sophie", 
    date: "05/01/2024", 
    type: "Initial", 
    montant: 1000, 
    statut: "Payé",
    note: "" 
  },
  { 
    id: "PAY-45983", 
    clientId: "CLI-45982", 
    clientNom: "Petit Sophie", 
    date: "05/02/2024", 
    type: "Mensualité", 
    montant: 50, 
    statut: "Payé",
    note: "" 
  },
  { 
    id: "PAY-45984", 
    clientId: "CLI-45982", 
    clientNom: "Petit Sophie", 
    date: "05/03/2024", 
    type: "Mensualité", 
    montant: 50, 
    statut: "Payé",
    note: "" 
  }
];

// Données de mensualités par année pour chaque client
const mensualitesParAnnee = {
  "CLI-78945": [
    { annee: 2023, payees: 8, prevues: 8, estFutur: false },
    { annee: 2024, payees: 2, prevues: 12, estFutur: false },
    { annee: 2025, payees: 0, prevues: 12, estFutur: true },
    { annee: 2026, payees: 0, prevues: 12, estFutur: true },
    { annee: 2027, payees: 0, prevues: 12, estFutur: true },
    { annee: 2028, payees: 0, prevues: 4, estFutur: true }
  ],
  "CLI-23567": [
    { annee: 2023, payees: 4, prevues: 4, estFutur: false },
    { annee: 2024, payees: 2, prevues: 12, estFutur: false },
    { annee: 2025, payees: 0, prevues: 12, estFutur: true },
    { annee: 2026, payees: 0, prevues: 12, estFutur: true },
    { annee: 2027, payees: 0, prevues: 12, estFutur: true },
    { annee: 2028, payees: 0, prevues: 8, estFutur: true }
  ],
  "CLI-45982": [
    { annee: 2024, payees: 2, prevues: 12, estFutur: false },
    { annee: 2025, payees: 0, prevues: 12, estFutur: true },
    { annee: 2026, payees: 0, prevues: 12, estFutur: true },
    { annee: 2027, payees: 0, prevues: 12, estFutur: true },
    { annee: 2028, payees: 0, prevues: 12, estFutur: true },
    { annee: 2029, payees: 0, prevues: 1, estFutur: true }
  ]
};
