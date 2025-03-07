"use client"

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardNav from "@/components/nav/DashboardNav";

export default function DashboardLayout({ children }: {children: React.ReactNode}) {



  return (
    <ProtectedRoute>
      <section className="max-w-6xl mx-auto w-full mt-2 p-2">
        <DashboardNav />
        {children}
      </section>
    </ProtectedRoute>
  );
}