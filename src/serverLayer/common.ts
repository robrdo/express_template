import { Request } from "express";

export type TypedRequest<T> = Request<any, any, T, any>