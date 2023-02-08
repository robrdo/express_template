export interface Filter {
    fields: FilterField[]
    orderBy?: string[]
    orderDirection?: 'asc' | 'desc'
}

export type EqualsOp = {
    operationType: 'equals'
    value: string | number
}

export type GreaterThanOp = {
    operationType: 'greater_than'
    value: number
}

export type LesserThanOp = {
    operationType: 'lesser_than'
    value: number
}

export type ContainsOp = {
    operationType: 'contains'
    value: string
}

export type BetweenOp = {
    operationType: 'between'
    valueMin: number,
    valueMax: number
}

export type Operation =
    | EqualsOp
    | ContainsOp
    | BetweenOp
    | GreaterThanOp
    | LesserThanOp

export type OperationType = Operation['operationType']


export type FilterField = {
    name: string,
    operation: Operation,
}
