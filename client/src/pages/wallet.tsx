
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { DollarSign, ArrowUpDown, TrendingUp, Wallet } from "lucide-react";

export default function Vault() {
  const [usdtBalance] = useState(1250.50);
  const [depositAmount, setDepositAmount] = useState([100]);
  const [withdrawAmount, setWithdrawAmount] = useState([50]);
  const [inputDeposit, setInputDeposit] = useState("100");
  const [inputWithdraw, setInputWithdraw] = useState("50");

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
    setWithdrawAmount([Math.min(Math.max(value, 1), usdtBalance)]);
  };

  const handleDeposit = () => {
    console.log("Depositing:", depositAmount[0], "USDT");
    // Add deposit logic here
  };

  const handleWithdraw = () => {
    console.log("Withdrawing:", withdrawAmount[0], "USDT");
    // Add withdraw logic here
  };

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
                    <div className="text-sm font-medium">+12.5%</div>
                    <div className="text-xs text-muted-foreground">This month</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-sm font-medium">$156.25</div>
                    <div className="text-xs text-muted-foreground">Total earned</div>
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
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Deposit USDT
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
                      max={usdtBalance}
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
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={withdrawAmount[0] > usdtBalance}
                >
                  Withdraw USDT
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
                {[
                  { type: "Deposit", amount: 500, date: "2024-01-15", status: "Completed" },
                  { type: "Withdraw", amount: 150, date: "2024-01-14", status: "Completed" },
                  { type: "Deposit", amount: 750, date: "2024-01-12", status: "Pending" },
                ].map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${tx.type === "Deposit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                        <ArrowUpDown className={`h-4 w-4 ${tx.type === "Deposit" ? "rotate-180" : ""}`} />
                      </div>
                      <div>
                        <div className="font-medium">{tx.type}</div>
                        <div className="text-sm text-muted-foreground">{tx.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${tx.type === "Deposit" ? "text-green-600" : "text-red-600"}`}>
                        {tx.type === "Deposit" ? "+" : "-"}${tx.amount}
                      </div>
                      <div className={`text-sm ${tx.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
