import Image from "next/image"
import Link from "next/link"
import { auth, signIn } from "@/auth"

import { Button } from "@/components/ui/button"

import { ModeToggle } from "./mode-toggle"
import { Profile } from "./profile"

export default async function Navbar() {
  const session = await auth()
  return (
    <nav className="container mx-auto flex items-center justify-between space-x-4 p-4">
      <Link className="flex items-center space-x-2" href="/">
        <Image unoptimized src="/icon.svg" alt="Logo" width={32} height={32} />
        <span className="hidden text-lg font-semibold text-primary sm:inline">
          Instagram Posts Generator
        </span>
      </Link>

      <div className="flex items-center space-x-4">
        <Button variant="link" asChild>
          <Link href="/about">About</Link>
        </Button>

        <Button variant="link" asChild>
          <Link href="/docs">Docs</Link>
        </Button>
        <div className="flex items-center space-x-4">
        {session && session?.user ? (
          <Profile session={session} />
        ) : (
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <Button type="submit" variant="link">
              Login
            </Button>
          </form>
        )}
        </div>
        <ModeToggle />
      </div>
    </nav>
  )
}
