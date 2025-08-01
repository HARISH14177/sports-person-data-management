import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  const { name, email, age, mobileNumber, address } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        age: parseInt(age),
        mobileNumber,
        address,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('[RegisterUserError]', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


