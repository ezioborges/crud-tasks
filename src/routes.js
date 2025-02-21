import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'POST',
        url: buildRoutePath('/tasks'),
        handler: (req, res) => {
        const { title, description } = req.body

        const created = new Date();

        const newTask = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: created,
            updated_at: null,
        }

        database.insert('tasks', newTask)

        return res.writeHead(201).end()
        }
    },
    {
        method: 'POST',
        url: buildRoutePath('/tasks/csv-tasks'),
        handler: (req, res) => {
            database.insertCSV('tasks')

            return res.writeHead(204).end()
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
            const { title, description } = req.body              
            
            database.update('tasks', id, {
                title,
                description,
                updated_at: new Date(),
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
    },
    {
        method: 'PATCH',
        url: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            console.log('aqui veio');
            

            database.complitedTask('tasks', id, {
                completed_at: new Date()
            })

            return res.writeHead(204).end()
        }
    }
]