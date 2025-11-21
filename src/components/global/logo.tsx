import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="EZENTIALS Home">
      <span className="font-headline text-2xl font-bold tracking-tight text-primary group-hover:text-primary/90 transition-colors">
        EZENTIALS
      </span>
    </Link>
  );
}
