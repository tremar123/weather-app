import { createContext, useState } from "react";
import Weather from "../types";
import { API_KEY } from "@env";

interface WeatherDataInterface {
    data: Weather | undefined;
    location: string | undefined;
    setLocation: (location: string) => void;
    getData: () => void;
}

export const WeatherData = createContext<WeatherDataInterface | null>(null);

export const WeatherDataProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [data, setData] = useState<Weather>();
    const [location, setLocation] = useState<string | undefined>();

    const getDataHandler = async () => {
        const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=10&aqi=yes&alerts=yes`
        );
        const weatherData: Weather = await res.json();
        console.log(weatherData.current);
    };

    const value: WeatherDataInterface = {
        data: data,
        location: location,
        setLocation: setLocation,
        getData: getDataHandler,
    };
    return (
        <WeatherData.Provider value={value}>{children}</WeatherData.Provider>
    );
};
