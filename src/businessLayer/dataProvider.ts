import { MappedObject } from "../common"
import fs from 'fs/promises'

export class DataProvider {

    private static _wasInit = false
    private static _db: MappedObject[]
    private static _keys: Set<string>
    private static _indexedDb: Map<string, MappedObject> = new Map()


    static async initDb() {
        this._wasInit = true
        try {
            const data = await fs.readFile('neighborhoods_data.json', { encoding: 'utf-8' })
            this._db = JSON.parse(data)
            this._keys = new Set(this._db.flatMap(Object.keys))
            //todo: finish
            //             for (const item of this._db){
            // Object.entries
            //             }
            //             this._indexedDb = new Map(this._db.map([]))
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

    public static getDb(): MappedObject[] {
        if (!DataProvider._wasInit) {
            throw new Error("the db wasn't init")
        }

        //for pure immutability of db we can use instead deep clone of a db
        //JSON.parse(JSON.stringify(this._db))
        return this._db
    }
}
