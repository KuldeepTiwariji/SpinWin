import { motion } from "framer-motion";
import SpinWheel from "@/components/ui/spin-wheel";
import { Card, CardContent } from "@/components/ui/card";

export default function SpinWheelPage() {
  const prizeInfo = [
    { color: "bg-yellow-500", name: "Golden Bonus", credits: "1000 Credits" },
    { color: "bg-red-500", name: "Lucky Seven", credits: "777 Credits" },
    { color: "bg-green-500", name: "Jackpot", credits: "5000 Credits" },
    { color: "bg-blue-500", name: "Mega Win", credits: "2500 Credits" }
  ];

  const handleSpin = (prize: any) => {
    console.log("Prize won:", prize);
    // Here you could send the result to the backend
    // apiRequest("POST", "/api/spin", { prize: prize.name, credits: prize.credits });
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          className="text-5xl font-serif font-bold text-primary mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-testid="spin-wheel-title"
        >
          Spin Wheel of Fortune
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="spin-wheel-description"
        >
          Try your luck and win amazing prizes!
        </motion.p>
        
        {/* Spin Wheel Component */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SpinWheel onSpin={handleSpin} />
        </motion.div>

        {/* Prize Information */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          data-testid="prize-info-grid"
        >
          {prizeInfo.map((prize, index) => (
            <Card key={prize.name} className="bg-card rounded-xl border border-border">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 ${prize.color} rounded-full mx-auto mb-4`}></div>
                <h3 className="font-semibold text-primary mb-2">{prize.name}</h3>
                <p className="text-sm text-muted-foreground">{prize.credits}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
