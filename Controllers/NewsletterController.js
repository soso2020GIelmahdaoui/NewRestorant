const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

const afficherNewsletters = async (req, res, next) => {
  try {
    const Newsletters = await prisma.Newsletter.findMany();

    if (!Newsletters || Newsletters.length === 0) {
      return res.status(404).json({ Erreur: "No newsletters found Add some newsletters.." });
    }

    return res.status(200).json(Newsletters);
  } catch (error) {
    next(error);
  }
};

const afficherNewsletterParId = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const Newsletter = await prisma.Newsletter.findUnique({
      where: {
        id_News: parseInt(id),
      },
    });

    if (!Newsletter) {
      return res.status(404).json({ Erreur: "Newsletter not found!" });
    }

    return res.status(200).json(Newsletter);
  } catch (error) {
    next(error);
  }
};

const createNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existEmail = await prisma.Newsletter.findFirst({
      where: { email },
    });

    if (existEmail) {
      return res.status(400).json({ Erreur: "Email already exists" });
    }

    const newsletter = await prisma.Newsletter.create({
      data: { email },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // Use true for port 465, false for all other ports
      auth: {
        user: "aprenant2@talents4starups.com",
        pass: "jBmm!mx8",
      },
    });

    await transporter.sendMail({
      from: "aprenant2@talents4starups.com",
      to: newsletter.email,
      subject: "Welcome to our Newsletter!",
      text: "Thank you for subscribing to our newsletter. You will now receive regular updates from us.",
    });

    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

const updateNewsletter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const updatedNewsletter = await prisma.Newsletter.update({
      where: { id_News: parseInt(id) },
      data: { email },
    });

    return res.status(200).json(updatedNewsletter);
  } catch (error) {
    next(error);
  }
};

const supprimerNewsletter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existNewsletter = await prisma.Newsletter.findUnique({
      where: {
        id_News: parseInt(id),
      },
    });

    if (!existNewsletter) {
      return res.status(404).json({ Erreur: "Newsletter to delete not found!" });
    }

    const deletedNewsletter = await prisma.Newsletter.delete({
      where: {
        id_News: parseInt(id),
      },
    });
    return res.status(200).json({ success: "Newsletter deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  afficherNewsletters,
  afficherNewsletterParId,
  createNewsletter,
  updateNewsletter,
  supprimerNewsletter
};
