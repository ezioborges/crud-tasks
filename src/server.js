import http from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

const database = new Database

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find((route) => {
        return route.method === method && route.url === url
    })

    if(route) {
        return route.handler(req, res)
    }

    return res.writeHead(404).end();
})

server.listen(3335)