import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ImageServices from "../services/ImageServices";
import "../../../assets/styles.css";

const ImageSearch: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: { query: string }) => {
    setLoading(true);
    setError(null);

    try {
      const results = await ImageServices.searchImages(values.query);
      setImages(results);
    } catch (error) {
      setError("Error al buscar las imagenes, por favor intentelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="header">
        <h1>Buscador de imagenes</h1>
      </div>

      <div className="search-container">
        <h2>Buscar imagen</h2>
        <Formik
          initialValues={{ query: "" }}
          validate={(values) => {
            const errors: { query?: string } = {};
            if (!values.query) {
              errors.query = "Requerido";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field className="search-title" type="text" name="query" placeholder="Buscar imagen..." />
              <button type="submit" disabled={isSubmitting}>
                Search
              </button>
              <ErrorMessage name="query" component="div" />
            </Form>
          )}
        </Formik>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="image-container">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <a
                href={image.links.html}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={image.urls.regular} alt={image.alt_description} />
                <p>{image.alt_description}</p>
              </a>
            </div>
          ))}
        </div>
      )}

      {error && <p>{error}</p>}
    </>
  );
};

export default ImageSearch;
