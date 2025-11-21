'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { useUser } from "@/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, User as UserIcon } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export function UserNav() {
  const { t } = useTranslation();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/');
  };

  if (isUserLoading) {
    return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;
  }

  if (user) {
    const userInitial = user.email ? user.email.charAt(0).toUpperCase() : '?';
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                        <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName || t('user_nav.my_account')}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/account/profile">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>{t('user_nav.profile')}</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('user_nav.logout')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Button asChild variant="ghost" className="text-sm px-2 sm:px-4">
          <Link href="/login">{t('user_nav.login')}</Link>
      </Button>
      <Button asChild className="text-sm hidden sm:inline-flex">
          <Link href="/signup">{t('user_nav.signup')}</Link>
      </Button>
    </div>
  );
}
