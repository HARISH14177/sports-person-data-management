import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Add a new referee
export const addReferee = async (req, res) => {
  const { name, gymId, eventId } = req.body;
  try {
    const referee = await prisma.referee.create({
      data: { name, gymId, eventId },
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
      include: { gym: true, event: true },
    });
    res.status(200).json(referees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch referees' });
  }
};


export const getRefereeById = async (req, res) => {
  const { id } = req.params;
  try {
    const referee = await prisma.referee.findUnique({
      where: { id: parseInt(id) },
      include: { gym: true, event: true },
    });
    if (!referee) return res.status(404).json({ error: 'Referee not found' });
    res.status(200).json(referee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch referee' });
  }
};


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
export const deleteRefereesByEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    await prisma.referee.deleteMany({
      where: { eventId: parseInt(eventId) }
    });
    res.json({ message: 'All referees for event deleted' });
  } catch (error) {
    console.error('Error deleting referees by event:', error);
    res.status(500).json({ error: 'Failed to delete referees' });
  }
};


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


export const getRefereesByEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const referees = await prisma.referee.findMany({
      where: { eventId: parseInt(eventId) }
    });
    res.status(200).json(referees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch referees for event' });
  }
};

