'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, initiateEmailSignIn } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUser } from '@/firebase';
import { useTranslation } from '@/hooks/use-translation';
import { sendPasswordResetEmail } from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    initiateEmailSignIn(auth, data.email, data.password);
  };
  
  const handlePasswordReset = async () => {
    const email = getValues("email");
    if (!email) {
      toast({
        variant: "destructive",
        title: t('login_form.password_reset_error_title'),
        description: t('login_form.password_reset_error_desc'),
      });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: t('login_form.password_reset_success_title'),
        description: t('login_form.password_reset_success_desc'),
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        variant: "destructive",
        title: t('login_form.password_reset_error_title'),
        description: error.message,
      });
    }
  };

  if (user && !isUserLoading) {
    router.push('/account/profile');
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t('login_form.title')}</CardTitle>
        <CardDescription>
          {t('login_form.description')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>{t('login_form.error_title')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('login_form.password')}</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button className="w-full" disabled={isLoading || isUserLoading}>
            {(isLoading || isUserLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('login_form.submit_button')}
          </Button>
          <div className="text-sm w-full text-center">
            <button type="button" onClick={handlePasswordReset} className="underline text-sm text-muted-foreground hover:text-foreground">
              {t('login_form.forgot_password')}
            </button>
          </div>
          <div className="mt-2 text-center text-sm w-full">
            {t('login_form.no_account')}{" "}
            <Link href="/signup" className="underline font-semibold">
              {t('login_form.signup_link')}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}