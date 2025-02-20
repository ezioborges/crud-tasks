import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database()

export const routes = [
    {
        method: 'POST',
        url: '/tasks',
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
        url: '/tasks',
        handler: (req, res) => {
            const tasks = database.select('tasks')
            console.log("🚀 ~ tasks:", tasks)

            return res.writeHead(200).end(JSON.stringify(tasks))
        }
    }
]