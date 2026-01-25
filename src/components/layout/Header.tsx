import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { UserMenu } from "./UserMenu";

export async function Header() {
  const user = await currentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl mx-auto items-center justify-between px-4 sm:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/vercel.svg" alt="Foundry Logo" width={22} height={22} className="invert dark:invert-0" />
          <span className="text-lg font-bold tracking-tight">foundrr</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            How it works
          </Link>
          {user ? (
            <UserMenu email={user.emailAddresses[0]?.emailAddress || ""} />
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:block transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className={cn(
                  "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
