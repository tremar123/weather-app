import React, { useEffect, useState, useContext } from "react";
import { Button, FlatList, Pressable, Text, TextInput } from "react-native";

import { WeatherData } from "../context/context";
import { LocationAutoComplete } from "../types/types";

const LocationSettings: React.FC = () => {
    const ctx = useContext(WeatherData);
    const [locationName, setLocationName] = useState<string>("");
    const [locationAutoCompleteList, setLocationAutoCompleteList] =
        useState<Array<LocationAutoComplete>>();

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
            />
            <FlatList
                data={locationAutoCompleteList}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => setLocationName(item.name)}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? "blue" : "white",
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

export default LocationSettings;
