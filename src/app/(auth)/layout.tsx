import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <div className="relative min-h-screen">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-purple-600/20 to-accent-600/20" />
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <p className="text-secondary-500 text-sm">
            © 2024 StreamMate AI. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}