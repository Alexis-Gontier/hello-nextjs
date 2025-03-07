import * as Yup from 'yup';

export const schemaArticle = Yup.object().shape({
  title: Yup.string().trim().required("Le titre est requis"),
  description: Yup.string().trim().required("La description est requise"),
  image: Yup.string().trim().url("L'URL de l'image est invalide").required("L'URL de l'image est requise"),
});