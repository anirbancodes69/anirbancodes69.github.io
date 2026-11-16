import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-page flex-col justify-center px-5 sm:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">This page does not exist.</h1>
      <p className="mt-6">
        <Link href="/" className="link">Back to the homepage</Link>
      </p>
    </div>
  );
}
