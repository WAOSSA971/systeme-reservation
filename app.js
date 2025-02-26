// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
  // Remplir les tableaux avec les données
  renderClientsTable();
  renderReservationsTable();
  renderPaiementsTable();
  
  // Initialiser les événements des onglets
  initTabEvents();
  
  // Initialiser les événements des boutons de détail client
  initClientDetailButtons();
  
  // Initialiser le bouton de retour
  document.getElementById('btn-retour').addEventListener('click', function() {
    hideClientDetail();
  });
  
  // Initialiser les autres boutons
  initOtherButtons();
});

// Fonctions d'initialisation
function initTabEvents() {
  const tabs = ['clients', 'reservations', 'paiements', 'client-detail'];
  
  tabs.forEach(tab => {
    const tabElement = document.getElementById(`tab-${tab}`);
    if (tabElement) {
      tabElement.addEventListener('click', function(e) {
        e.preventDefault();
        setActiveTab(tab);
      });
    }
  });
}

// Fonction pour initialiser les boutons d'action
function initActionButtons() {
  // Nouveau Client
  document.querySelectorAll('button').forEach(button => {
    if (button.textContent.trim() === 'Nouveau Client') {
      button.addEventListener('click', function() {
        showClientForm();
      });
    }
    else if (button.textContent.trim() === 'Nouvelle Réservation') {
      button.addEventListener('click', function() {
        showReservationForm();
      });
    }
    else if (button.textContent.trim() === 'Enregistrer Paiement') {
      button.addEventListener('click', function() {
        const clientId = document.getElementById('client-id')?.textContent.split(':')[1]?.trim();
        showPaiementForm(clientId);
      });
    }
  });
}

function initClientDetailButtons() {
  document.querySelectorAll('.detail-client').forEach(button => {
    button.addEventListener('click', function() {
      const clientId = this.getAttribute('data-client');
      showClientDetail(clientId);
    });
  });
}

function initOtherButtons() {
  // Tous les boutons autres que les onglets et les détails clients
  const buttons = document.querySelectorAll('button:not(.detail-client):not(#btn-retour)');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Cette fonctionnalité serait implémentée dans la version complète.');

  // Bouton "Nouveau Client"
  const btnNouveauClient = document.querySelector('button:contains("Nouveau Client")');
  if (btnNouveauClient) {
    btnNouveauClient.removeEventListener('click', showDefaultAlert);
    btnNouveauClient.addEventListener('click', function() {
      showClientForm();
    });
  }
  
  // Bouton "Nouvelle Réservation"
  const btnNouvelleReservation = document.querySelector('button:contains("Nouvelle Réservation")');
  if (btnNouvelleReservation) {
    btnNouvelleReservation.removeEventListener('
    });
  });
}

// Fonctions de rendu des tableaux
function renderClientsTable() {
  const tableBody = document.getElementById('clients-table-body');
  tableBody.innerHTML = '';
  
  clients.forEach(client => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    
    row.innerHTML = `
      <td class="border p-2 font-mono text-sm">${client.id}</td>
      <td class="border p-2">${client.nom} ${client.prenom}</td>
      <td class="border p-2">${client.email}</td>
      <td class="border p-2">${client.telephone}</td>
      <td class="border p-2">${client.dateInscription}</td>
      <td class="border p-2 text-center">
        ${client.initialVerse ? 
          '<span class="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Versé</span>' : 
          '<span class="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">En attente</span>'
        }
      </td>
      <td class="border p-2 text-center">
        <div class="flex items-center justify-center">
          <span class="font-semibold mr-1">${client.mensualitesPayees}</span>
          <span class="text-gray-500 text-xs">/ 60</span>
        </div>
      </td>
      <td class="border p-2 text-right font-semibold text-red-600">${client.solde} €</td>
      <td class="border p-2 text-center">
        <button class="detail-client text-blue-600 hover:text-blue-800" data-client="${client.id}">Détails</button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Réinitialiser les événements après avoir rendu la table
  initClientDetailButtons();
}
function renderReservationsTable(clientId = null) {
  const tableBody = document.getElementById('reservations-table-body');
  tableBody.innerHTML = '';
  
  const filteredReservations = clientId ? 
    reservations.filter(r => r.clientId === clientId) : 
    reservations;
  
  filteredReservations.forEach(res => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    
    let statutClass = '';
    if (res.statut === 'Confirmé') statusClass = 'bg-green-100 text-green-800';
    else if (res.statut === 'En attente') statusClass = 'bg-yellow-100 text-yellow-800';
    else if (res.statut === 'Terminé') statusClass = 'bg-gray-100 text-gray-800';
    
    row.innerHTML = `
      <td class="border p-2 font-mono text-sm">${res.id}</td>
      <td class="border p-2">${res.clientNom}</td>
      <td class="border p-2">${res.dates}</td>
      <td class="border p-2">${res.logement}</td>
      <td class="border p-2">
        <span class="px-2 py-1 rounded-full text-xs ${statusClass}">${res.statut}</span>
      </td>
      <td class="border p-2">${res.creeLe}</td>
      <td class="border p-2 text-center">
        <button class="text-blue-600 hover:text-blue-800 mr-2">Détails</button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

function renderPaiementsTable(clientId = null) {
  const tableBody = document.getElementById('paiements-table-body');
  tableBody.innerHTML = '';
  
  const filteredPaiements = clientId ? 
    paiements.filter(p => p.clientId === clientId) : 
    paiements;
  
  filteredPaiements.forEach(paiement => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    
    row.innerHTML = `
      <td class="border p-2 font-mono text-sm">${paiement.id}</td>
      <td class="border p-2">${paiement.clientNom}</td>
      <td class="border p-2">${paiement.date}</td>
      <td class="border p-2">${paiement.type}</td>
      <td class="border p-2 text-right">${paiement.montant} €</td>
      <td class="border p-2">
        <span class="px-2 py-1 rounded-full text-xs ${paiement.statut === 'Payé' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${paiement.statut}</span>
      </td>
      <td class="border p-2">${paiement.note || '-'}</td>
    `;
    
    tableBody.appendChild(row);
  });
}
function renderReservationsTable(clientId = null) {
  const tableBody = document.getElementById('reservations-table-body');
  tableBody.innerHTML = '';
  
  const filteredReservations = clientId ? 
    reservations.filter(r => r.clientId === clientId) : 
    reservations;
  
  filteredReservations.forEach(res => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    
    let statusClass = '';
    if (res.statut === 'Confirmé') statusClass = 'bg-green-100 text-green-800';
    else if (res.statut === 'En attente') statusClass = 'bg-yellow-100 text-yellow-800';
    else if (res.statut === 'Terminé') statusClass = 'bg-gray-100 text-gray-800';
    
    row.innerHTML = `
      <td class="border p-2 font-mono text-sm">${res.id}</td>
      <td class="border p-2">${res.clientNom}</td>
      <td class="border p-2">${res.dates}</td>
      <td class="border p-2">${res.logement}</td>
      <td class="border p-2">
        <span class="px-2 py-1 rounded-full text-xs ${statusClass}">${res.statut}</span>
      </td>
      <td class="border p-2">${res.creeLe}</td>
      <td class="border p-2 text-center">
        <button class="text-blue-600 hover:text-blue-800 mr-2">Détails</button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

function renderPaiementsTable(clientId = null) {
  const tableBody = document.getElementById('paiements-table-body');
  tableBody.innerHTML = '';
  
  const filteredPaiements = clientId ? 
    paiements.filter(p => p.clientId === clientId) : 
    paiements;
  
  filteredPaiements.forEach(paiement => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    
    row.innerHTML = `
      <td class="border p-2 font-mono text-sm">${paiement.id}</td>
      <td class="border p-2">${paiement.clientNom}</td>
      <td class="border p-2">${paiement.date}</td>
      <td class="border p-2">${paiement.type}</td>
      <td class="border p-2 text-right">${paiement.montant} €</td>
      <td class="border p-2">
        <span class="px-2 py-1 rounded-full text-xs ${paiement.statut === 'Payé' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${paiement.statut}</span>
      </td>
      <td class="border p-2">${paiement.note || '-'}</td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Fonctions de navigation
function setActiveTab(activeTabId) {
  const tabs = ['clients', 'reservations', 'paiements', 'client-detail'];
  
  tabs.forEach(tab => {
    const tabElement = document.getElementById(`tab-${tab}`);
    const sectionElement = document.getElementById(`section-${tab}`);
    
    if (tabElement && sectionElement) {
      if (tab === activeTabId) {
        tabElement.className = 'tab-active inline-block py-2 px-4 font-semibold border-l border-t border-r rounded-t';
        sectionElement.classList.remove('hidden');
      } else {
        tabElement.className = 'tab-inactive inline-block py-2 px-4 font-semibold border-l border-t border-r rounded-t';
        sectionElement.classList.add('hidden');
      }
    }
  });
}

// Fonctions pour les détails du client
function showClientDetail(clientId) {
  const client = clients.find(c => c.id === clientId);
  if (!client) return;
  
  // Mettre à jour les informations du client
  document.getElementById('client-name').textContent = `Détail Client: ${client.nom} ${client.prenom}`;
  document.getElementById('client-id').textContent = `ID: ${client.id}`;
  document.getElementById('client-fullname').textContent = `${client.nom} ${client.prenom}`;
  document.getElementById('client-email').textContent = client.email;
  document.getElementById('client-phone').textContent = client.telephone;
  document.getElementById('client-date').textContent = client.dateInscription;
  document.getElementById('client-solde').textContent = `${client.solde} €`;
  document.getElementById('client-mensualites').textContent = `${client.mensualitesPayees} / 60`;
  document.getElementById('client-restantes').textContent = client.mensualitesRestantes;
  document.getElementById('client-reservations').textContent = client.reservations;
  
  // Calculer les réservations actives/passées
  const clientReservations = reservations.filter(r => r.clientId === client.id);
  const reservationsActives = clientReservations.filter(r => r.statut === 'Confirmé').length;
  const reservationsPassees = clientReservations.filter(r => r.statut === 'Terminé').length;
  
  document.getElementById('client-actives').textContent = reservationsActives;
  document.getElementById('client-passees').textContent = reservationsPassees;
  
  // Mise à jour de la barre de progression
  const progressPercent = Math.round((client.mensualitesPayees / 60) * 100);
  document.getElementById('client-progress-percent').textContent = `Progression: ${progressPercent}%`;
  document.getElementById('client-progress-count').textContent = `${client.mensualitesPayees} sur 60 mensualités`;
  document.getElementById('client-progress-bar').style.width = `${progressPercent}%`;
  
  // Mise à jour des montants
  document.getElementById('client-total-paye').textContent = `${1000 + (client.mensualitesPayees * 50)} €`;
  document.getElementById('client-total-restant').textContent = `${client.mensualitesRestantes * 50} €`;
  
  // Calcul de la date de fin des paiements
  const dateInscription = client.dateInscription.split('/').reverse().join('/');
  const dateFinale = new Date(dateInscription);
  dateFinale.setMonth(dateFinale.getMonth() + 60);
  const dateFinaleFormatee = `${String(dateFinale.getDate()).padStart(2, '0')}/${String(dateFinale.getMonth() + 1).padStart(2, '0')}/${dateFinale.getFullYear()}`;
  document.getElementById('client-fin-paiements').textContent = dateFinaleFormatee;
  
  // Rendre les mensualtés par année
  renderMensualitesAnnuelles(client.id);
  
  // Rendre les tableaux de réservations et paiements du client
  renderClientReservationsTable(client.id);
  renderClientPaiementsTable(client.id);
  
  // Afficher l'onglet détail client
  document.getElementById('tab-client-detail-li').classList.remove('hidden');
  setActiveTab('client-detail');
}

function hideClientDetail() {
  document.getElementById('tab-client-detail-li').classList.add('hidden');
  setActiveTab('clients');
}

function renderMensualitesAnnuelles(clientId) {
  const container = document.getElementById('mensualites-annuelles');
  container.innerHTML = '';
  
  const clientMensualites = mensualitesParAnnee[clientId];
  if (!clientMensualites) return;
  
  clientMensualites.forEach(annee => {
    const div = document.createElement('div');
    
    const progressPercent = (annee.payees / annee.prevues) * 100;
    const barColorClass = annee.estFutur ? 'bg-gray-400' : 'bg-blue-600';
    const estComplete = annee.payees === annee.prevues && !annee.estFutur;
    
    div.innerHTML = `
      <div class="flex justify-between mb-1">
        <span class="font-medium">${annee.annee} ${annee.estFutur ? '<span class="text-xs ml-1 text-gray-500">(à venir)</span>' : ''}</span>
        <span>${annee.payees} / ${annee.prevues} mensualités ${estComplete ? '<span class="ml-2 text-green-600">✓</span>' : ''}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div class="${barColorClass} h-3 rounded-full" style="width: ${progressPercent}%"></div>
      </div>
    `;
    
    container.appendChild(div);
  });
}

function renderClientReservationsTable(clientId) {
  const container = document.getElementById('client-reservations-table');
  const clientReservations = reservations.filter(r => r.clientId === clientId);
  
  if (clientReservations.length === 0) {
    container.innerHTML = `<div class="text-center py-4 text-gray-500">Aucune réservation pour ce client</div>`;
    return;
  }
  
  let html = `
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2 text-left">ID</th>
          <th class="border p-2 text-left">Dates</th>
          <th class="border p-2 text-left">Logement</th>
          <th class="border p-2 text-left">Statut</th>
          <th class="border p-2 text-left">Créée le</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  clientReservations.forEach(res => {
    let statusClass = '';
    if (res.statut === 'Confirmé') statusClass = 'bg-green-100 text-green-800';
    else if (res.statut === 'En attente') statusClass = 'bg-yellow-100 text-yellow-800';
    else if (res.statut === 'Terminé') statusClass = 'bg-gray-100 text-gray-800';
    
    html += `
      <tr class="hover:bg-gray-50">
        <td class="border p-2 font-mono text-sm">${res.id}</td>
        <td class="border p-2">${res.dates}</td>
        <td class="border p-2">${res.logement}</td>
        <td class="border p-2">
          <span class="px-2 py-1 rounded-full text-xs ${statusClass}">${res.statut}</span>
        </td>
        <td class="border p-2">${res.creeLe}</td>
      </tr>
    `;
  });
  
  html += `
      </tbody>
    </table>
  `;
  
  container.innerHTML = html;
}

function renderClientPaiementsTable(clientId) {
  const container = document.getElementById('client-paiements-table');
  const clientPaiements = paiements.filter(p => p.clientId === clientId);
  
  if (clientPaiements.length === 0) {
    container.innerHTML = `<div class="text-center py-4 text-gray-500">Aucun paiement pour ce client</div>`;
    return;
  }
  
  let html = `
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2 text-left">ID</th>
          <th class="border p-2 text-left">Date</th>
          <th class="border p-2 text-left">Type</th>
          <th class="border p-2 text-right">Montant (€)</th>
          <th class="border p-2 text-left">Statut</th>
          <th class="border p-2 text-left">Note</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  clientPaiements.forEach(paiement => {
    html += `
      <tr class="hover:bg-gray-50">
        <td class="border p-2 font-mono text-sm">${paiement.id}</td>
        <td class="border p-2">${paiement.date}</td>
        <td class="border p-2">${paiement.type}</td>
        <td class="border p-2 text-right">${paiement.montant} €</td>
        <td class="border p-2">
          <span class="px-2 py-1 rounded-full text-xs ${paiement.statut === 'Payé' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${paiement.statut}</span>
        </td>
        <td class="border p-2">${paiement.note || '-'}</td>
      </tr>
    `;
  });
  
  html += `
      </tbody>
    </table>
  `;
  
  container.innerHTML = html;
}
