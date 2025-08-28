import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const isCategoryEligible = ({ age, weight, gender, category }) => {
  const male = gender.toLowerCase() === 'male';
  const female = gender.toLowerCase() === 'female';

  switch (category.toLowerCase()) {
    case 'sub junior':
      return age >= 14 && age <= 18 && (
        (male && weight <= 53) || (female && weight <= 43)
      );

    case 'junior':
      return age >= 19 && age <= 23 && (
        (male && weight >= 54 && weight <= 59) ||
        (female && weight >= 44 && weight <= 47)
      );

    case 'senior':
      return age >= 24 && age <= 39 && (
        (male && weight >= 60 && weight <= 66) ||
        (female && weight >= 48 && weight <= 52)
      );

    case 'master 1':
      return age >= 40 && age <= 49 && (
        (male && weight >= 67 && weight <= 74) ||
        (female && weight >= 53 && weight <= 57)
      );

    case 'master 2':
      return age >= 50 && age <= 59 && (
        (male && weight >= 75 && weight <= 83) ||
        (female && weight >= 58 && weight <= 63)
      );

    case 'master 3':
      return age >= 60 && age <= 69 && (
        (male && weight >= 84 && weight <= 93) ||
        (female && weight >= 64 && weight <= 69)
      );

    case 'master 4':
      return age >= 70 && age <= 79 && (
        (male && weight >= 94 && weight <= 105) ||
        (female && weight >= 70 && weight <= 76)
      );

    case 'master 5':
      return age >= 80 && age <= 99 && (
        (male && (weight >= 106 && weight <= 120 || weight > 120)) ||
        (female && (weight >= 77 && weight <= 84 || weight > 84))
      );

    default:
      return false;
  }
};


export const createAthlete = async (req, res) => {
  try {
    const {
      name, dob, age, gender, weight,
      weightCategory, category, aadharNumber,
      mobile, eventId, gymId
    } = req.body;

    const parsedAge = parseInt(age);
    const parsedWeight = parseFloat(weight);

    const eligible = isCategoryEligible({ age: parsedAge, weight: parsedWeight, gender, category });
    if (!eligible) {
      return res.status(400).json({ error: "Athlete does not meet category eligibility requirements" });
    }

     const photoUrl = req.files['photo'] ? req.files['photo'][0].filename : null;
const aadharUrl = req.files['aadhar'] ? req.files['aadhar'][0].filename : null;


    const athlete = await prisma.athlete.create({
  data: {
    name,
    dob: new Date(dob),
    age: parsedAge,
    gender,
    weight: parsedWeight,
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

    const parsedAge = parseInt(age);
    const parsedWeight = parseFloat(weight);

    const eligible = isCategoryEligible({ age: parsedAge, weight: parsedWeight, gender, category });
    if (!eligible) {
      return res.status(400).json({ error: "Athlete does not meet category eligibility requirements" });
    }

    const data = {
      name,
      dob: new Date(dob),
      age: parsedAge,
      gender,
      weight: parsedWeight,
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
    res.status(500).json({ error: "Failed to delete athlete"});
}
};