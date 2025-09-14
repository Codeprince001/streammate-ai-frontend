import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign In | StreamMate AI',
  description: 'Sign in to your StreamMate AI account to get personalized recommendations',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-800 p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}