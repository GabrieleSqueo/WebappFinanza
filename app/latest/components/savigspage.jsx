import TransferToSavings from "./transfertosavings";

export default function SavingsPage({transactions, userId}) {

  const balance = transactions.reduce((balance, transaction) => {
    return transaction.type && transaction.category!=6 ? balance + transaction.amount : balance - transaction.amount;
  }, 0);

  const savingsBalance = transactions.reduce((balance, transaction) => {
    return transaction.category === 6 ? transaction.type  ? balance + transaction.amount : balance - transaction.amount : balance += 0;
  }, 0);

  return (
    <div className="p-6 min-h-full">
      <TransferToSavings
        userId= {userId}// Sostituisci con l'ID dell'utente loggato
        currentBalance={balance}
        savingsBalance={savingsBalance}
      />
    </div>
  );
}
