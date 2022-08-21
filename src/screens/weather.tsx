import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    RefreshControl,
    ScrollView,
    Text,
    useColorScheme,
} from "react-native";
import { WeatherData } from "../context/context";

const Weather: React.FC = () => {
    const { t } = useTranslation();
    const ctx = useContext(WeatherData);
    const colorScheme = useColorScheme();
    const [refreshing, setRefreshing] = useState(false);

    const refreshHandler = async () => {
        setRefreshing(true);
        await ctx?.fetchData();
        setRefreshing(false);
    }

    // TODO: update location from local storage

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refreshHandler}
                />
            }
        >
            <Text>{t("weather")}</Text>
            <Text>{ctx?.location}</Text>
            <Text>{JSON.stringify(ctx?.data)}</Text>
        </ScrollView>
    );
};

export default Weather;
