import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addDisciplines = async (req, res) => {
  try {
    const disciplines = ['Squat', 'Bench Press', 'Deadlift'];

    const result = await Promise.all(
      disciplines.map(name =>
        prisma.discipline.upsert({
          where: { name }, 
          update: {},
          create: { name },
        })
      )
    );

    res.status(201).json({ message: 'Disciplines added', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add disciplines' });
  }
};
// Assign disciplines to athlete
export const assignDisciplinesToAthlete = async (req, res) => {
  const { athleteId, disciplineIds } = req.body;

  try {
    const updatedAthlete = await prisma.athlete.update({
      where: { id: athleteId },
      data: {
        disciplines: {
          set: disciplineIds.map(id => ({ id }))
        }
      },
      include: { disciplines: true }
    });

    res.json({ message: 'Disciplines assigned to athlete.', athlete: updatedAthlete });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign disciplines to athlete.' });
  }
};

//  Assign disciplines to event
export const assignDisciplinesToEvent = async (req, res) => {
  const { eventId, disciplineIds } = req.body;

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        disciplines: {
          set: disciplineIds.map(id => ({ id }))
        }
      },
      include: { disciplines: true }
    });

    res.json({ message: 'Disciplines assigned to event.', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign disciplines to event.' });
  }
};

//  View all disciplines
export const getAllDisciplines = async (req, res) => {
  try {
    const disciplines = await prisma.discipline.findMany({
      include: {
        scores: true,
        athletes: true,
        events: true
      }
    });
    res.json(disciplines);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching disciplines.' });
  }
};
