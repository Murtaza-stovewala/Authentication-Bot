import Link from 'next/link';
import { MessageSquareText } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="bg-card text-card-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <MessageSquareText size={28} className="text-primary" />
          <h1 className="text-2xl font-headline font-semibold">
            Authentication Bot
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
