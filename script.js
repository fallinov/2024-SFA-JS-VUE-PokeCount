// Importation de la Composition API de Vue.js
const { createApp } = Vue;

createApp({
  // La fonction setup est utilisée pour définir l'état réactif et les fonctions
  setup() {
    // Message d'accueil affiché au chargement de l'application
    const message = "Bienvenue dans PokeCount!";

    // Retourne les variables et fonctions pour qu'elles soient accessibles dans le template HTML
    return {
      message, // Le message d'accueil
    };
  }
}).mount("#poke-app"); // Monte l'application Vue.js sur l'élément HTML avec l'ID 'poke-app'
