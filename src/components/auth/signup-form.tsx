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
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from '@/hooks/use-translation';

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet est requis." }),
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

type SignupFormValues = z.infer<typeof signupSchema>;


export function SignupForm() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      // Send email verification
      await sendEmailVerification(user);

      const [firstName, ...lastName] = data.fullName.split(' ');

      // Create a user document in Firestore using the non-blocking helper
      const userDocRef = doc(firestore, "users", user.uid);
      setDocumentNonBlocking(userDocRef, {
        id: user.uid,
        firstName: firstName || '',
        lastName: lastName.join(' '),
        email: user.email,
        registrationDate: new Date().toISOString(),
      }, { merge: false });

      toast({
        title: t('signup_form.success_title'),
        description: t('signup_form.success_description'),
      });
      router.push('/login');

    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            setError(t('signup_form.error_email_in_use'));
        } else {
            setError(t('signup_form.error_generic'));
        }
        console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t('signup_form.title')}</CardTitle>
        <CardDescription>
          {t('signup_form.description')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>{t('signup_form.error_title')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="full-name">{t('signup_form.full_name')}</Label>
            <Input id="full-name" placeholder={t('signup_form.full_name_placeholder')} {...register('fullName')} />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('signup_form.password')}</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('signup_form.submit_button')}
          </Button>
          <div className="mt-4 text-center text-sm w-full">
            {t('signup_form.already_have_account')}{" "}
            <Link href="/login" className="underline font-semibold">
              {t('signup_form.login_link')}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}