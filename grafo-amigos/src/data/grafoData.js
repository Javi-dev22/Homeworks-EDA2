export const nodes = [
  // Información de personas
  { id: 'p1', label: 'Ana', type: 'person', age: 25, city: 'Bogotá' },
  { id: 'p2', label: 'Carlos', type: 'person', age: 30, city: 'Medellín' },
  { id: 'p3', label: 'Elena', type: 'person', age: 28, city: 'Bogotá' },
  { id: 'p4', label: 'David', type: 'person', age: 35, city: 'Cali' },
  { id: 'p5', label: 'Sofía', type: 'person', age: 22, city: 'Medellín' },
  
  // Ciudades
  { id: 'c1', label: 'Bogotá', type: 'city' },
  { id: 'c2', label: 'Medellín', type: 'city' },
  { id: 'c3', label: 'Cali', type: 'city' },
];

export const links = [
  // Amistades
  { source: 'p1', target: 'p2' },
  { source: 'p1', target: 'p3' },
  { source: 'p2', target: 'p4' },
  { source: 'p3', target: 'p5' },
  { source: 'p4', target: 'p5' },
  
  // Personas viviendo en ciudades
  { source: 'p1', target: 'c1' },
  { source: 'p3', target: 'c1' },
  { source: 'p2', target: 'c2' },
  { source: 'p5', target: 'c2' },
  { source: 'p4', target: 'c3' },
];