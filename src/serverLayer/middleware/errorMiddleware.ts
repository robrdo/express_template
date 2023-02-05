import { Request, Response } from "express";

export default function errorMiddleware(error: Error, request: Request, response: Response, next: any) {
    let message = error.message || 'Something went wrong';

    if (response.headersSent) {
        return next(error);
    }

    response.status(500).send(message)
}