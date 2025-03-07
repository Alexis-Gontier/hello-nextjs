"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFirebase } from "@/context/articleContext";
import { schemaArticle } from "@/schemas/schemas";
import { DataFormType } from "@/types/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PageCreateArticle() {

  const { addArticle } = useFirebase();
  const { user } = useAuth();
  const router = useRouter();

  const { handleSubmit, register, formState: { errors } } = useForm<DataFormType>({
    resolver: yupResolver(schemaArticle),
  });

  const onSubmit: SubmitHandler<DataFormType> = async (formData) => {
    try {
      await addArticle({
        ...formData,
        authorName: user?.displayName as string,
        authorId: user?.uid as string,
        createdAt: new Date(),
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  return (
    <Card>
      <CardContent className='p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <Label htmlFor="title">Title :</Label>
          <Input
            {...register("title")}
            id="title"
            type="text"
            placeholder="Entrez le titre de l'article"
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}

          <Label htmlFor="description">Description :</Label>
          <Textarea
            {...register("description")}
            id="description"
            placeholder="Entrez la description de l'article"
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}

          <Label htmlFor="image">Image URL :</Label>
          <Input
            type="text"
            {...register("image")}
            id="image"
            placeholder="Entrez l'URL de l'image"
          />
          {errors.image && <span className="text-red-500">{errors.image.message}</span>}

          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button className="bg-red-500 hover:bg-red-600 text-white" type="button">
                Annuler
              </Button>
            </Link>
            <Button type="submit">
              Ajouter article
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
