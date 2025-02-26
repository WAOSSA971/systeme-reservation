// form-paiement.js
function showPaiementForm(clientId = null) {
  // Masquer les autres sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
  
  // Si le formulaire existe déjà, le supprimer
  const existingForm = document.getElementById('section-paiement-form');
  if (existingForm) {
    existingForm.remove();
  }
  
  // Créer le formulaire
  const formSection = document.createElement('div');
  formSection.id = 'section-paiement-form';
  formSection.className = 'section';
  
  const clientOptions = clients.map(client => 
    `<option value="${client.id}" ${clientId === client.id ? 'selected' : ''}>${client.nom} ${client.prenom}</option>`
  ).join('');
  
  formSection.innerHTML = `
    <div class="flex justify-between mb-4">
      <div class="flex items-center">
        <button id="btn-retour-form" class="mr-3 text-blue-600 hover:text-blue-800">← Retour</button>
        <h2 class="text-xl font-semibold">Enregistrer un paiement</h2>
      </div>
    </div>
    
    <form id="paiement-form" class="space-y-6 max-w-3xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Client</label>
          <select id="paiement-client" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option value="">Sélectionnez un client</option>
            ${clientOptions}
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date du paiement</label>
          <input type="date" id="paiement-date" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${getCurrentDate()}" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select id="paiement-type" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option value="Initial">Forfait Initial</option>
            <option value="Mensualité" selected>Mensualité</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Montant (€)</label>
          <input type="number" id="paiement-montant" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="50" min="0" step="10" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de mensualités (si applicable)</label>
          <input type="number" id="paiement-mensualites" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="1" min="1" max="60">
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Note</label>
          <textarea id="paiement-note" class="w-full px-3 py-2 border border-gray-300 rounded-md" rows="2"></textarea>
        </div>
      </div>
      
      <div class="flex justify-end space-x-4">
        <button type="button" id="btn-annuler" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">Annuler</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Enregistrer le paiement
        </button>
      </div>
    </form>
  `;
  
  // Ajouter le formulaire au DOM
  document.querySelector('.max-w-6xl').appendChild(formSection);
  
  // Ajouter les événements
  document.getElementById('btn-retour-form').addEventListener('click', function() {
    formSection.remove();
    setActiveTab('paiements');
  });
  
  document.getElementById('btn-annuler').addEventListener('click', function() {
    formSection.remove();
    setActiveTab('paiements');
  });
  
  // Changer le montant selon le type
  document.getElementById('paiement-type').addEventListener('change', function() {
    const montantInput = document.getElementById('paiement-montant');
    const mensualitesInput = document.getElementById('paiement-mensualites');
    
    if (this.value === 'Initial') {
      montantInput.value = '1000';
      mensualitesInput.disabled = true;
      mensualitesInput.value = '0';
    } else {
      montantInput.value = '50';
      mensualitesInput.disabled = false;
      mensualitesInput.value = '1';
    }
  });
  
  // Mettre à jour le montant selon le nombre de mensualités
  document.getElementById('paiement-mensualites').addEventListener('input', function() {
    const montantInput = document.getElementById('paiement-montant');
    const typeSelect = document.getElementById('paiement-type');
    
    if (typeSelect.value === 'Mensualité') {
      const nbMensualites = parseInt(this.value) || 0;
      montantInput.value = nbMensualites * 50;
    }
  });
  
  // Soumission du formulaire
  document.getElementById('paiement-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const clientId = document.getElementById('paiement-client').value;
    const client = clients.find(c => c.id === clientId);
    const type = document.getElementById('paiement-type').value;
    const montant = parseFloat(document.getElementById('paiement-montant').value);
    const nbMensualites = parseInt(document.getElementById('paiement-mensualites').value) || 0;
    
    const paiementData = {
      id: generatePaiementId(),
      clientId: clientId,
      clientNom: `${client.nom} ${client.prenom}`,
      date: formatDateForDisplay(document.getElementById('paiement-date').value),
      type: type,
      montant: montant,
      statut: "Payé",
      note: document.getElementById('paiement-note').value
    };
    
    // Ajouter le paiement
    paiements.push(paiementData);
    
    // Mettre à jour les informations du client
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex !== -1) {
      if (type === 'Initial') {
        clients[clientIndex].initialVerse = true;
        clients[clientIndex].solde += 1000; // Réduire la dette
      } else if (type === 'Mensualité') {
        clients[clientIndex].mensualitesPayees += nbMensualites;
        clients[clientIndex].mensualitesRestantes = Math.max(0, 60 - clients[clientIndex].mensualitesPayees);
        clients[clientIndex].solde += montant; // Réduire la dette
      }
      
      // Mettre à jour les mensualités par année
      updateMensualitesParAnnee(clientId, nbMensualites);
    }
    
    // Mettre à jour l'affichage
    renderPaiementsTable();
    formSection.remove();
    setActiveTab('paiements');
    
    // Feedback à l'utilisateur
    alert('Paiement enregistré avec succès!');
  });
}

function generatePaiementId() {
  // Générer un ID unique pour le paiement
  const prefix = "PAY-";
  const number = Math.floor(10000 + Math.random() * 90000); // 5 chiffres
  return prefix + number;
}

function updateMensualitesParAnnee(clientId, nbMensualitesAjoutees) {
  if (!mensualitesParAnnee[clientId]) return;
  
  let restantes = nbMensualitesAjoutees;
  
  // Distribution par année
  for (let i = 0; i < mensualitesParAnnee[clientId].length && restantes > 0; i++) {
    const annee = mensualitesParAnnee[clientId][i];
    
    // Si l'année est future, on commence à y ajouter des mensualités
    if (annee.estFutur) continue;
    
    // Calculer combien on peut ajouter à cette année
    const disponibles = annee.prevues - annee.payees;
    const aAjouter = Math.min(disponibles, restantes);
    
    // Ajouter les mensualités
    annee.payees += aAjouter;
    restantes -= aAjouter;
  }
}
