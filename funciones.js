// FUNCIÓN REGULAR
function verificarParImparRegular(numero) {
    if (numero % 2 === 0) {
        console.log(`El número ${numero} es PAR`);
    } else {
        console.log(`El número ${numero} es IMPAR`);
    }
}

// FUNCIÓN DE FLECHA
const verificarParImparFlecha = (numero) => {
    if (numero % 2 === 0) {
        console.log(`El número ${numero} es PAR`);
    } else {
        console.log(`El número ${numero} es IMPAR`);
    }
};

// PRUEBAS
console.log(" FUNCIÓN REGULAR ");
verificarParImparRegular(5);
verificarParImparRegular(8);

console.log("\n FUNCIÓN DE FLECHA ");
verificarParImparFlecha(7);
verificarParImparFlecha(10);