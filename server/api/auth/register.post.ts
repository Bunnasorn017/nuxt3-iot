import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return { message: 'User registered successfully', userId: user.id }
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: 'Error registering user',
    })
  }
})