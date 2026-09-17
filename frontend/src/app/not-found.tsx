import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center px-5 py-24 text-center md:py-32">
      <Logo variant="mark" height={44} />
      <h1 className="mt-8 font-serif text-3xl text-ink text-balance md:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft text-pretty">
        The piece may have been renamed, or the link is out of date.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/collections" className="btn btn-primary">
          Browse the collection
        </Link>
        <Link href="/" className="btn btn-outline">
          Home
        </Link>
      </div>
    </main>
  );
}
