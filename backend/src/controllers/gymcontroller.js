import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create Gym
export const createGym = async (req, res) => {
  const { name, ownerName, coachName, address, pincode, phone } = req.body;
  try {
    const gym = await prisma.gym.create({
      data: { name, ownerName, coachName, address, pincode, phone },
    });
    res.status(201).json(gym);
  } catch (err) {
    res.status(500).json({ error: 'Gym creation failed', details: err.message });
  }
};

// Get All Gyms
export const getAllGyms = async (req, res) => {
  try {
    const gyms = await prisma.gym.findMany();
    res.json(gyms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gyms' });
  }
};

// Get Gym by ID
export const getGymById = async (req, res) => {
  const { id } = req.params;
  try {
    const gym = await prisma.gym.findUnique({ where: { id: parseInt(id) } });
    if (!gym) return res.status(404).json({ message: 'Gym not found' });
    res.json(gym);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gym' });
  }
};

// Update Gym
export const updateGym = async (req, res) => {
  const { id } = req.params;
  const { name, ownerName, coachName, address, pincode, phone } = req.body;
  try {
    const gym = await prisma.gym.update({
      where: { id: parseInt(id) },
      data: { name, ownerName, coachName, address, pincode, phone },
    });
    res.json(gym);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update gym', details: err.message });
  }
};

// Delete Gym
export const deleteGym = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.gym.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Gym deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete gym', details: err.message });
  }
};
 