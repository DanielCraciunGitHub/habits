import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Link>
      {children}
    </div>
  );
}
