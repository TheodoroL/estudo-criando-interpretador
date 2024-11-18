import { TokenType, Token} from "./TokenType";
import { Lexer } from "./Lexer";
export class Interpreter {
    private currentToken : Token | null;
    public lexer : Lexer; 

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.currentToken =this.lexer.getNextToken();
    }

    private errors(): void {
        throw new Error("Token inválido encontrado"); 
    }
    
    public eat(tokenType: TokenType): void {
        if (this.currentToken?.type === tokenType) {
            this.currentToken = this.lexer?.getNextToken();
        } else {
            console.error(`Erro: token esperado ${tokenType}, token atual ${this.currentToken?.type}`);
            this.errors();
        }
    }
    
    public factor(){
    const token : Token | null=  this.currentToken; 
        if( token?.type === TokenType.NUMBER){ 
            this.eat(TokenType.NUMBER); 
            return token?.value;

        } 
        else if(token?.type === TokenType.LPARENT){
            this.eat(TokenType.LPARENT);
            const result = this.expr();
            this.eat(TokenType.RPARENT);
            return result; 
        }   
        this.errors();
    }
    

    public term(): number | undefined {
      let result: number  =   Number (this.factor()); 
        while(this.currentToken?.type === TokenType.DIV || this.currentToken?.type  === TokenType.MULT){
            const token = this.currentToken ; 
            if(token.type === TokenType.MULT){
                this.eat(TokenType.MULT);
                result*= Number(this.factor());
            }
            else if ( token.type === TokenType.DIV){
                this.eat(TokenType.DIV);
                result/= Number(this.factor());

            }
        }
        return result;
    }

    public expr(): number {
       let result  = this.term()!; 
       while(this.currentToken?.type === TokenType.PLUS || this.currentToken?.type === TokenType.MINUS){
         const token = this.currentToken; 
         switch(token.type){
            case TokenType.PLUS:
                this.eat(TokenType.PLUS); 
                result+= Number(this.term()); 
                break; 
            case TokenType.MINUS: 
                this.eat(TokenType.MINUS);
                result-= Number(this.term());
                break;
            default: 
                this.errors();     
         }
       }
       return result;
    }
}