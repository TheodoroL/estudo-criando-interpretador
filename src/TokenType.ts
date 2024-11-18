export enum TokenType { 
    NUMBER = "NUMBER",
    PLUS = "PLUS",
    MINUS = "MINUS",
    MULT  = "MULT",
    DIV = "DIV",
    
    LPARENT = "(", 
    RPARENT = ")",

    EOF = "EOF"
}

export class Token {
    public type: TokenType;
    public value: string | null;

    constructor(type: TokenType, value: string | null) {
        this.type = type;
        this.value = value;
    }

}