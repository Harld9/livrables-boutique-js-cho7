/**
 * Script pour gérer les erreurs
 * Permet d'afficher le code d'erreur, le titre et le message appropriés
 */

class ErrorManager {
    constructor() {
        this.errorCodes = {
            404: {
                titre: "Page non trouvée",
                message: "Désolé, la page que vous recherchez n'existe pas ou a été supprimée.",
                icone: "🧦"
            },
            500: {
                titre: "Erreur serveur",
                message: "Oups! Une erreur interne s'est produite. Veuillez réessayer plus tard.",
                icone: "😰"
            },
            403: {
                titre: "Accès refusé",
                message: "Vous n'avez pas la permission d'accéder à cette ressource.",
                icone: "🚫"
            },
            400: {
                titre: "Requête invalide",
                message: "La requête envoyée est invalide. Veuillez reformuler votre demande.",
                icone: "❌"
            },
            503: {
                titre: "Service indisponible",
                message: "Le service est temporairement indisponible. Veuillez réessayer plus tard.",
                icone: "⚠️"
            }
        };

        this.init();
    }

    init() {
        // Récupère le code d'erreur depuis l'URL ou les paramètres
        const urlParams = new URLSearchParams(window.location.search);
        const errorCode = urlParams.get('code') || this.getErrorCodeFromPath() || 404;

        this.displayError(errorCode);
    }

    getErrorCodeFromPath() {
        const path = window.location.pathname;
        if (path.includes('500')) return 500;
        if (path.includes('403')) return 403;
        if (path.includes('400')) return 400;
        if (path.includes('503')) return 503;
        return null;
    }

    displayError(code) {
        const errorData = this.errorCodes[code] || this.errorCodes[404];

        const codeElement = document.getElementById('code-erreur');
        const titreElement = document.getElementById('titre-erreur');
        const messageElement = document.getElementById('message-erreur');
        const iconeElement = document.querySelector('.icone-erreur');

        if (codeElement) codeElement.textContent = code;
        if (titreElement) titreElement.textContent = errorData.titre;
        if (messageElement) messageElement.textContent = errorData.message;
        if (iconeElement) iconeElement.textContent = errorData.icone;

        // Update page title
        document.title = `${code} - ${errorData.titre}`;
    }
}

// Initialise le gestionnaire d'erreurs quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new ErrorManager();
});
