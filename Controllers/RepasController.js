const { PrismaClient } = require("@prisma/client");
const Joi = require('joi');


const prisma = new PrismaClient();

// Schema validation for Repas model
const RepasSchema = Joi.object({
  nom: Joi.string().max(255).required(),
  description: Joi.string().max(1000).optional(),
  prix: Joi.number().precision(2).required(),
  image_url: Joi.string().uri().allow('').optional(),
  categorie_id: Joi.number().integer().optional(),
  restaurant_id: Joi.number().integer().optional(),
});

// Function to display all meals
const afficherRepas = async (req, res, next) => {
  try {
    const repas = await prisma.Repas.findMany();

    if (!repas || repas.length === 0) {
      return res.status(404).json({ Erreur: "Aucun repas trouvé! Ajoutez des repas.." });
    }

    return res.status(200).json(repas);
  } catch (error) {
    next(error);
  }
};

// Function to display a meal by its ID
const afficherRepasParId = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const repas = await prisma.Repas.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        categorierepas: true, // Include category relation
        restaurant: true // Include restaurant relation
      }
    });

    if (!repas) {
      return res.status(404).json({ Erreur: "Repas non trouvé!" });
    }

    return res.status(200).json(repas);
  } catch (error) {
    next(error);
  }
};

// Function to add a meal


const ajouterRepas = async (req, res, next) => {

  try {
    const { error } = RepasSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ Erreur: error.details[0].message });
    }

    const {
      nom   ,
      description,
      prix        ,
      image_url     ,
      categorie_id   ,
      restaurant_id  }=req.body;

    const repasData = {
      
        nom   ,
        description,
        prix        ,
        categorie_id:+categorie_id   ,
        restaurant_id :+restaurant_id ,
      image_url: req.file? req.file.path : null, // Assuming multer is configured similarly for repas images
    };

    const Repas = await prisma.Repas.create({
      data: repasData,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

// Function to update a meal
const modifierRepas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom, description, prix, image_url, categorie_id, restaurant_id } = req.body;

    const { error } = RepasSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ Erreur: "Invalid request body", details: error.details });
    }

    const existRepas = await prisma.repas.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existRepas) {
      return res.status(404).json({ Erreur: "Repas à mettre à jour non trouvé!" });
    }

    let updatedRepas = {
      nom,
      description,
      prix,
      image_url,
      categorie_id,
      restaurant_id,
    };

    const updatedRepasResult = await prisma.repas.update({
      where: {
        id: parseInt(id),
      },
      data: updatedRepas,
    });
    return res.status(200).json({ success: "Repas mis à jour avec succès", Repas: updatedRepasResult });
  } catch (error) {
    next(error);
  }
};

// Function to delete a meal
const supprimerRepas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existRepas = await prisma.repas.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existRepas) {
      return res.status(404).json({ Erreur: "Repas à supprimer non trouvé!" });
    }

    const deletedRepas = await prisma.repas.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({ success: "Repas supprimé avec succès" });
  } catch (error) {
    next(error);
  }
};
 module.exports = {
  afficherRepas,
  afficherRepasParId,
  ajouterRepas,
  modifierRepas,
  supprimerRepas
};
