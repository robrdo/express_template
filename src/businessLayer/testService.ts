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
    update(object: Partial<T>): T
    create(object: T): T
    delete(id: T['id']): void
}

export class TestRepo implements IRepo<Test> {

    constructor(dbProvider?: DataProvider<Test>) {
        this._db = dbProvider ?? new DataProvider<Test>()
    }

    get(predicate?: Predicate<Test> | undefined): Test[] {
        return this._db.f
    }

    getOne(id: Number): Maybe<Test>
    getOne(predicate: Predicate<Test>): Maybe<Test>
    getOne(predicate: any): Maybe<Test> {
        return typeof predicate === 'function' ? this._db.find(predicate) : this._db.find(x => x.id === predicate)
    }

    update(object: Partial<Test>): Test {
        throw new Error("Method not implemented.")
    }
    create(object: Test): Test {
        throw new Error("Method not implemented.")
    }
    delete(id: Number): void {
        this._db
    }

    private readonly _db

}

export class DataProvider<T extends BaseEntity> {
    private readonly _db: T[] = []
    private readonly _dbIndices: Map<T['id'], T> = []


    public get db()
}