// Importation de la Composition API de Vue.js
const { createApp, ref, computed, onMounted, watch } = Vue;

const app = createApp({
  // La fonction setup est utilisée pour définir l'état réactif et les fonctions
  setup() {
    // Message d'accueil affiché au chargement de l'application
    const message = "Bienvenue dans PokeCount!";

    // Utilisation de 'ref' pour créer des données réactives (état local de l'application)
    const compteur = ref(0); // Initialisation du compteur à 0
    const ilFautSauvegader = ref(false); // Indicateur si une sauvegarde est nécessaire
    const capturesTab = ref([]); // Tableau qui stocke les captures de Pokémon

    // Fonction qui gère la capture d'un Pokémon
    function capturer() {
      // Si le compteur n'est pas un nombre valide, le réinitialiser à 0
      if(isNaN(compteur.value)) {
        compteur.value = 0;
      }
      compteur.value += 1; // Incrémentation du compteur à chaque capture
    }

    // Fonction pour sauvegarder les captures dans le tableau
    function sauver() {
      // Validation pour vérifier que le compteur est un nombre valide et supérieur à 0
      if (isNaN(compteur.value) || compteur.value < 1) {
        alert("Veuillez entrer un nombre valide !"); // Message d'erreur si la validation échoue
        compteur.value = 0; // Réinitialise le compteur
        return; // Stoppe la fonction en cas d'erreur
      }
      // Ajoute le nombre capturé au tableau des captures
      capturesTab.value.push(compteur.value);
      // Sauvegarde les captures dans le localStorage
      localStorage.setItem('captures', JSON.stringify(capturesTab.value)); // Sauvegarde dans le localStorage
      // Réinitialise le compteur après sauvegarde
      compteur.value = 0;
    }

    // Fonction pour confirmer avant d'ouvrir le Pokédex
    function verifierAvantDeQuitter(event) {
      // Variable pour stocker la confirmation de l'utilisateur (true ou false)
      let confirmation = false;
      // Afficher une boîte de dialogue confirm
      confirmation = confirm("Avez-vous bien sauvegardé vos captures avant d'ouvrir le Pokédex ?");
      if (confirmation) {
        // Si l'utilisateur confirme, on continue vers le lien
        window.location.href = event.target.href; // event.target.href contient le lien de l'élément cliqué
      }
    }

    // Propriété calculée qui calcule le total des Pokémons capturés
    // Elle est recalculée automatiquement quand 'capturesTab' est modifié
    const totalPokemons = computed(() => {
      // Utilisation de reduce pour additionner toutes les valeurs du tableau des captures
      return capturesTab.value.reduce((total, nombre) => total + nombre, 0);
    });

    // Récupérer les données du localStorage lors du montage du composant
    onMounted(() => {
      const savedCaptures = JSON.parse(localStorage.getItem('captures'));
      if (savedCaptures) {
        capturesTab.value = savedCaptures;
      }
    });

    // Utilisation de 'watch' pour observer les changements du compteur
    watch(compteur, async (newVal, oldVal) => {
        // Vérifie si le compteur est supérieur à 0
        if (!isNaN(newVal) && newVal > 5) {
            ilFautSauvegader.value = true; // Active l'indicateur de sauvegarde
        } else {
            ilFautSauvegader.value = false; // Désactive l'indicateur de sauvegarde
        }
    })

    // Retourne les variables et fonctions pour qu'elles soient accessibles dans le template HTML
    return {
      message, // Le message d'accueil
      compteur, // Le compteur réactif
      ilFautSauvegader, // Indicateur de sauvegarde
      capturesTab, // Tableau des captures
      capturer, // Fonction de capture
      sauver, // Fonction de sauvegarde
      verifierAvantDeQuitter, // Fonction de confirmation avant de quitter
      totalPokemons // Propriété calculée du total des Pokémons capturés
    };
  }
}).mount("#poke-app"); // Monte l'application Vue.js sur l'élément HTML avec l'ID 'poke-app'
