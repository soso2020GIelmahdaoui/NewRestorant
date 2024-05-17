const { PrismaClient } = require("@prisma/client");
const Joi = require('joi');

const prisma = new PrismaClient();

const afficherChefs = async (req, res, next) => {
  try {
    const chefs = await prisma.Chefs.findMany();

    if (!chefs) {
      return res
        .status(404)
        .json({ Erreur: "Aucun chef trouvé ! Ajoutez des chefs.." });
    }

    return res.status(200).json(chefs);
  } catch (error) {
    next(error);
  }
};

const afficherChefParId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const chef = await prisma.Chefs.findUnique({
      where: {
        id_chef: parseInt(id),
      },
      include: {
        restorant: true // Inclure les données du restaurant associé au chef
      }
    });

    if (!chef) {
      return res.status(404).json({ Erreur: "Chef non trouvé !" });
    }

    return res.status(200).json(chef);
  } catch (error) {
    next(error); 
  }
};

const ChefSchema = Joi.object({
  name_chef: Joi.string().max(80).required(),
  designation: Joi.string().max(255).required(),
  image: Joi.string().uri().required(), 
  facebook: Joi.string().uri().allow('').required(),
  twitter: Joi.string().uri().allow('').required(),
  instagram: Joi.string().uri().allow('').required(),
  id_restorant_fk: Joi.number().integer().required(),
});

const ajouterChef = async (req, res, next) => {
  try {

    const { error } = ChefSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ Erreur: error.details[0].message });
    }
    const chefData = {
    ...req.body,
      image: req.file? req.file.path : null, 
    };

    const Chef = await prisma.chefs.create({
      data: chefData,
    });
    return res.status(201).json({ success: "Chef ajouté avec succès", Chef });
  } catch (error) {
    next(error);
  }
};

const modifierChef = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { manager_restorant, city, address, telephone_restorant, email_restorant, branch, image } = req.body;

    // Validation des données reçues
    const { error } = ChefSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ Erreur: "Invalid request body", details: error.details });
    }

    const existChef = await prisma.chefs.findUnique({
      where: {
        id_chef: parseInt(id),
      },
    });

    if (!existChef) {
      return res.status(404).json({ Erreur: "Chef to update not found!" });
    }

    let updatedChef = {
      manager_restorant,
      city,
      address,
      telephone_restorant,
      email_restorant,
      branch,
    };

    if (image) {
      updatedChef.image = image; 
    }

    const updatedChefResult = await prisma.chefs.update({
      where: {
        id_chef: parseInt(id),
      },
      data: updatedChef,
    });
    return res.status(200).json({ success: "Chef updated successfully", Chef: updatedChefResult });
  } catch (error) {
    next(error);
  }
};

const supprimerchef = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existChef = await prisma.chefs.findUnique({
      where: {
        id_chef: parseInt(id),
      },
    });

    if (!existChef) {
      return res.status(404).json({ Erreur: "Chef to delete not found!" });
    }

    await prisma.chefs.delete({
      where: {
        id_chef: parseInt(id),
      },
    });
    return res.status(200).json({ success: "Chef deleted successfully" });
  } catch (error) {
    next(error); 
  }
};

module.exports = {
  afficherChefParId,
  afficherChefs,
  ajouterChef,
  modifierChef,
  supprimerchef
};
