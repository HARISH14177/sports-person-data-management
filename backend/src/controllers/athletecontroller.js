// controllers/athletecontroller.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createAthlete = async (req, res) => {
  try {
    const {
      name, dob, age, gender, weight,
      weightCategory, category, aadharNumber,
      mobile, eventId, gymId
    } = req.body;

    const photoUrl = req.files['photo'][0].filename;
    const aadharUrl = req.files['aadhar'][0].filename;

    const athlete = await prisma.athlete.create({
      data: {
        name,
        dob: new Date(dob),
        age: parseInt(age),
        gender,
        weight: parseFloat(weight),
        weightCategory,
        category,
        aadharNumber,
        mobile,
        photoUrl,
        aadharUrl,
        eventId: parseInt(eventId),
        gymId: parseInt(gymId)
      }
    });

    res.json(athlete);
  } catch (error) {
    console.error("Create Athlete Error:", error);
    res.status(500).json({ error: "Failed to create athlete" });
  }
};

export const getAllAthletes = async (req, res) => {
  try {
    const athletes = await prisma.athlete.findMany();
    res.json(athletes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch athletes" });
  }
};

export const getAthleteById = async (req, res) => {
  try {
    const athlete = await prisma.athlete.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    res.json(athlete);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch athlete" });
  }
};

export const updateAthlete = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      name, dob, age, gender, weight,
      weightCategory, category, aadharNumber,
      mobile, eventId, gymId
    } = req.body;

    const data = {
      name,
      dob: new Date(dob),
      age: parseInt(age),
      gender,
      weight: parseFloat(weight),
      weightCategory,
      category,
      aadharNumber,
      mobile,
      eventId: parseInt(eventId),
      gymId: parseInt(gymId)
    };

    if (req.files['photo']) {
      data.photoUrl = req.files['photo'][0].filename;
    }
    if (req.files['aadhar']) {
      data.aadharUrl = req.files['aadhar'][0].filename;
    }

    const updated = await prisma.athlete.update({
      where: { id },
      data
    });

    res.json(updated);
  } catch (error) {
    console.error("Update Athlete Error:", error);
    res.status(500).json({ error: "Failed to update athlete" });
  }
};

export const deleteAthlete = async (req, res) => {
  try {
    await prisma.athlete.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete athlete" });
  }
};
