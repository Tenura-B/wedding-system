import { Link } from "react-router-dom";
import { Heart, Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 pt-20 pb-10 border-t border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                <Heart className="h-4 w-4 fill-current" />
              </div>
              <span className="text-xl font-serif tracking-tight text-black">
                Belle Vows
              </span>
            </Link>
            <p className="text-[16px] text-muted-foreground leading-relaxed max-w-xs">
              Empowering couples to share their love story through breathtaking digital experiences and premium vendor connections.
            </p>
            <div className="flex gap-4">
               <a href="#" className="p-2 rounded-full border border-neutral-200 text-neutral-400 hover:text-black hover:border-black transition-all">
                  <Instagram className="h-4 w-4" />
               </a>
               <a href="#" className="p-2 rounded-full border border-neutral-200 text-neutral-400 hover:text-black hover:border-black transition-all">
                  <Facebook className="h-4 w-4" />
               </a>
               <a href="#" className="p-2 rounded-full border border-neutral-200 text-neutral-400 hover:text-black hover:border-black transition-all">
                  <Twitter className="h-4 w-4" />
               </a>
            </div>
          </div>

          <div>
             <h4 className="font-bold text-[16px] uppercase tracking-widest mb-6">Platform</h4>
             <ul className="space-y-4">
                <li><Link to="/templates" className="text-[16px] text-muted-foreground hover:text-black transition-colors">Digital Templates</Link></li>
                <li><Link to="/vendors" className="text-[16px] text-muted-foreground hover:text-black transition-colors">Vendor Marketplace</Link></li>
                <li><Link to="/create" className="text-[16px] text-muted-foreground hover:text-black transition-colors">Custom Designer</Link></li>
                <li><Link to="#" className="text-[16px] text-muted-foreground hover:text-black transition-colors">RSVP Manager</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold text-[16px] uppercase tracking-widest mb-6">Support</h4>
             <ul className="space-y-4">
                <li><Link to="#" className="text-[16px] text-muted-foreground hover:text-black transition-colors">Help Center</Link></li>
                <li><Link to="#" className="text-[16px] text-muted-foreground hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="text-[16px] text-muted-foreground hover:text-black transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="text-[16px] text-muted-foreground hover:text-black transition-colors">Cookie Policy</Link></li>
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="font-bold text-[16px] uppercase tracking-widest mb-2">Newsletter</h4>
             <p className="text-[16px] text-muted-foreground">Receive weekly wedding inspiration and planning tips.</p>
             <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input 
                   placeholder="Your email address"
                   className="w-full bg-white rounded-full py-3 pl-10 pr-4 border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all text-[16px]"
                />
             </div>
             <button className="w-full py-3 bg-black text-white rounded-full text-[16px] font-medium hover:bg-neutral-800 transition-colors">
                Subscribe
             </button>
          </div>
        </div>
        
        <div className="pt-10 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[16px] text-muted-foreground">© 2026 Belle Vows Platform. All rights reserved.</p>
           <div className="flex gap-6">
              <span className="text-[16px] text-muted-foreground">Designed with Love</span>
              <span className="text-[16px] text-muted-foreground">Handcrafted for You</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
