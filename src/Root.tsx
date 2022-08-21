import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect } from "react";
import { TextStyle, useColorScheme, ViewStyle } from "react-native";

import Meteogram from "./screens/meteogram";
import Weather from "./screens/weather";
import { WeatherData } from "./context/context";
import Settings from "./screens/settings";
import "../assets/i18n/i18n";

const Tab = createBottomTabNavigator();

const Root: React.FC = () => {
    const { t } = useTranslation();
    const ctx = useContext(WeatherData);
    const colorScheme = useColorScheme();

    useEffect(() => {
        ctx?.updateLocationFromLocalStorage();
    }, []);

    const textStyle: TextStyle = {
        color: colorScheme === "dark" ? "white" : "black",
    };

    const bgStyle: ViewStyle = {
        backgroundColor: colorScheme === "dark" ? "black" : "white",
    };

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarIconStyle: { display: "none" },
                    tabBarStyle: bgStyle,
                }}
                sceneContainerStyle={bgStyle}
            >
                <Tab.Screen name={t("weather")}>
                    {() => <Weather textStyle={textStyle} bgStyle={bgStyle} />}
                </Tab.Screen>
                <Tab.Screen name={t("meteograms")}>
                    {() => (
                        <Meteogram textStyle={textStyle} bgStyle={bgStyle} />
                    )}
                </Tab.Screen>
                <Tab.Screen name={t("settings")}>
                    {() => <Settings textStyle={textStyle} bgStyle={bgStyle} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Root;
