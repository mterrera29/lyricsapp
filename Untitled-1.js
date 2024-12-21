function imprimirDecoracionConNombres(array) {
  if (array.length === 0) {
      console.log("El array está vacío.");
      return;
  }

  // Encontrar la longitud del nombre más largo
  const longitudMax = array.reduce((longitudMax, nombre) => 
      Math.max(longitudMax, nombre.length), 0);

  // Calcular la cantidad de símbolos a imprimir
  const cantidadSimbolos = longitudMax + 4;

  // Línea de asteriscos
  const lineaAsteriscos = "*".repeat(cantidadSimbolos);

  // Imprimir resultado
  console.log(lineaAsteriscos); // Línea superior
  array.forEach(nombre => {
      // Imprimir cada nombre alineado a la izquierda, completando con espacios
      const espaciosRestantes = cantidadSimbolos - nombre.length;
      console.log(nombre + " ".repeat(espaciosRestantes));
  });
  console.log(lineaAsteriscos); // Línea inferior
}

// Ejemplo de uso
const nombres = ["Ana", "Sebastián", "Claudia"];
imprimirDecoracionConNombres(nombres);