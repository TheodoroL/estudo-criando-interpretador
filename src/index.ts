import readline from "node:readline/promises"; 
import { stdin, stdout } from "node:process"; 
import { Interpreter } from "./Interpreter";
import { Lexer } from "./Lexer";
const r1 = readline.createInterface({ input: stdin, output: stdout });

async function main() {
    while (true) {
        try {
            const value: string = await r1.question("-> "); 

            if (!value) {
                console.log("Encerrando...");
                r1.close();
                break;
            }
            const lexer = new Lexer(value.replace(/\s+/g, "")); 
            console.log(lexer); 
            const interpreter  = new Interpreter(lexer); 
            const result = interpreter.expr();
            console.log(result); 
        } catch (e) {
            console.error(e); 
        }
    }
}

main();
