import React, { useState } from "react";
import Weather from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_KEY } from "@env";

interface WeatherDataInterface {
    data: Weather | null;
    location: string | null;
    setLocation: (location: string) => void;
    fetchData: () => void;
    updateFromLocalStorage: () => void;
    updateLocationFromLocalStorage: () => void;
}

export const WeatherData = React.createContext<WeatherDataInterface | null>(
    null
);

export const WeatherDataProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [data, setData] = useState<Weather | null>(null);
    const [location, setLocation] = useState<string | null>(null);

    const updateDataFromLocalStorage = async () => {
        const savedDataString = await AsyncStorage.getItem("weatherData");
        if (savedDataString === null) return;
        const savedData: Weather = JSON.parse(savedDataString);
        setData(savedData);
    };

    const updateLocationFromLocalStorage = async () => {
        const savedLocation = await AsyncStorage.getItem("location")
        setLocation(savedLocation);
    };

    const fetchDataHandler = async () => {
        const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=10&aqi=yes&alerts=yes`
        );
        const responseData = await res.json();
        await AsyncStorage.setItem("weatherData", JSON.stringify(responseData));
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
        updateFromLocalStorage: updateDataFromLocalStorage,
        updateLocationFromLocalStorage: updateLocationFromLocalStorage,
    };
    return <WeatherData.Provider value={value} children={children} />;
};
