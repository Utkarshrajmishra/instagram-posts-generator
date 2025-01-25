import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Mail, Database } from "lucide-react";
import {signOut } from "@/auth";
import Link from "next/link";


type Session = {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires: string | null
}

export function Profile({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="rounded-full outline outline-1 outline-white cursor-pointer">
          <Image
            src={session?.user?.image || "./vercel.svg"}
            alt="Profile"
            width={36}
            height={35}
            className="rounded-full"
          />
        </div>
                </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              {session.user?.name}
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              {session.user?.email}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Database className="mr-2 h-4 w-4" />
              <Link href="/profile">
               <p>Dashboard</p>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit" className="flex gap-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
       )
}
