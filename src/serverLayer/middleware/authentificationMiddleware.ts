import { NextFunction, Request, Response } from "express";

export default function errorMiddleware(request: Request, response: Response, next: NextFunction) {
    let token = request.headers.token;
    if (!token) {
        return response.sendStatus(401);
    }
    next();
}