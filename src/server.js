import http from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'


const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find((route) => {
        return route.method === method && route.url.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.url)

        req.params = { ...routeParams.groups }

        return route.handler(req, res)
    }

    return res.writeHead(404).end();
})

server.listen(3335)