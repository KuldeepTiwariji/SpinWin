import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { mockUser, mockTransactions, type Transaction } from "@/lib/mockData";

export default function Wallet() {
  const [user, setUser] = useState(mockUser);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      const newTransaction: Transaction = {
        id: (transactions.length + 1).toString(),
        type: "deposit",
        amount: amount,
        description: "Manual deposit",
        date: new Date(),
        status: "completed"
      };

      setTransactions([newTransaction, ...transactions]);
      setUser({ ...user, balance: user.balance + amount });
      setDepositAmount("");
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= user.balance) {
      const newTransaction: Transaction = {
        id: (transactions.length + 1).toString(),
        type: "withdrawal",
        amount: -amount,
        description: "Manual withdrawal",
        date: new Date(),
        status: "completed"
      };

      setTransactions([newTransaction, ...transactions]);
      setUser({ ...user, balance: user.balance - amount });
      setWithdrawAmount("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit": return "fas fa-arrow-down text-green-500";
      case "withdrawal": return "fas fa-arrow-up text-red-500";
      case "bet": return "fas fa-dice text-blue-500";
      case "win": return "fas fa-trophy text-yellow-500";
      default: return "fas fa-circle";
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className=" p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds and view transaction history</p>
          </div>

          {/* Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <i className="fas fa-wallet text-3xl text-green-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-muted-foreground">Current Balance</h3>
              <p className="text-3xl font-bold text-green-500">${user.balance.toFixed(2)}</p>
            </Card>

            <Card className="p-6 text-center">
              <i className="fas fa-arrow-down text-3xl text-blue-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-muted-foreground">Total Deposits</h3>
              <p className="text-2xl font-bold">${user.totalDeposits.toFixed(2)}</p>
            </Card>

            <Card className="p-6 text-center">
              <i className="fas fa-arrow-up text-3xl text-purple-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-muted-foreground">Total Withdrawals</h3>
              <p className="text-2xl font-bold">${user.totalWithdrawals.toFixed(2)}</p>
            </Card>

            <Card className="p-6 text-center">
              <i className="fas fa-trophy text-3xl text-yellow-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-muted-foreground">Total Winnings</h3>
              <p className="text-2xl font-bold">${user.totalWinnings.toFixed(2)}</p>
            </Card>
          </div>

          {/* Deposit & Withdraw */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <i className="fas fa-plus-circle text-green-500 mr-2"></i>
                Deposit Funds
              </h3>
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
                <Button
                  onClick={handleDeposit}
                  className="w-full bg-green-500 hover:bg-green-600"
                  disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                >
                  <i className="fas fa-credit-card mr-2"></i>
                  Deposit
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <i className="fas fa-minus-circle text-red-500 mr-2"></i>
                Withdraw Funds
              </h3>
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <Button
                  onClick={handleWithdraw}
                  variant="destructive"
                  className="w-full"
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > user.balance}
                >
                  <i className="fas fa-money-bill-wave mr-2"></i>
                  Withdraw
                </Button>
              </div>
            </Card>
          </div>

          {/* Transaction History */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-history mr-2"></i>
              Transaction History
            </h3>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <i className={getTypeIcon(transaction.type)}></i>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date.toLocaleDateString()} at {transaction.date.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`font-bold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                    <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}