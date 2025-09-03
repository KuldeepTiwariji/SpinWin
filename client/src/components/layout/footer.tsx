import { Crown } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="text-primary text-2xl" />
              <span className="text-xl font-serif font-bold text-primary">Ashok Gaming</span>
            </div>
            <p className="text-muted-foreground">Experience the pinnacle of online gaming with our premium platform.</p>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-4">Games</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/games" className="hover:text-primary transition-colors">Poker</Link></li>
              <li><Link href="/games" className="hover:text-primary transition-colors">Slot Machines</Link></li>
              <li><Link href="/games" className="hover:text-primary transition-colors">Blackjack</Link></li>
              <li><Link href="/games" className="hover:text-primary transition-colors">Craps</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2 3a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3zm18 0H4v16h16V3zM6 11a2 2 0 1 1 4 0v2H8v-2zm4 0a4 4 0 1 0-8 0v2h2v6h4v-6h2v-2z"></path></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">© 2024 Ashok Gaming Gaming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
