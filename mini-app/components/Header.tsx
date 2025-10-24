import Link from "next/link";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          ETHQUIZ
        </Link>
        <nav>
          <Link href="/" className="px-4 hover:underline">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
