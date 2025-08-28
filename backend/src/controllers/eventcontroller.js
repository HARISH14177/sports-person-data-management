import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createEvent = async (req, res) => {
  const { name, location, date, time, organiserGymId } = req.body;

  try {
    const event = await prisma.event.create({
      data: {
        name,
        location,
        date: new Date(date),
        time,
        organiserGymId,
      },
      include: {
        organiserGym: true,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    console.error('Create Event Error:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};


export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        organiserGym: true,
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get events' });
  }
};


export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        organiserGym: true,
        disciplines: true,
        athletes: true,
        referees: true,
        scores: true,
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get event' });
  }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, location, date, time, organiserGymId } = req.body;
  
    try {
      const updatedEvent = await prisma.event.update({
        where: { id: parseInt(id) },
        data: {
          name,
          location,
          date: new Date(date),
          time,
          organiserGymId,
        },
        include: {
          organiserGym: true,
        },
      });
      res.json(updatedEvent);
    } catch (error) {
      console.error('Update Event Error:', error);
      res.status(500).json({ error: 'Failed to update event' });
    }
  };
export const deleteEvent = async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.event.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Delete Event Error:', error);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  };
    
