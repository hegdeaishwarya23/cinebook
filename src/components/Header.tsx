import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <Link href="/" className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-white" />
        </span>
        <span className="font-semibold text-gray-900">CineBook</span>
      </Link>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search movies, cinemas"
          className="text-sm border border-gray-200 rounded-full px-4 py-1.5 w-64 text-gray-500 focus:outline-none"
        />
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
          AH
        </div>
      </div>
    </header>
  );
}