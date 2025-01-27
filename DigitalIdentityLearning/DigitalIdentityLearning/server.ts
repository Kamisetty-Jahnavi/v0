import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { initializeSocket } from './lib/socket'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  const io = initializeSocket(server)

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000')
  })
})

