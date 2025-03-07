"use client"
import React, { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import { DataType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Home() {
  const itemsPerPage = 3; // Nombre d'articles par page
  const [articles, setArticles] = useState<DataType[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [page, setPage] = useState(1);
  const cursorsRef = useRef<any[]>([]); // Pour stocker les curseurs afin de gérer la page précédente

  // Fonction pour récupérer une page d'articles
  const fetchArticles = async (cursor: any = null) => {
    let q;
    if (cursor) {
      q = query(
        collection(db, "articles"),
        orderBy("createdAt", "desc"),
        startAfter(cursor),
        limit(itemsPerPage)
      );
    } else {
      q = query(
        collection(db, "articles"),
        orderBy("createdAt", "desc"),
        limit(itemsPerPage)
      );
    }

    const snapshot = await getDocs(q);
    const data: DataType[] = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() } as DataType);
    });

    // Met à jour le curseur pour la page suivante
    if (!snapshot.empty) {
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(lastVisible);
    }
    setArticles(data);
  };

  // Chargement initial
  useEffect(() => {
    fetchArticles();
  }, []);

  // Gestion de la page suivante
  const handleNextPage = async () => {
    if (lastDoc) {
      // Stocker le curseur actuel pour pouvoir revenir en arrière
      cursorsRef.current.push(lastDoc);
      await fetchArticles(lastDoc);
      setPage((prev) => prev + 1);
    }
  };

  // Gestion de la page précédente
  const handlePreviousPage = async () => {
    if (cursorsRef.current.length > 1) {
      // Retirer le dernier curseur et récupérer l'avant-dernier
      cursorsRef.current.pop();
      const previousCursor = cursorsRef.current[cursorsRef.current.length - 1] || null;
      await fetchArticles(previousCursor);
      setPage((prev) => Math.max(prev - 1, 1));
    } else if (cursorsRef.current.length === 1) {
      // Retourner à la première page
      cursorsRef.current = [];
      await fetchArticles();
      setPage(1);
    }
  };

  return (
    <section className="p-4 mt-4">
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {articles.map((article) => (
          <Link href={`articles/${article.id}`} key={article.id}>
            <Card className="p-3 hover:translate-y-[-10px] transition-all">
              <Image
                src={article.image}
                alt={article.title}
                width={500}
                height={500}
                className="w-full h-[500px] object-cover"
              />
              <h2 className="text-xl font-black uppercase mt-4">{article.title}</h2>
              <p className="text-lg text-muted-foreground">écrit par {article.authorName}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Contrôles de pagination */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="px-3 py-1">
          Page {page}
        </span>
        <button
          onClick={handleNextPage}
          disabled={articles.length < itemsPerPage}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </section>
  );
}
