import Link from 'next/link'
import Button from '@/components/shared/Button/Button';

export default function NotFound() {
    return (
        <div className="min-h-[90vh] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mb-6">Page Not Found</h2>
                <p className="text-gray-500 mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
                <Button>
                    <Link href="/">
                        Return Home
                    </Link>
                </Button>
            </div>
        </div>
    )
}
