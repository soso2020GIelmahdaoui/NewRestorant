const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require('joi');

const afficherCategories = async (req, res, next) => {
  try {
    const Categories = await prisma.Categorie.findMany();

    if (!Categories) {
      return res
        .status(404)
        .json({ Erreur: "Categorie not found ! add some Categories .." });
    }

    return res.status(200).json(Categories);
  } catch (error) {
    next(error);
  }
};

const afficherCategorieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Categorie = await prisma.Categories.findUnique({
      where: {
        id_category: parseInt(id),
      },
    });

    if (!Categorie) {
      return res.status(404).json({ Erreur: "Categorie not found!" });
    }

    return res.status(200).json(Categorie);
  } catch (error) {
    next(error);
  }
};

const CategorySchema = Joi.object({
  type_category: Joi.string().max(20).required(),
  description_category: Joi.string().max(45).required(),
});

const ajouterCategory = async (req, res, next) => {
  try {
    // Validation des données reçues
    const { error } = CategorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ Erreur: error.details[0].message });
    }

    const category = await prisma.categories.create({
      data: {
        type_category: req.body.type_category,
        description_category: req.body.description_category,
      },
    });
    return res.status(201).json({ success: "Category added successfully", category });
  } catch (error) {
    next(error);
  }
};

const modifierCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type_category, description_category } = req.body;

    // Validation des données reçues
    const { error } = CategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ Erreur: "Invalid request body", details: error.details });
    }

    const existCategory = await prisma.categories.findUnique({
      where: {
        id_category: parseInt(id),
      },
    });

    if (!existCategory) {
      return res.status(404).json({ Erreur: "Category to update not found!" });
    }

    const updatedCategory = await prisma.categories.update({
      where: {
        id_category: parseInt(id),
      },
      data: {
        type_category,
        description_category,
      },
    });
    return res.status(200).json({ success: "Category updated successfully", Category: updatedCategory });
  } catch (error) {
    next(error);
  }
};

const supprimerCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existCategory = await prisma.categories.findUnique({
      where: {
        id_category: parseInt(id),
      },
    });

    if (!existCategory) {
      return res.status(404).json({ Erreur: "Category to delete not found!" });
    }

    await prisma.categories.delete({
      where: {
        id_category: parseInt(id),
      },
    });
    return res.status(200).json({ success: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  afficherCategories,
  afficherCategorieById,
  ajouterCategory,
  modifierCategory,
  supprimerCategory
};
