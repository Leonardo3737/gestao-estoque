import { TransactionTypeEnum } from '../enums/transaction-type.enum';

export function calculateNewStock(currentStock: number, transactionType: TransactionTypeEnum, transactionAmount: number): number {
  return transactionType === TransactionTypeEnum.INCOMING
    ? currentStock + transactionAmount
    : currentStock - transactionAmount;
}