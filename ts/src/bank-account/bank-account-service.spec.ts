import {BankAccountService} from "./bank-account-service";
import {BalanceManagementServiceInterface} from "./interfaces/balance-management-service";
import {Currency} from "./currency";
import {Money} from "./money";
import {ConverterInterface} from "./converter";

describe('Bank account service', () => {
    let balanceManager: BalanceManagementServiceInterface;
    let converter: ConverterInterface;
    let bankService: BankAccountService;

    beforeEach(() => {
        balanceManager = {} as BalanceManagementServiceInterface;
        converter = {} as ConverterInterface;
        bankService = new BankAccountService(balanceManager, converter);
    })

    describe('deposit', () => {
        it('should throw an error if amount is negative', () => {
            const amountToDeposit = new Money(-100, Currency.EUR);

            expect(() => bankService.deposit(amountToDeposit)).toThrowError();
        });

        it('should perform deposit if amount is positive and amount is in Euros', () => {
            balanceManager.deposit = jest.fn();
            converter.convertToEuros = jest.fn().mockImplementation((amountToDeposit: Money) => amountToDeposit.amount);

            const amountToDeposit = new Money(100, Currency.EUR);
            expect(() => bankService.deposit(amountToDeposit)).not.toThrowError();
            expect(balanceManager.deposit).toHaveBeenCalledWith(amountToDeposit.amount);
        });

        it('should perform conversion if money is not in the right currency', () => {
            balanceManager.deposit = jest.fn();
            converter.convertToEuros = jest.fn().mockReturnValue(80);

            const amountToDeposit = new Money(100, Currency.USD);
            expect(() => bankService.deposit(amountToDeposit)).not.toThrowError();
            expect(converter.convertToEuros).toHaveBeenCalledWith(amountToDeposit);
            expect(balanceManager.deposit).toHaveBeenCalledWith(80);
        });
    });

    describe('withdraw', () => {
        it('should throw an error if amount is negative', () => {
            const amountToWithdraw = new Money(-100, Currency.EUR);

            expect(() => bankService.withdraw(amountToWithdraw)).toThrowError();
        });

        it('should perform conversion if money is not in the right currency', () => {
            balanceManager.getBalance = jest.fn().mockReturnValue(200);
            balanceManager.withdraw = jest.fn();
            converter.convertToEuros = jest.fn().mockReturnValue(80);

            const amountToWithdraw = new Money(100, Currency.USD);
            expect(() => bankService.withdraw(amountToWithdraw)).not.toThrowError();
            expect(balanceManager.withdraw).toHaveBeenCalledWith(80);
        });

        it('should throw error if balance is not enough', () => {
            balanceManager.getBalance = jest.fn().mockReturnValue(50);
            balanceManager.withdraw = jest.fn();
            converter.convertToEuros = jest.fn().mockReturnValue(100);

            const amountToWithdraw = new Money(100, Currency.USD);
            expect(() => bankService.withdraw(amountToWithdraw)).toThrowError();
            expect(balanceManager.withdraw).not.toHaveBeenCalled();
        });
    })
});
