import { Database } from "./database.js";


const database = new Database()

export const routes = [
    {
        method: 'POST',
        url: '/tasks',
        handler: (req, res) => {
            console.log('req');
        }
    }
]