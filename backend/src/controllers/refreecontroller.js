import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Add a new referee
export const addReferee = async (req, res) => {
  const { name, gymId, eventId } = req.body;

  try {
    const referee = await prisma.referee.create({
      data: {
        name,
        gymId,
        eventId,
      },
    });
    res.status(201).json({ message: 'Referee added successfully', data: referee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add referee' });
  }
};

// Get all referees
export const getAllReferees = async (req, res) => {
  try {
    const referees = await prisma.referee.findMany({
      include: {
        gym: true,
        event: true,
      },
    });
    res.status(200).json(referees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch referees' });
  }
};

// Get single referee
export const getRefereeById = async (req, res) => {
  const { id } = req.params;
  try {
    const referee = await prisma.referee.findUnique({
      where: { id: parseInt(id) },
      include: {
        gym: true,
        event: true,
      },
    });

    if (!referee) {
      return res.status(404).json({ error: 'Referee not found' });
    }

    res.status(200).json(referee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch referee' });
  }
};

// Update referee
export const updateReferee = async (req, res) => {
  const { id } = req.params;
  const { name, gymId, eventId } = req.body;

  try {
    const updated = await prisma.referee.update({
      where: { id: parseInt(id) },
      data: { name, gymId, eventId },
    });
    res.status(200).json({ message: 'Referee updated', data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update referee' });
  }
};

// Delete referee
export const deleteReferee = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.referee.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: 'Referee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete referee' });
  }
};
