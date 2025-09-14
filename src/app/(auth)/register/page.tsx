import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Sign Up | StreamMate AI',
  description: 'Create your StreamMate AI account and start discovering amazing content',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-800 p-4">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}