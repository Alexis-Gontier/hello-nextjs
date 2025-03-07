"use client"

import React from "react";
import { useFirebase } from "@/context/articleContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { schemaArticle } from "@/schemas/schemas";
import { DataFormType, DataType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UpdatePageProps } from "@/types/types";

export default function PageUpdate({ params }: UpdatePageProps) {
  const { updateArticle, articles } = useFirebase();
  const { user } = useAuth();
  const router = useRouter();
  const articleId = params.id as string;

  // Recherche de l'article à mettre à jour
  const articleToUpdate = articles.find((article) => article.id === articleId);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<DataFormType>({
    resolver: yupResolver(schemaArticle),
    defaultValues: articleToUpdate, // Remplit le formulaire avec les valeurs existantes
  });

  // Utilisation de watch pour surveiller le champ "image" et afficher la prévisualisation
  const imagePreviewUrl = watch("image", articleToUpdate?.image || "");

  const onSubmit: SubmitHandler<DataFormType> = async (formData) => {
    try {
      const updatedArticle: DataType = {
        id: articleId,
        title: formData.title,
        description: formData.description,
        image: formData.image, // URL saisie par l'utilisateur
        authorName: user?.displayName as string,
        authorId: user?.uid as string,
        createdAt: new Date(),
      };

      updateArticle(updatedArticle);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
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

          {/* Affichage de la prévisualisation de l'image en fonction de l'URL saisie */}
          {imagePreviewUrl && (
            <img
              className="w-full h-[500px] object-cover"
              src={imagePreviewUrl}
              alt="Image Preview"
            />
          )}

          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button className="bg-red-500 hover:bg-red-600 text-white" type="button">
                Annuler
              </Button>
            </Link>
            <Button type="submit">Modifier l'article</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
