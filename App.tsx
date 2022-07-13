import React from "react";

import { WeatherDataProvider } from "./src/context/context";
import Root from "./src/Root";

const App: React.FC = () => {
    return (
        <WeatherDataProvider>
            <Root />
        </WeatherDataProvider>
    );
};

export default App;
