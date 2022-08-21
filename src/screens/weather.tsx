import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    RefreshControl,
    ScrollView,
    Text,
    TextStyle,
    ViewStyle,
} from "react-native";
import { WeatherData } from "../context/context";

const Weather: React.FC<{textStyle: TextStyle, bgStyle: ViewStyle}> = (props) => {
    const { t } = useTranslation();
    const ctx = useContext(WeatherData);
    const [refreshing, setRefreshing] = useState(false);

    const refreshHandler = async () => {
        setRefreshing(true);
        await ctx?.fetchData();
        setRefreshing(false);
    }

    return (
        <ScrollView style={props.bgStyle}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refreshHandler}
                />
            }
        >
            <Text style={props.textStyle}>{t("weather")}</Text>
            <Text style={props.textStyle}>{ctx?.location}</Text>
            <Text style={props.textStyle}>{JSON.stringify(ctx?.data)}</Text>
        </ScrollView>
    );
};

export default Weather;
