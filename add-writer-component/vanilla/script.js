const form = document.getElementById("writer-form");
const avatarInput = document.getElementById("avatar");
const writerImage = document.getElementById("writer-image");

// État initial (icônes)
const initialImageHTML = writerImage.innerHTML;

// Limite de taille : 1MB
const MAX_SIZE = 1 * 1024 * 1024;

// Fonction : afficher un message d'erreur
function showError(message) {
    alert(message);
}

// Fonction : réinitialiser l'image
function resetImage() {
    writerImage.innerHTML = initialImageHTML;
}

// Fonction : afficher la preview
function displayPreview(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        writerImage.innerHTML = `
            <img src="${e.target.result}" 
                 alt="Writer avatar preview" 
                 style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
        `;
    };

    reader.readAsDataURL(file);
}

// Gestion de l’upload
avatarInput.addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (!file) {
        resetImage();
        return;
    }

    // Validation du type
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        showError("Format invalide. Formats acceptés : JPG, JPEG, PNG.");
        avatarInput.value = "";
        resetImage();
        return;
    }

    // Validation de la taille
    if (file.size > MAX_SIZE) {
        showError("Fichier trop lourd. Taille maximale : 1MB.");
        avatarInput.value = "";
        resetImage();
        return;
    }

    // Affichage de la preview
    displayPreview(file);
});

// Gestion du submit
form.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            if (value instanceof File) {
                data[key] = value.name || "(aucun fichier)";
            } else {
                data[key] = value;
            }
        });

        console.log("Données envoyées :");
        console.log(JSON.stringify(data, null, 2));

        alert("Writer saved successfully.");

    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
});

// Gestion du bouton Cancel (reset)
form.addEventListener("reset", function() {
    resetImage();
});
