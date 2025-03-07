import Link from 'next/link';
import { TrafficCone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export default function Nav() {

    return (
        <header className="fixed top-0 left-0 right-0 z-10 border-b border-gray-200 backdrop-filter backdrop-blur-sm">
            <nav className="max-w-6xl w-full mx-auto h-20 flex justify-between items-center py-4 ">
                <div className="flex items-center space-x-4">
                    <div>
                        <Link href="/">
                            <TrafficCone size={48} />
                        </Link>
                    </div>
                </div>
                <div>
                    <Link href="/signInAndUp">
                        <Button className="cursor-pointer">
                            <User size={24} />
                        </Button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
