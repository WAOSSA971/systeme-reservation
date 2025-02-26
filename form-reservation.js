// form-reservation.js
function showReservationForm(clientId = null) {
  // Masquer les autres sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
  
  // Si le formulaire existe déjà, le supprimer
  const existingForm = document.getElementById('section-reservation-form');
  if (existingForm) {
    existingForm.remove();
  }
  
  // Créer le formulaire
  const formSection = document.createElement('div');
  formSection.id = 'section-reservation-form';
  formSection.className = 'section';
  
  // Liste des logements disponibles
  const logements = [
    "Villa Azur", 
    "Chalet Alpin", 
    "Appartement Panorama", 
    "Résidence Les Pins", 
    "Studio Plage"
  ];
  
  const clientOptions = clients.map(client => 
    `<option value="${client.id}" ${clientId === client.id ? 'selected' : ''}>${client.nom} ${client.prenom}</option>`
  ).join('');
  
  const logementOptions = logements.map(logement => 
    `<option value="${logement}">${logement}</option>`
  ).join('');
  
  formSection.innerHTML = `
    <div class="flex justify-between mb-4">
      <div class="flex items-center">
        <button id="btn-retour-form" class="mr-3 text-blue-600 hover:text-blue-800">← Retour</button>
        <h2 class="text-xl font-semibold">Nouvelle Réservation</h2>
      </div>
    </div>
    
    <form id="reservation-form" class="space-y-6 max-w-3xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Client</label>
          <select id="reservation-client" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option value="">Sélectionnez un client</option>
            ${clientOptions}
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
          <input type="date" id="reservation-debut" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
          <input type="date" id="reservation-fin" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Logement</label>
          <select id="reservation-logement" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option value="">Sélectionnez un logement</option>
            ${logementOptions}
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select id="reservation-statut" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option value="En attente">En attente</option>
            <option value="Confirmé">Confirmé</option>
            <option value="Terminé">Terminé</option>
          </select>
        </div>
      </div>
      
      <div class="flex justify-end space-x-4">
        <button type="button" id="btn-annuler" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">Annuler</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Créer la réservation
        </button>
      </div>
    </form>
  `;
  
  // Ajouter le formulaire au DOM
  document.querySelector('.max-w-6xl').appendChild(formSection);
  
  // Ajouter les événements
  document.getElementById('btn-retour-form').addEventListener('click', function() {
    formSection.remove();
    setActiveTab('reservations');
  });
  
  document.getElementById('btn-annuler').addEventListener('click', function() {
    formSection.remove();
    setActiveTab('reservations');
  });
  
  // Validation des dates (fin après début)
  document.getElementById('reservation-debut').addEventListener('change', function() {
    document.getElementById('reservation-fin').min = this.value;
  });
  
  // Soumission du formulaire
  document.getElementById('reservation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const clientId = document.getElementById('reservation-client').value;
    const client = clients.find(c => c.id === clientId);
    
    const dateDebut = new Date(document.getElementById('reservation-debut').value);
    const dateFin = new Date(document.getElementById('reservation-fin').value);
    
    // Formater les dates pour l'affichage
    const debutFormatted = `${String(dateDebut.getDate()).padStart(2, '0')}/${String(dateDebut.getMonth() + 1).padStart(2, '0')}/${dateDebut.getFullYear()}`;
    const finFormatted = `${String(dateFin.getDate()).padStart(2, '0')}/${String(dateFin.getMonth() + 1).padStart(2, '0')}/${dateFin.getFullYear()}`;
    
    const reservationData = {
      id: generateReservationId(),
      clientId: clientId,
      clientNom: `${client.nom} ${client.prenom}`,
      dates: `${debutFormatted} - ${finFormatted}`,
      logement: document.getElementById('reservation-logement').value,
      statut: document.getElementById('reservation-statut').value,
      creeLe: formatDateForDisplay(getCurrentDate())
    };
    
    // Ajouter la réservation
    reservations.push(reservationData);
    
    // Mettre à jour le nombre de réservations du client
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex !== -1) {
      clients[clientIndex].reservations++;
    }
    
    // Mettre à jour l'affichage
    renderReservationsTable();
    formSection.remove();
    setActiveTab('reservations');
    
    // Feedback à l'utilisateur
    alert('Réservation créée avec succès!');
  });
}

function generateReservationId() {
  // Générer un ID unique pour la réservation
  const prefix = "RES-";
  const number = Math.floor(10000 + Math.random() * 90000); // 5 chiffres
  return prefix + number;
}
