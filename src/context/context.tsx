import React, { useEffect, useState } from "react";
import Weather from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_KEY } from "@env";

interface WeatherDataInterface {
    data: Weather | null;
    location: string | null;
    setLocation: (location: string) => Promise<void>;
    fetchData: () => Promise<void>;
    updateDataFromLocalStorage: () => Promise<void>;
    updateLocationFromLocalStorage: () => Promise<void>;
}

export const WeatherData = React.createContext<WeatherDataInterface | null>(
    null
);

export const WeatherDataProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<Weather | null>(null);
    const [location, setLocation] = useState<string | null>(null);

    const updateDataFromLocalStorage = async () => {
        const savedDataString = await AsyncStorage.getItem("weatherData");
        if (savedDataString === null) return;
        const savedData: Weather = JSON.parse(savedDataString);
        setData(savedData);
    };

    const updateLocationFromLocalStorage = async () => {
        const savedLocation = await AsyncStorage.getItem("location");
        setLocation(savedLocation);
    };

    const fetchDataHandler = async () => {
        const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=10&aqi=yes&alerts=yes`
        );
        if (res.ok) {
            const responseData = await res.json();
            setData(responseData);
            await AsyncStorage.setItem(
                "weatherData",
                JSON.stringify(responseData)
            );
        }
    };

    const setLocationHandler = async (newLocation: string) => {
        await AsyncStorage.setItem("location", newLocation);
        setLocation(newLocation);
    };

    const value: WeatherDataInterface = {
        data: data,
        location: location,
        setLocation: setLocationHandler,
        fetchData: fetchDataHandler,
        updateDataFromLocalStorage: updateDataFromLocalStorage,
        updateLocationFromLocalStorage: updateLocationFromLocalStorage,
    };

    useEffect(() => {
        fetchDataHandler();
    }, [location]);

    return <WeatherData.Provider value={value} children={children} />;
};
