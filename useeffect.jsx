import React, { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Définir une fonction asynchrone pour récupérer les données
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Erreur de récupération:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Appel de la fonction de récupération de données
  }, []); // Le tableau de dépendances vide signifie que cet effet s'exécute une seule fois, après le premier rendu.

  return (
    <div>
      <h1>Liste des Posts</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
