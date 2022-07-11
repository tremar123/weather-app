import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "react-native";
import { WeatherData } from "../context/context";

const Weather: React.FC = () => {
    const { t } = useTranslation();
    const ctx = useContext(WeatherData);
    return (
        <>
            <Text>t("weather")</Text>
            <Button onPress={ctx?.getData} title={"button"}></Button>
        </>
    );
};

export default Weather;
