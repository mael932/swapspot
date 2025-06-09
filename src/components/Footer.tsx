
import { Link } from "react-router-dom";
import { Home, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  // Function to scroll to top when links are clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-50 pt-12 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-6 w-6 text-swap-blue" />
              <h3 className="font-bold text-xl text-swap-darkBlue">SwapSpot</h3>
            </div>
            <p className="text-gray-600">
              Making student exchanges easier with perfect accommodation matches.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" onClick={scrollToTop} className="text-gray-600 hover:text-swap-blue">About Us</Link></li>
              <li><Link to="/careers" onClick={scrollToTop} className="text-gray-600 hover:text-swap-blue">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" onClick={scrollToTop} className="text-gray-600 hover:text-swap-blue">How It Works</Link></li>
              <li><Link to="/safety" onClick={scrollToTop} className="text-gray-600 hover:text-swap-blue">Safety</Link></li>
              <li><Link to="/faq" onClick={scrollToTop} className="text-gray-600 hover:text-swap-blue">FAQ</Link></li>
              <li><Link to="/community" onClick={scrollToTop} className="text-gray-600 hover:text-swap-blue">Community</Link></li>
              <li><Link to="/terms" onClick={scrollToTop} className="text-gray-600 hover:text-swap-blue">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-swap-blue" />
                <a href="mailto:hello@swapspot.com" className="text-gray-600 hover:text-swap-blue">hello@swapspot.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-swap-blue" />
                <Link to="/support" onClick={scrollToTop} className="text-gray-600 hover:text-swap-blue">Support</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">© {new Date().getFullYear()} SwapSpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
