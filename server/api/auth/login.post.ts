import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const user = await prisma.users.findUnique({ where: { email } })

  if (!user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' })

  return { token }
})