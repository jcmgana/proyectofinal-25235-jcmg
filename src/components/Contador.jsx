import React from "react";

function Contador({ cantidad, onIncrement, onDecrement, min = 1, max = 10 }) {


    return (
        <div className="d-flex align-items-center">
            <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={onDecrement}
                disabled={cantidad <= min}
            >
                -
            </button>
            
            <span className="mx-2" style={{ width: '30px', textAlign: 'center' }}>
                {cantidad}
            </span>
            
            <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={onIncrement}
                disabled={cantidad >= max}
            >
                +
            </button>
        </div>
    );
};

export default Contador;