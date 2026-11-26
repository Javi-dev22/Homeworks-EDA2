// src/data.js
import { Trie } from './structures/Trie';
import { MaxHeap } from './structures/MaxHeap';
import { Graph } from './structures/Graph';

const rawSongs = [
  { id: 1, title: "La Bicicleta", artist: "Carlos Vives, Shakira", plays: 5000, genre: "Vallenato pop" },
  { id: 2, title: "Hips Don't Lie", artist: "Shakira", plays: 4800, genre: "Pop latino" },
  { id: 3, title: "La Camisa Negra", artist: "Juanes", plays: 4500, genre: "Rock en español" },
  { id: 4, title: "Mi Gente", artist: "J Balvin, Willy William", plays: 4000, genre: "Reguetón" },
  { id: 5, title: "Provenza", artist: "Karol G", plays: 3800, genre: "Urbano latino" },
  { id: 6, title: "Cómo Te Atreves", artist: "Morat", plays: 3500, genre: "Pop latino" },
];

// Inicializar Estructuras
export const songTrie = new Trie();
export const songHeap = new MaxHeap();
export const songGraph = new Graph();

// Llenar estructuras
rawSongs.forEach(song => {
  songTrie.insert(song);
  songHeap.insert(song);
  songGraph.addVertex(song.id);
});

// Crear relaciones (Grafo)
songGraph.addEdge(1, 2); // La Bicicleta -> Hips Don't Lie
songGraph.addEdge(1, 3); // La Bicicleta -> La Camisa Negra
songGraph.addEdge(2, 5); // Hips Don't Lie -> Provenza
songGraph.addEdge(3, 6); // La Camisa Negra -> Cómo Te Atreves
songGraph.addEdge(4, 5); // Mi Gente -> Provenza

export const allSongs = rawSongs;