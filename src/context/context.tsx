import { createContext } from "react";
import Weather from "../types";

interface WeatherDataInterface {
    data: Weather;
    location: string;
}

const WeatherData = createContext<Weather | null>(null);
