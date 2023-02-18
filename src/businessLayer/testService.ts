//work with date range play

//write simple product orders app!

export type Maybe<T> = T | undefined

export interface BaseEntity {
    id: Number,
}

export interface Test extends BaseEntity {
    value: string
    date: Date
    count: Number
}

export type Predicate<T> = (item: T) => boolean

interface IRepo<T extends BaseEntity> {
    get(predicate?: Predicate<T>): T[]
    getOne(id: T['id']): Maybe<Test>
    getOne(predicate: Predicate<T>): Maybe<T>
    update(object: Partial<T>): void
    create(object: T): T
    delete(object: T): void
}

export class TestRepo implements IRepo<Test> {

    private readonly _dbProvider: DataProvider<Test>

    constructor(dbProvider?: DataProvider<Test>) {
        this._dbProvider = dbProvider ?? new DataProvider<Test>()
    }

    get(predicate?: Predicate<Test> | undefined): Test[] {
        return predicate ? this._dbProvider.db.filter(predicate) : this._dbProvider.db
    }

    getOne(id: Number): Maybe<Test>
    getOne(predicate: Predicate<Test>): Maybe<Test>
    getOne(predicate: any): Maybe<Test> {
        return typeof predicate === 'function' ? this._dbProvider.db.find(predicate) : this._dbProvider.db.find(x => x.id === predicate)
    }

    update(object: Partial<Test>): void {
        this._dbProvider.update(object)
    }

    create(object: Test): Test {
        return this._dbProvider.add(object)
    }
    delete(object: Test): void {
        this._dbProvider.delete(object)
    }
}

export class DataProvider<T extends BaseEntity> {
    private readonly _db: T[] = []
    private readonly _dbIndices: Map<T['id'], [T, number]> = [, [,]]

    public get db() {
        return this._db
    }

    public get dbIndices() {
        return this._dbIndices
    }

    public add(obj: T): T {
        this._db.push(obj)
        this._dbIndices.set(obj.id, [obj, this._db.length - 1])
        obj.id = this.nextId
        return obj
    }

    public update(obj: Partial<T> & { id: number }) {
        const res = this._dbIndices.get(obj.id)?.[0]
        if (!res) {
            return
        }
        for (const [key, value] of Object.entries(obj)) {
            res[key] = value
        }
    }

    public delete(obj: T) {
        const res = this._dbIndices.get(obj.id)
        this._db.splice(res![1], 1)
        this._dbIndices.delete(obj.id)
    }

    private _id = 1

    private get nextId() {
        return ++this._id
    }
}


//today fetch some api, filter by it

//TODO: implement proxy provider for array  but first implement products