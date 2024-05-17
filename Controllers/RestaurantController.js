const { PrismaClient } = require("@prisma/client");
const Joi = require('joi');

const prisma = new PrismaClient();

const afficherRestaurant = async (req, res, next) => {
  try {
    const Restorants = await prisma.Restorant.findMany();

    if (!Restorants) {
      return res
        .status(404)
        .json({ Erreur: "restorant not found ! add some Restorants .." });
    }

    return res.status(200).json(Restorants);
  } catch (error) {
    next(error);
  }
};

const afficherRestorantsById = async (req, res, next) => {
  try {
    const { id} = req.params; 
    
    const Restorant = await prisma.Restorant.findUnique({
      where: {
        idClients: parseInt(id ), 
      },
    });

    if (!Restorant) {
      return res.status(404).json({ Erreur: "Restorant not found!" });
    }

    return res.status(200).json(Restorant);
  } catch (error) {
    next(error); 
  }
};

const RestorantSchema = Joi.object({
  manager_restorant: Joi.string().max(80).required(),
  city: Joi.string().max(100).required(),
  address: Joi.string().required(),
  telephone_restorant: Joi.string().max(12).required(),
  email_restorant: Joi.string().email().max(100).required(),
  branch: Joi.string().max(100).required(),
});

const ajouterRestorant = async (req, res, next) => {
  try {
    const { error } = RestorantSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ Erreur: error.details[0].message });
    }

    const Restorant = await prisma.restorant.create({
      data: {
        manager_restorant: req.body.manager_restorant,
        city: req.body.city,
        address: req.body.address,
        telephone_restorant: req.body.telephone_restorant,
        email_restorant: req.body.email_restorant,
        branch: req.body.branch,
      },
    });
    return res.status(201).json({ success: "Restorant added successfully", Restorant });
  } catch (error) {
    next(error);
  }
};

const modifierRestorant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { manager_restorant, city, address, telephone_restorant, email_restorant, branch } = req.body;

    const { error } = RestorantSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ Erreur: "Invalid request body", details: error.details });
    }

    const existRestorant = await prisma.Restorant.findUnique({
      where: {
        id_resto: parseInt(id),
      },
    });

    if (!existRestorant) {
      return res.status(404).json({ Erreur: "Restorant to update not found!" });
    }

    const updatedRestorant = await prisma.Restorant.update({
      where: {
        id_resto: parseInt(id),
      },
      data: {
        manager_restorant,
        city,
        address,
        telephone_restorant,
        email_restorant,
        branch,
      },
    });
    return res.status(200).json({ success: "Restorant updated successfully", Restorant: updatedRestorant });
  } catch (error) {
    next(error);
  }
};

const supprimerRestorant = async (req, res, next) => {
  try {
    const { id} = req.params;
    const existRestorant = await prisma.Restorant.findUnique({
      where: {
        id_resto: parseInt(id),
      },
    });

    if (!existRestorant) {
      return res.status(404).json({ Erreur: "Restorant to delete not found!" });
    }

    const Restorant = await prisma.Restorant.delete({
      where: {
        id_resto  : parseInt(id ),
      },
    });
    return res.status(200).json({ success: "Restorant deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  afficherRestaurant,
  afficherRestorantsById,
  ajouterRestorant,
  modifierRestorant,
  supprimerRestorant
};
