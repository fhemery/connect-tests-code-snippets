import { BalanceManagementServiceInterface } from "./interfaces/balance-management-service";

export class BankAccountService {
  constructor(private balanceManager: BalanceManagementServiceInterface) {}
}
