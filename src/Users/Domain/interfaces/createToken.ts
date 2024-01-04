import { Token } from "../valueObjects/Token";

export interface ICreateToken {
    createToken(): Token;
    createEmptyToken(): Token;
}