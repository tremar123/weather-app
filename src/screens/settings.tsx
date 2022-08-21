import React from "react";
import { TextStyle, useColorScheme, View, ViewStyle } from "react-native";
import { useEffect, useState, useContext } from "react";
import { Button, FlatList, Pressable, Text, TextInput } from "react-native";

import { WeatherData } from "../context/context";
import { LocationAutoComplete } from "../types/types";

const Settings: React.FC<{ textStyle: TextStyle; bgStyle: ViewStyle }> = (
    props
) => {
    return (
            <LocationSettings
                textStyle={props.textStyle}
                bgStyle={props.bgStyle}
            />
    );
};

export default Settings;

const LocationSettings: React.FC<{
    textStyle: TextStyle;
    bgStyle: ViewStyle;
}> = (props) => {
    const ctx = useContext(WeatherData);
    const [locationName, setLocationName] = useState<string>("");
    const [locationAutoCompleteList, setLocationAutoCompleteList] =
        useState<Array<LocationAutoComplete>>();
    const colorScheme = useColorScheme();

    const setLocation = (newLocation: string) => {
        ctx?.setLocation(newLocation);
    };

    useEffect(() => {
        const getLocation = setTimeout(async () => {
            if (locationName.length > 2) {
                console.log("Fetching...");
                const res = await fetch(
                    `https://api.weatherapi.com/v1/search.json?key=e9e558a0ab4147a98f3193014221406&q=${locationName}`
                );
                if (res.ok) {
                    setLocationAutoCompleteList(await res.json());
                }
            }
        }, 1000);

        return () => {
            console.log("Clear...");
            clearTimeout(getLocation);
        };
    }, [locationName]);

    return (
        <>
            <TextInput
                value={locationName}
                onChangeText={setLocationName}
                placeholder="Location"
                style={props.textStyle}
                placeholderTextColor={
                    colorScheme === "dark" ? "lightgray" : "gray"
                }
            />
            <FlatList
                data={locationAutoCompleteList}
                style={props.bgStyle}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => setLocationName(item.name)}
                        style={({ pressed }) => [
                            {
                                backgroundColor:
                                    colorScheme === "dark"
                                        ? pressed
                                            ? "blue"
                                            : "black"
                                        : pressed
                                        ? "blue"
                                        : "white",
                            },
                        ]}
                    >
                        <Text>
                            {item.name}, {item.region}, {item.country}
                        </Text>
                    </Pressable>
                )}
            />
            <Button
                onPress={() => setLocation(locationName)}
                title={"Set location"}
            ></Button>
        </>
    );
};
