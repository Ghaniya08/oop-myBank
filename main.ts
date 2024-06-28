#! /usr/bin/env node

import inquirer from "inquirer";
import chalk  from "chalk";
interface BankAccount{
    firstName : string,
    lastName : string,
    Gender : string,
    age : number,
    mobileNumber : number,
    account : BankOptions
}
class BankAccount implements BankAccount{
    firstName: string;
    lastName: string;
    Gender: string;
    age: number;
    mobileNumber: number;
    account: BankOptions;

    constructor(firstName :string , lastName: string , Gender: string , age: number , mobileNumber: number ,account: BankOptions){
        this.firstName = firstName ; 
        this.lastName = lastName ; 
        this.Gender = Gender ; 
        this.mobileNumber =  mobileNumber;
        this.age = age;
        this.account = account;
    }
}

interface BankOptions {
    balance : number,
    accountNumber : number,
    debit (amount : number) : void
    credit (amount : number): void
    checkbalance(amount :number ): void
    viewInfo(amount : number): void
}

class BankOptions implements BankOptions {
    accountNumber: number;
    balance: number;
    constructor (accountNumber : number , balance : number){
        this.accountNumber = accountNumber ; 
        this.balance = balance
    }
    viewInfo(amount: number):void{

    }

    debit(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount
            console.log("__________________________________________________________________________________________")
            console.log(chalk.italic.blue(`${amount} debit successful. Remaining balance is PKR ${this.balance}`));
            console.log("__________________________________________________________________________________________")
        }
        else {
            console.log("Insufficent balance.");
            process.exit()
        }
    }

    credit(amount: number): void {
        if (amount > 100 ){
            amount -= 1;
        } this.balance += amount;
        console.log("__________________________________________________________________________________________")
        console.log(chalk.italic.blue(` ${amount} credit successful . Remaining balance is PKR ${this.balance}`));
        console.log("__________________________________________________________________________________________")
    }

    checkbalance( ): void {
        console.log("__________________________________________________________________________________________")
        console.log(chalk.italic.blue(`Current balance is : PKR ${this.balance}`));
        console.log("__________________________________________________________________________________________")
    }
}

console.log("__________________________________________________________________________________________")
console.log(chalk.italic.yellow.bold("\n\t\t\t\t Welcome to the Project # 12 \t\t\t\t\t\n "))
console.log(chalk.italic.yellow.bold("\t\t\t\t\t OOP MY BANK \t\t\t\t"));
console.log(chalk.italic.magenta.bold("\nThere are 4 user accounts and account numbers are \n1011 \n4210 \n2345 \n3456 "))
console.log("__________________________________________________________________________________________")
let account :BankOptions [] = [
    new BankOptions ( 1011 , 5000 ),
    new BankOptions ( 4210 , 8000 ),
    new BankOptions ( 2345 , 7000 ),
    new BankOptions ( 3456 , 4000 ),
]
let customers : BankAccount [] = [
    new BankAccount ("Radiya" , "khan" , "Female" , 19 , 33232280476 , account[0]),
    new BankAccount ("Ghaniya" , "khan" , "Female" , 17 , 33231180476 , account[1]),
    new BankAccount ("Taha" , "khan" , "Male" , 18 , 33231080476 , account[2]),
    new BankAccount ("Arooba" , "khan" , "Female" , 16 , 33238880476 , account[3])
] 
async function ser ( ) {
    do{
        let accountNumber = await inquirer.prompt({
            name: "acountnum" , 
            type: "number" , 
            message :  chalk.italic.green("Enter your account number:")
        })
        let cus = customers.find(cus => cus.account.accountNumber === accountNumber.acountnum )
        if(cus){
            console.log("__________________________________________________________________________________________")
            console.log(chalk.italic.yellow(`\n Asalamoalikum ${cus.firstName} ${cus.lastName} \n `));
            console.log("__________________________________________________________________________________________")
            let qWhttoDo = await inquirer.prompt([{
                name: "Select" , 
                type: "list", 
                message : chalk.italic.green("Select the option whatever you want to do"),
                choices : [ "Debit" , "Credit"  , "Check Balance" ,"View info", "Exit"]
            }]);
           
            switch (qWhttoDo.Select){
                case "Debit":
                    let debitAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message:  chalk.italic.magenta("Enter the amount to Debit : ")
                    })
                    cus.account.debit(debitAmount.amount)
                    break;
                    case "View info" :
                        let viewAns = await inquirer.prompt([{
                            name: "viewWala",
                            type: "number",
                            message: chalk.italic.blue("Enter user account number to view their info :")
                        }]);
                        if(viewAns.viewWala === 1011){
                            console.log(customers[0]);
                         }
                        else if (viewAns.viewWala === 4210){
                            console.log(customers[1]);
                        }
                        else if ( viewAns.viewWala === 2345){
                            console.log(customers[2]);
                        }
                          else {
                            console.log(customers[3]);
                        };
                        cus.account.viewInfo(viewAns.amount)
                        break;
                    case "Credit":
                        let creditAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: chalk.italic.magenta("Enter the amount to credit : ")
                        })
                        cus.account.credit(creditAmount.amount)
                        break;
                    case "Check Balance":
                            cus.account.checkbalance();
                        break;
                    case "Exit" :
                        console.log("__________________________________________________________________________________________") 
                        console.log( chalk.italic.red("Exiting ..."));
                        console.log( chalk.italic.yellow("Thanks for coming💖"));
                        console.log("__________________________________________________________________________________________")
                    return;

                        
            }
            
            
        }
        else{
            console.log("__________________________________________________________________________________________")
            console.log( chalk.italic.red("Incorrect account number 😟.") )
            console.log(chalk.italic.magenta( "Enter correct account number and try again: 😊"))
            console.log("__________________________________________________________________________________________")
            process.exit()
        }
    }while(true)
}
ser()