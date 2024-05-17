const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Spécifiez le chemin où les fichiers seront stockés temporairement avant d'être traités
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Assurez-vous que le répertoire uploads existe
    const dirPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    cb(null, dirPath); // Utilisez le chemin absolu pour éviter les erreurs
  },
  filename: function(req, file, cb) {
    // Remplacez les séparateurs de colonnes par des tirets bas pour éviter les problèmes de compatibilité
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

// Créez un middleware multer avec la configuration spécifiée
const upload = multer({ storage: storage });

module.exports = upload;
