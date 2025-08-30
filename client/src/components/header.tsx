import React from "react";
import { mockUser } from "@/lib/mockData";

function Header() {
  return (
    <header className="">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground gradient-text">SpinWin Dashboard</h2>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Wallet Balance</p>
            <p className="text-lg font-bold success-accent">
              ${mockUser.balance.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
              {mockUser.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {mockUser.name}
              </span>
              <span className="text-xs text-muted-foreground">
                VIP Member
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
export default Header;