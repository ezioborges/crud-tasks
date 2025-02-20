import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
          .then(data => {
            this.#database = JSON.parse(data)
          })
          .catch(() => {
            this.#persist()
          })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }

    select(table) {
        let data = this.#database[table] ?? []        

        return data;
    }

    update(table, id, data) {
        let actualData = null
        const rowIndex = this.#database[table].findIndex(row =>{
            // pega a informação antiga
            if(row.id === id){
                actualData = row
                return true
            }
        })
        console.log("🚀 ~ Database ~ update ~ actualData:", actualData)
        console.log("🚀 ~ Database ~ update ~ rowIndex:", { ...actualData, ...data })

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { ...actualData, ...data }
            this.#persist()
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}