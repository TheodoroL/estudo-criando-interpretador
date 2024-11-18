import { Token, TokenType } from "./TokenType";

export class Lexer {
    public text: string;
    public pos: number;
    public currentChar: string | null;

    constructor(text: string) {
        this.text = text;
        this.pos = 0;
        this.currentChar = text[this.pos];
    }

    private errors(): void {
        throw new Error("sintaxe invalida");
    }

    public advance() {
        this.pos++;
        if (this.pos > this.text.length - 1) {
            this.currentChar = null;
        } else {
            this.currentChar = this.text[this.pos];
        }
    }

    private skipWhiteSpace() {
        while (this.currentChar !== null && this.currentChar === " ") {
            this.advance();
        }
    }

    private isNumber(): string {
        let result: string = "";
        while (this.currentChar !== null && !isNaN(Number(this.currentChar)) || this.currentChar=== ".") {
            result += this.currentChar;
            this.advance();
        }
        return result;
    }

    public getNextToken(): Token | null {
        while (this.currentChar !== null) {
            if (this.currentChar === " ") {
                this.skipWhiteSpace();
                continue;
            }
    
            if (!isNaN(Number(this.currentChar))) {
                return new Token(TokenType.NUMBER, this.isNumber());
            }else{
                switch(this.currentChar){
                    case "+":
                      this.advance();
                      return new Token(TokenType.PLUS, "+");
                    case "-":
                        this.advance();
                        return new Token(TokenType.MINUS, "-");
                    case  "*":
                        this.advance();
                        return new Token(TokenType.MULT, "*");

                    case "/":
                        this.advance();
                        return new Token(TokenType.DIV, "/");

                    case "(": 
                        this.advance(); 
                        return new Token(TokenType.LPARENT, "(");

                    case ")":
                        this.advance(); 
                        return new Token(TokenType.RPARENT, ")");
                    default: 
                        this.errors();
                    }
                }
            }
            return new Token(TokenType.EOF, null);
    }
}