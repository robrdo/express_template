import { MappedObject } from "../common"
import fs from 'fs/promises'

export class DataProvider {

    private static _wasInit = false
    private static _db: MappedObject[]
    private static _keys: Set<string>
    private static _indexedDb: Map<string, MappedObject[]> = new Map()


    static async initDb() {
        this._wasInit = true
        try {
            const data = await fs.readFile('neighborhoods_data.json', { encoding: 'utf-8' })
            this._db = JSON.parse(data)
            this._keys = new Set(this._db.flatMap(Object.keys))
            this._db.map(Object.entries)

            for (const item of this._db) {
                for (const [key, value] of Object.entries(item)) {
                    const res = this._indexedDb.get(key)
                    if (res) {
                        this._indexedDb.set(key, [...res, value])
                    }
                    else {
                        this._indexedDb.set(key, [value])
                    }
                }
            }
        }
        catch (err: any) {
            console.log(err)
            throw new Error('cannot init db')
        }
    }

    private constructor() {
    }

    public static get keys() {
        return this._keys
    }

    public static get indices() {
        return this._indexedDb
    }

    public static getDb(): MappedObject[] {
        if (!DataProvider._wasInit) {
            throw new Error("the db wasn't init")
        }

        //for pure immutability of db we can use instead deep clone of a db
        //JSON.parse(JSON.stringify(this._db))
        return this._db
    }
}
