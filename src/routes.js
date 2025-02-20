import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'POST',
        url: buildRoutePath('/tasks'),
        handler: (req, res) => {
        const { task, description } = req.body

        const newTask = {
            id: randomUUID(),
            task,
            description
        }

        database.insert('tasks', newTask)

        return res.writeHead(201).end()
        }
    },
    {
        method: 'GET',
        url: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')

            return res.writeHead(200).end(JSON.stringify(tasks))
        }
    }, 
    {
        method: 'PUT',
        url: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { task, description } = req.body            

            database.update('tasks', id, {
                task,
                description
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        url: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;

            database.delete('tasks', id)

            return res.writeHead(200).end()
        } 
    }
]