import { AreasRepo } from "../../businessLayer/areasRepo";
import { Request, Response } from "express";
import { TypedRequest } from "../common";
import { Filter } from "../../businessLayer/common";
import { filter } from "rxjs";

export default class AreaController {
    constructor(private _repo: AreasRepo) {

    }

    getAreas(req: TypedRequest<Filter>, res: Response) {
        const body = req.body
        if (!body || !validateBody(body)) {
            res.status(400).send('invalid body')
        }

        return this._repo.get(body)
    }
}

function validateBody(body: unknown): body is Filter {
    return !!body
}