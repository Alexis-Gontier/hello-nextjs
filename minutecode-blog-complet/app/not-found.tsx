import Link from "next/link"

export default function NotFound() {
  return (
    <div className="text-center">
        <h1>404 - Page Not Found</h1>
        <Link href="/" className="text-blue-500">
            Go back home
        </Link>
    </div>
  )
}
