import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'POST',
        url: buildRoutePath('/tasks'),
        handler: (req, res) => {
        const { title, description, updated_at } = req.body

        const created = new Date();

        const newTask = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: created,
            updated_at,
        }
        console.log("🚀 ~ newTask:", newTask)

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
            const { title, description, completed_at } = req.body  
            
            console.log('put ===> ', req.params);
            
            
            database.update('tasks', id, {
                title,
                description,
                completed_at,
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
    }
]