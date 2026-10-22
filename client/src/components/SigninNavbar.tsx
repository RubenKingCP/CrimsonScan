import Link from "next/link";


export default function SigninNavbar() {
    return (
        <nav className="flex items-center justify-between bg-red-900 px-6 py-3">
            <span className="text-white font-bold">CrimsonScan</span>

            <div className="flex items-center gap-4">
                <span className="text-white hover:text-gray-300">How it works</span>
                <span className="text-white hover:text-gray-300">OWASP 10</span>
                <Link
                    href="/login"
                    className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-red-900
                    shadow-sm transition-colors hover:bg-gray-100
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    Sign in
                </Link>
            </div>
        </nav>
    )
}
