import React from "react"; 
import "../styles/Boton.css"; // Importa los estilos específicos para este componente

/* Componente Boton
    Este componente representa un botón estilizado.
    Recibe 3 props:
    - texto: El texto que se mostrará dentro del botón.
    - onClick: La función que se ejecutará cuando se haga clic en el botón.
    - tipo: El tipo de botón (por ejemplo, "primary", "secondary") para aplicar diferentes estilos.
*/

const Boton = ({ texto, tipo, onClick }) => {
    const coloresPorTipo = {
        Borrar: '#f3e62bff',
        Agregar: '#28a848de',
        Vaciar: '#c20606ff',
        Comprar: '#007bff',
        Defecto: '#636f77d5',
        Restar: '#c20606ff',
        Sumar: '#28a848de',
    };

    // Escogemos el color del fondo según la prop 'tipo'
    // Si no hay 'tipo', usamos 'defecto'
    const colorFondo = coloresPorTipo[tipo] || coloresPorTipo.Defecto; // Color por defecto si no se especifica tipo

    // Retorna el botón en JSX
    return (
        <button
        className="boton" // Clase CSS para estilos
        style={{ backgroundColor: colorFondo, color: '#fff' }} // Aplica el color de fondo dinámicamente
        onClick={onClick}  // Asigna la función onClick pasada como prop
        >
        {texto} {/* Texto visible en el boton */}
        </button>
    );
};


export default Boton; // Exporta el componente para usarlo en otros archivos