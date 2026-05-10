import { Link } from "react-router-dom";
import { PenSquare } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#191919]/90 backdrop-blur-md border-b border-[#2F2F2F]">
      
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-2 text-[15px] font-semibold"
        >
          <PenSquare size={18} />
          ThoughtNest
        </Link>

        <div className="flex items-center gap-5 text-sm text-[#9B9B9B]">

          <Link
            to="/"
            className="hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/create"
            className="hover:text-white transition"
          >
            Write
          </Link>

          <Link
            to="/login"
            className="px-3 py-1.5 rounded-md bg-[#2A2A2A] hover:bg-[#333333] text-white transition"
          >
            Login
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;