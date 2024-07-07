import React, { useState } from 'react';

const ManageMails = () => {
    const [counter, setCounter] = useState(0);

    const incrementCounter = () => {
        setCounter(counter + 1);
    };

    const decrementCounter = () => {
        setCounter(counter - 1);
    };

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={incrementCounter}>Increment</button>
            <button onClick={decrementCounter}>Decrement</button>
        </div>
    );
};

export default ManageMails;