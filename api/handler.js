import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

export default {
  path: '/api',
  handler: app
}

app.post('/entries', async (req, res) => {
  const { title, text, email } = req.body
  const result = await prisma.guestbookEntry.create({
    data: {
      title,
      text,
      email
    }
  })
  res.json(result)
})

app.get('/entries', async (req, res) => {
  const entries = await prisma.guestbookEntry.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  res.json(entries)
})
