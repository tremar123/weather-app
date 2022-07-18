import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, ScrollView, Text } from "react-native";
import { WeatherData } from "../context/context";

const Weather: React.FC = () => {
    const { t } = useTranslation();
    const ctx = useContext(WeatherData);

    return (
        <ScrollView>
            <Text>{t("weather")}</Text>
            <Button onPress={ctx?.fetchData} title={"button"}></Button>
            <Text>{JSON.stringify(ctx?.data)}</Text>
            <Text>{ctx?.location}</Text>
        </ScrollView>
    );
};

export default Weather;
