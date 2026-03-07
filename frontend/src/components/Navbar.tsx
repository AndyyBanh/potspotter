import Link from "next/link";
import { Button } from "./ui/button";


export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <Link href="/" className="text-xl font-bold">
        Pot Spotter
      </Link>
      <div className="flex gap-3">
        <Link href="/auth/login">
          <Button className="rounded-2xl" size="lg" variant="ghost">
            Login
          </Button>
          
        
      </Link>
        <Link href="/auth/signup">
          <Button className="rounded-2xl bg-orange-400 hover:bg-orange-500" size="lg" >
            Sign Up
          </Button> 
        </Link>

      </div>
      
    </nav>
  );
}
