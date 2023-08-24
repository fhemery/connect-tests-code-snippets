export type SumInEuros = number;

export interface BalanceManagementServiceInterface {
    getBalance(): SumInEuros;
    deposit(amountInEuros: SumInEuros): void;
    withdraw(amountInEuros: SumInEuros): void;
}


export class BalanceManager implements BalanceManagementServiceInterface {
    private balance: SumInEuros = 0;

    deposit(amountInEuros: SumInEuros): void {
        this.balance +=amountInEuros;
    }

    getBalance(): SumInEuros {
        return this.balance;
    }

    withdraw(amountInEuros: SumInEuros): void {
        this.balance -=amountInEuros;
    }
}
