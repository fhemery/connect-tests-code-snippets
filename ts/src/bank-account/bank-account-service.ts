import {BalanceManagementServiceInterface} from "./interfaces/balance-management-service";
import {Money} from "./money";
import {Converter, ConverterInterface} from "./converter";

export class BankAccountService {
  private converter: ConverterInterface;
  constructor(private balanceManager: BalanceManagementServiceInterface, _converter?: ConverterInterface) {
    this.converter = _converter || new Converter();
  }

  deposit(amountToDeposit: Money) {
    if (this.isValidAmount(amountToDeposit)) {
      throw new Error("Cannot deposit negative amount");
    }

    this.balanceManager.deposit(this.converter.convertToEuros(amountToDeposit));
  }

  withdraw(amountToWithdraw: Money) {
    if (this.isValidAmount(amountToWithdraw)) {
      throw new Error("Cannot withdraw negative amount");
    }

    const amountInEuros = this.converter.convertToEuros(amountToWithdraw);
    if(amountInEuros > this.balanceManager.getBalance()) {
        throw new Error("Cannot withdraw more than current balance");
    }
    this.balanceManager.withdraw(amountInEuros);
  }

  private isValidAmount(amountToDeposit: Money) {
    return amountToDeposit.amount < 0;
  }

}

