
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { DollarSign, ArrowUpDown, TrendingUp, Wallet, Loader2 } from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  gameId?: string;
  status: string;
  createdAt: string;
}

interface WalletData {
  id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export default function Vault() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState([100]);
  const [withdrawAmount, setWithdrawAmount] = useState([50]);
  const [inputDeposit, setInputDeposit] = useState("100");
  const [inputWithdraw, setInputWithdraw] = useState("50");
  const [depositLoading, setDepositLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const { toast } = useToast();

  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/wallet", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const walletData = await response.json();
        setWallet(walletData);
      }
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/transactions", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const transactionsData = await response.json();
        setTransactions(transactionsData);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchWallet(), fetchTransactions()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleDepositSliderChange = (value: number[]) => {
    setDepositAmount(value);
    setInputDeposit(value[0].toString());
  };

  const handleWithdrawSliderChange = (value: number[]) => {
    setWithdrawAmount(value);
    setInputWithdraw(value[0].toString());
  };

  const handleDepositInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setInputDeposit(e.target.value);
    setDepositAmount([Math.min(Math.max(value, 1), 1000)]);
  };

  const handleWithdrawInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setInputWithdraw(e.target.value);
    setWithdrawAmount([Math.min(Math.max(value, 1), wallet?.balance || 0)]);
  };

  const handleDeposit = async () => {
    setDepositLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/wallet/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount: depositAmount[0] })
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Success",
          description: `Deposited $${depositAmount[0]} successfully!`,
        });
        await fetchWallet();
        await fetchTransactions();
      } else {
        throw new Error("Deposit failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deposit money",
        variant: "destructive",
      });
    } finally {
      setDepositLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!wallet || withdrawAmount[0] > wallet.balance) {
      toast({
        title: "Error",
        description: "Insufficient balance",
        variant: "destructive",
      });
      return;
    }

    setWithdrawLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount: withdrawAmount[0] })
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Success",
          description: `Withdrew $${withdrawAmount[0]} successfully!`,
        });
        await fetchWallet();
        await fetchTransactions();
      } else {
        throw new Error("Withdrawal failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to withdraw money",
        variant: "destructive",
      });
    } finally {
      setWithdrawLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const usdtBalance = wallet?.balance || 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">USDT Vault</h1>
          <p className="text-muted-foreground">Manage your USDT deposits and withdrawals</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Balance Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Wallet className="h-6 w-6" />
                  Balance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    ${usdtBalance.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">USDT Balance</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <div className="text-sm font-medium">
                      {transactions.filter(t => t.type === 'game_earning').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Games Played</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-sm font-medium">
                      ${transactions.filter(t => t.type === 'game_earning').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Deposit Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <ArrowUpDown className="h-6 w-6 rotate-180" />
                  Deposit USDT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Amount to Deposit</Label>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={inputDeposit}
                      onChange={handleDepositInputChange}
                      min="1"
                      max="1000"
                    />
                    <Slider
                      value={depositAmount}
                      onValueChange={handleDepositSliderChange}
                      max={1000}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$1</span>
                      <span className="font-medium text-primary">
                        ${depositAmount[0]}
                      </span>
                      <span>$1,000</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Deposit Amount:</span>
                    <span className="font-medium">${depositAmount[0]} USDT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Network Fee:</span>
                    <span className="font-medium">$0.50 USDT</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${(depositAmount[0] + 0.5).toFixed(2)} USDT</span>
                  </div>
                </div>
                <Button 
                  onClick={handleDeposit} 
                  disabled={depositLoading}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {depositLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Deposit USDT"
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Withdraw Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <ArrowUpDown className="h-6 w-6" />
                  Withdraw USDT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Amount to Withdraw</Label>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={inputWithdraw}
                      onChange={handleWithdrawInputChange}
                      min="1"
                      max={usdtBalance}
                    />
                    <Slider
                      value={withdrawAmount}
                      onValueChange={handleWithdrawSliderChange}
                      max={usdtBalance || 1}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$1</span>
                      <span className="font-medium text-primary">
                        ${withdrawAmount[0]}
                      </span>
                      <span>${usdtBalance.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Withdraw Amount:</span>
                    <span className="font-medium">${withdrawAmount[0]} USDT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Network Fee:</span>
                    <span className="font-medium">$1.00 USDT</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>You'll Receive:</span>
                    <span>${Math.max(withdrawAmount[0] - 1, 0).toFixed(2)} USDT</span>
                  </div>
                </div>
                <Button 
                  onClick={handleWithdraw} 
                  disabled={withdrawLoading || withdrawAmount[0] > usdtBalance}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {withdrawLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Withdraw USDT"
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No transactions yet. Start playing games to earn money!
                  </div>
                ) : (
                  transactions.slice(0, 10).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          tx.type === "deposit" || tx.type === "game_earning" 
                            ? "bg-green-100 text-green-600" 
                            : "bg-red-100 text-red-600"
                        }`}>
                          <ArrowUpDown className={`h-4 w-4 ${
                            tx.type === "deposit" || tx.type === "game_earning" 
                              ? "rotate-180" 
                              : ""
                          }`} />
                        </div>
                        <div>
                          <div className="font-medium">
                            {tx.type === "game_earning" ? "Game Earning" : 
                             tx.type === "deposit" ? "Deposit" : "Withdraw"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${
                          tx.type === "deposit" || tx.type === "game_earning" 
                            ? "text-green-600" 
                            : "text-red-600"
                        }`}>
                          {tx.type === "deposit" || tx.type === "game_earning" ? "+" : ""}${Math.abs(tx.amount)}
                        </div>
                        <div className={`text-sm ${
                          tx.status === "completed" ? "text-green-600" : "text-yellow-600"
                        }`}>
                          {tx.status}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
