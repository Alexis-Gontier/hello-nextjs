"use client"

import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';

export default function PageSignInAndUp() {

    const { redirectIfAuthenticated, loginWithGoogle } = useAuth();

    redirectIfAuthenticated();

    return (
        <section className="flex flex-col items-center justify-center">
            <Button
                type="button"
                variant="outline"
                onClick={loginWithGoogle}
            >
                Continuer avec Google
            </Button>
        </section>
    )
}
