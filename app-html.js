// Ce fichier génère dynamiquement le HTML principal
document.addEventListener('DOMContentLoaded', function() {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = `
    <div class="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold mb-6 text-center text-blue-800">Système de Réservation et Suivi de Comptes</h1>
      
      <!-- Navigation -->
      <div class="mb-6">
        <ul class="flex border-b">
          <li class="mr-1">
            <a id="tab-clients" class="tab-active inline-block py-2 px-4 font-semibold border-l border-t border-r rounded-t" href="#clients">Clients</a>
          </li>
          <li class="mr-1">
            <a id="tab-reservations" class="tab-inactive inline-block py-2 px-4 font-semibold border-l border-t border-r rounded-t" href="#reservations">Réservations</a>
          </li>
          <li class="mr-1">
            <a id="tab-paiements" class="tab-inactive inline-block py-2 px-4 font-semibold border-l border-t border-r rounded-t" href="#paiements">Paiements</a>
          </li>
          <li id="tab-client-detail-li" class="mr-1 hidden">
            <a id="tab-client-detail" class="tab-inactive inline-block py-2 px-4 font-semibold border-l border-t border-r rounded-t" href="#client-detail">Détail Client</a>
          </li>
        </ul>
      </div>
      
      <!-- Section Clients -->
      <div id="section-clients" class="section">
        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-semibold">Liste des Clients</h2>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Nouveau Client
          </button>
        </div>
        
        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border p-2 text-left">ID Client</th>
                <th class="border p-2 text-left">Nom</th>
                <th class="border p-2 text-left">Email</th>
                <th class="border p-2 text-left">Téléphone</th>
                <th class="border p-2 text-left">Inscription</th>
                <th class="border p-2 text-center">Forfait initial</th>
                <th class="border p-2 text-center">Mensualités payées</th>
                <th class="border p-2 text-right">Solde (€)</th>
                <th class="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody id="clients-table-body">
              <!-- Les clients seront ajoutés ici par JavaScript -->
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Section Réservations -->
      <div id="section-reservations" class="section hidden">
        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-semibold">Liste des Réservations</h2>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Nouvelle Réservation
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border p-2 text-left">ID Réservation</th>
                <th class="border p-2 text-left">Client</th>
                <th class="border p-2 text-left">Dates</th>
                <th class="border p-2 text-left">Logement</th>
                <th class="border p-2 text-left">Statut</th>
                <th class="border p-2 text-left">Créée le</th>
                <th class="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody id="reservations-table-body">
              <!-- Les réservations seront ajoutées ici par JavaScript -->
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Section Paiements -->
      <div id="section-paiements" class="section hidden">
        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-semibold">Liste des Paiements</h2>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Enregistrer Paiement
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border p-2 text-left">ID Paiement</th>
                <th class="border p-2 text-left">Client</th>
                <th class="border p-2 text-left">Date</th>
                <th class="border p-2 text-left">Type</th>
                <th class="border p-2 text-right">Montant (€)</th>
                <th class="border p-2 text-left">Statut</th>
                <th class="border p-2 text-left">Note</th>
              </tr>
            </thead>
            <tbody id="paiements-table-body">
              <!-- Les paiements seront ajoutés ici par JavaScript -->
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Section Détail Client -->
      <div id="section-client-detail" class="section hidden">
        <div class="flex justify-between mb-4">
          <div class="flex items-center">
            <button id="btn-retour" class="mr-3 text-blue-600 hover:text-blue-800">← Retour</button>
            <h2 id="client-name" class="text-xl font-semibold">Détail Client</h2>
          </div>
          <div>
            <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2">
              Enregistrer Paiement
            </button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Nouvelle Réservation
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <!-- Carte d'information du client -->
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold mb-2">Informations Client</h4>
            <p id="client-id" class="text-sm text-gray-500 mb-2">ID: </p>
            <div class="space-y-3">
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Nom complet:</span>
                <span id="client-fullname" class="font-medium"></span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Email:</span>
                <span id="client-email" class="font-medium"></span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Téléphone:</span>
                <span id="client-phone" class="font-medium"></span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Date d'inscription:</span>
                <span id="client-date" class="font-medium"></span>
              </div>
            </div>
          </div>
          
          <!-- Carte d'état du compte -->
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold mb-2">État du Compte</h4>
            <div class="space-y-3">
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Solde actuel:</span>
                <span id="client-solde" class="font-bold text-red-600"></span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Forfait initial:</span>
                <span class="font-medium">
                  <span id="client-initial" class="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Versé</span>
                </span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Mensualités payées:</span>
                <span id="client-mensualites" class="font-medium"></span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Mensualités restantes:</span>
                <span id="client-restantes" class="font-medium"></span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Prochain paiement:</span>
                <span class="font-medium">50 €</span>
              </div>
            </div>
          </div>
          
          <!-- Carte de résumé des réservations -->
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold mb-2">Réservations</h4>
            <div class="space-y-3">
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Total de réservations:</span>
                <span id="client-reservations" class="font-medium"></span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Réservations actives:</span>
                <span id="client-actives" class="font-medium"></span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Réservations passées:</span>
                <span id="client-passees" class="font-medium"></span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Progression des paiements -->
        <div class="border rounded-lg p-4 mb-6">
          <h4 class="font-semibold mb-2">Progression des Paiements</h4>
          <p class="text-sm text-gray-500 mb-2">Plan de paiement sur 5 ans (60 mensualités)</p>
          <div class="mb-2 flex items-center justify-between">
            <span id="client-progress-percent" class="text-sm text-gray-500"></span>
            <span id="client-progress-count" class="text-sm text-gray-500"></span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div id="client-progress-bar" class="bg-blue-600 h-4 rounded-full" style="width: 0%"></div>
          </div>
          
          <!-- État des mensualités par année -->
          <div class="mt-6">
            <h4 class="font-semibold mb-3">État des mensualités par année</h4>
            <div id="mensualites-annuelles" class="space-y-3">
              <!-- Les données de mensualités par année seront ajoutées ici -->
            </div>
          </div>
          
          <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold mb-2">Détail du plan</h4>
              <ul class="space-y-1 text-sm">
                <li class="flex justify-between">
                  <span>Versement initial:</span>
                  <span>1 000 €</span>
                </li>
                <li class="flex justify-between">
                  <span>Mensualité:</span>
                  <span>50 € × 60 mois</span>
                </li>
                <li class="flex justify-between">
                  <span>Total sur 5 ans:</span>
                  <span>4 000 €</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-2">État actuel</h4>
              <ul class="space-y-1 text-sm">
                <li class="flex justify-between">
                  <span>Total déjà payé:</span>
                  <span id="client-total-paye"></span>
                </li>
                <li class="flex justify-between">
                  <span>Restant à payer:</span>
                  <span id="client-total-restant"></span>
                </li>
                <li class="flex justify-between">
                  <span>Fin prévue des paiements:</span>
                  <span id="client-fin-paiements"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Historique des réservations -->
        <div class="border rounded-lg p-4 mb-6">
          <h4 class="font-semibold mb-2">Historique des Réservations</h4>
          <div id="client-reservations-table">
            <!-- Le tableau des réservations sera ajouté ici -->
          </div>
        </div>
        
        <!-- Historique des paiements -->
        <div class="border rounded-lg p-4 mb-6">
          <h4 class="font-semibold mb-2">Historique des Paiements</h4>
          <div id="client-paiements-table">
            <!-- Le tableau des paiements sera ajouté ici -->
          </div>
        </div>
      </div>
    </div>
  `;
});
