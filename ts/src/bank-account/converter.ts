import {Money} from "./money";
import {SumInEuros} from "./interfaces/balance-management-service";
import {Currency} from "./currency";

export interface ConverterInterface {
    convertToEuros(amountToDeposit: Money): SumInEuros
}

export class Converter implements ConverterInterface {
  convertToEuros(amountToDeposit: Money): SumInEuros {
    // This function might get complex. We can even extract to a new class, call external webservice, etc...
    switch (amountToDeposit.currency) {
      case Currency.USD:
        return amountToDeposit.amount * 0.8;
      default:
        return amountToDeposit.amount;
    }
  }
}
