import { Filter, Operation, OperationType } from "./common"
import { DataProvider } from "./dataProvider"

type Action = {
    name: string,
    action: (value: any) => boolean
}

export class AreasRepo {
    private readonly _db = DataProvider.getDb()
    private readonly _keys = DataProvider.keys
    private readonly _indices = DataProvider.indices

    get(filter: Filter) {
        const actions: Action[] = []
        for (const field of filter.fields) {
            actions.push({
                name: field.name,
                action: (value) => {
                    switch (field.operation.operationType) {
                        case "equals":
                            return value === field.operation.value
                        default: return false
                    }
                }
            })
        }

        //!!or index with Map<key, object[]>

        let anotherRes = this._db
        for (const action of actions) {
            const temp = []
            if (!this._keys.has(action.name)) {
                continue
            }

            for (const item of anotherRes) {
                if (action.action(item[action.name])) {
                    temp.push(item)
                }
            }

            anotherRes = temp
        }

        // let spareRes = this._indices
        // for (const action of actions) {
        //     if (this._indices.){

        //     }
        // }



        const res = []

        for (const obj of this._db) {
            let isMatch = true
            for (const action of actions) {
                if (!(action.name in obj)) {
                    isMatch = false
                    break
                }

                if (!action.action(obj[action.name])) {
                    isMatch = false
                    break
                }
            }

            if (isMatch) {
                res.push(obj)
            }
        }

        const orderBy = filter.orderBy
        const orderDirection = filter.orderDirection ?? 'asc'

        return orderBy
            ? res.sort((a, b) => {
                const left = orderDirection === 'asc' ? a : b
                const right = orderDirection === 'asc' ? b : a

                for (const [, order] of orderBy.entries()) {
                    if (left[order] === right[order]) {
                        continue
                    }

                    return left[order] < right[order] ? -1 : 1
                }
                return 0
            })
            : res
    }


}
