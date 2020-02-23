import React from 'react';

const App = ({
    message,
}) => {
    return (
        <div data-test="tx-app__message">{message}</div>
    );
};

export default App;