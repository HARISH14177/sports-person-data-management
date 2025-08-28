import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createScore = async (req, res) => {
  const { athleteId, disciplineId, eventId, trial1, trial2, trial3 } = req.body;

  try {
    
    if (!(trial1 < trial2 && trial2 < trial3)) {
      return res.status(400).json({
        error: 'Trial values must be increasing: trial1 < trial2 < trial3',
      });
    }

    const maxLift = Math.max(trial1, trial2, trial3);
    const score = await prisma.score.create({
      data: {
        athleteId,
        disciplineId,
        eventId,
        trial1,
        trial2,
        trial3,
        maxLift,
      },
    });
    res.status(201).json(score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Get All Scores
export const getAllScores = async (req, res) => {
  try {
    const scores = await prisma.score.findMany({
      include: {
        athlete: true,
        discipline: true,
        event: true,
      },
    });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Get Score By ID
export const getScoreById = async (req, res) => {
  const { id } = req.params;

  try {
    const score = await prisma.score.findUnique({
      where: { id: parseInt(id) },
      include: {
        athlete: true,
        discipline: true,
        event: true,
      },
    });

    if (!score) return res.status(404).json({ error: 'Score not found' });
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Update Score
export const updateScore = async (req, res) => {
  const { id } = req.params;
  const { trial1, trial2, trial3 } = req.body;

  try {
    // ✅ Check trial order
    if (!(trial1 < trial2 && trial2 < trial3)) {
      return res.status(400).json({
        error: 'Trial values must be increasing: trial1 < trial2 < trial3',
      });
    }

    const maxLift = Math.max(trial1, trial2, trial3);
    const score = await prisma.score.update({
      where: { id: parseInt(id) },
      data: {
        trial1,
        trial2,
        trial3,
        maxLift,
      },
    });
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Delete Score
export const deleteScore = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.score.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Score deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
