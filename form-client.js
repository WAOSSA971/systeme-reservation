// form-client.js
function showClientForm(clientToEdit = null) {
  // Masquer les autres sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
  
  // Si le formulaire existe déjà, le supprimer
  const existingForm = document.getElementById('section-client-form');
  if (existingForm) {
    existingForm.remove();
  }
  
  // Créer le formulaire
  const formSection = document.createElement('div');
  formSection.id = 'section-client-form';
  formSection.className = 'section';
  
  const isEditing = clientToEdit !== null;
  const formTitle = isEditing ? `Modifier Client: ${clientToEdit.nom} ${clientToEdit.prenom}` : 'Nouveau Client';
  
  formSection.innerHTML = `
    <div class="flex justify-between mb-4">
      <div class="flex items-center">
        <button id="btn-retour-form" class="mr-3 text-blue-600 hover:text-blue-800">← Retour</button>
        <h2 class="text-xl font-semibold">${formTitle}</h2>
      </div>
    </div>
    
    <form id="client-form" class="space-y-6 max-w-3xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input type="text" id="client-nom" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${isEditing ? clientToEdit.nom : ''}" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
          <input type="text" id="client-prenom" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${isEditing ? clientToEdit.prenom : ''}" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" id="client-email-input" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${isEditing ? clientToEdit.email : ''}" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input type="tel" id="client-telephone" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${isEditing ? clientToEdit.telephone : ''}" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date d'inscription</label>
          <input type="date" id="client-date-inscription" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${isEditing ? formatDateForInput(clientToEdit.dateInscription) : getCurrentDate()}" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Forfait initial versé</label>
          <div class="flex items-center">
            <input type="checkbox" id="client-initial-verse" class="mr-2" ${isEditing && clientToEdit.initialVerse ? 'checked' : ''}>
            <label for="client-initial-verse">1000€ versés</label>
          </div>
        </div>
      </div>
      
      <div class="border-t pt-4">
        <h3 class="font-medium mb-2">Plan de paiement</h3>
        <p class="text-sm text-gray-600 mb-4">Le client sera automatiquement inscrit au plan standard : forfait initial de 1000€ + 50€/mois pendant 5 ans (60 mensualités).</p>
        
        ${isEditing ? `
        <div class="bg-gray-50 p-4 rounded-md mb-4">
          <h4 class="font-medium mb-2">État actuel</h4>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mensualités payées</label>
              <input type="number" id="client-mensualites-payees" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${clientToEdit.mensualitesPayees}" min="0" max="60">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mensualités restantes</label>
              <input type="number" id="client-mensualites-restantes" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${clientToEdit.mensualitesRestantes}" min="0" max="60" readonly>
            </div>
          </div>
        </div>
        ` : ''}
      </div>
      
      <div class="flex justify-end space-x-4">
        <button type="button" id="btn-annuler" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">Annuler</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          ${isEditing ? 'Enregistrer les modifications' : 'Créer le client'}
        </button>
      </div>
    </form>
  `;
  
  // Ajouter le formulaire au DOM
  document.querySelector('.max-w-6xl').appendChild(formSection);
  
  // Ajouter les événements
  document.getElementById('btn-retour-form').addEventListener('click', function() {
    formSection.remove();
    setActiveTab('clients');
  });
  
  document.getElementById('btn-annuler').addEventListener('click', function() {
    formSection.remove();
    setActiveTab('clients');
  });
  
  // Si on édite, synchroniser les mensualités restantes
  if (isEditing) {
    document.getElementById('client-mensualites-payees').addEventListener('input', function(e) {
      const payees = parseInt(e.target.value) || 0;
      document.getElementById('client-mensualites-restantes').value = Math.max(0, 60 - payees);
    });
  }
  
  // Soumission du formulaire
  document.getElementById('client-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const clientData = {
      nom: document.getElementById('client-nom').value,
      prenom: document.getElementById('client-prenom').value,
      email: document.getElementById('client-email-input').value,
      telephone: document.getElementById('client-telephone').value,
      dateInscription: formatDateForDisplay(document.getElementById('client-date-inscription').value),
      initialVerse: document.getElementById('client-initial-verse').checked,
    };
    
    if (isEditing) {
      // Mode édition
      clientData.id = clientToEdit.id;
      clientData.mensualitesPayees = parseInt(document.getElementById('client-mensualites-payees').value) || 0;
      clientData.mensualitesRestantes = parseInt(document.getElementById('client-mensualites-restantes').value) || 0;
      clientData.reservations = clientToEdit.reservations;
      clientData.solde = clientToEdit.solde;
      
      // Trouver l'index du client à modifier
      const clientIndex = clients.findIndex(c => c.id === clientToEdit.id);
      if (clientIndex !== -1) {
        clients[clientIndex] = clientData;
      }
    } else {
      // Mode création
      clientData.id = generateClientId();
      clientData.mensualitesPayees = 0;
      clientData.mensualitesRestantes = 60;
      clientData.reservations = 0;
      clientData.solde = clientData.initialVerse ? -3000 : -4000; // 1000€ initial + 3000€ restants
      
      // Ajouter le nouveau client
      clients.push(clientData);
      
      // Ajouter des données de mensualités par année
      addMensualitesParAnnee(clientData.id, clientData.dateInscription);
    }
    
    // Mettre à jour l'affichage
    renderClientsTable();
    formSection.remove();
    setActiveTab('clients');
    
    // Feedback à l'utilisateur
    alert(isEditing ? 'Client modifié avec succès!' : 'Client créé avec succès!');
  });
}

// Fonctions utilitaires
function formatDateForInput(dateString) {
  // Convertir DD/MM/YYYY en YYYY-MM-DD pour input type="date"
  const parts = dateString.split('/');
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function formatDateForDisplay(dateString) {
  // Convertir YYYY-MM-DD en DD/MM/YYYY
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function getCurrentDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function generateClientId() {
  // Générer un ID unique pour le client
  const prefix = "CLI-";
  const number = Math.floor(10000 + Math.random() * 90000); // 5 chiffres
  return prefix + number;
}

function addMensualitesParAnnee(clientId, dateInscription) {
  // Créer des données de mensualités par année pour un nouveau client
  const startDate = new Date(dateInscription.split('/').reverse().join('/'));
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  
  const mensualites = [];
  
  // Calculer les mensualités pour chaque année (5 ans + 1 si nécessaire)
  for (let i = 0; i < 6; i++) {
    const annee = startYear + i;
    let mensualitesPrevues;
    
    if (i === 0) {
      // Première année - dépend du mois de début
      mensualitesPrevues = 12 - startMonth;
    } else if (i === 5) {
      // Dernière année - peut être partielle
      mensualitesPrevues = startMonth;
      if (mensualitesPrevues === 0) continue; // Pas besoin d'une 6e année
    } else {
      // Années complètes
      mensualitesPrevues = 12;
    }
    
    mensualites.push({
      annee,
      payees: 0,
      prevues: mensualitesPrevues,
      estFutur: true
    });
  }
  
  mensualitesParAnnee[clientId] = mensualites;
}
