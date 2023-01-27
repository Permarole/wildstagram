import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen() {
    const [serverImagesUrls, setServerImagesUrls] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const flatListRef = useRef();

    const toTop = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    };

    const getFilesUrls = async () => {
        try {
            setIsFetching(true);
            const filesUrls = await axios.get(
                "https://wildstagram.nausicaa.wilders.dev/list"
            );
            setServerImagesUrls(filesUrls.data.reverse());
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            alert("An error occured : ", error);
        }
    };

    useEffect(() => {
        getFilesUrls();
    }, []);

    return (
        <>
            {serverImagesUrls ? (
                <>
                    <FlatList
                        ref={flatListRef}
                        style={{ flex: 1 }}
                        data={serverImagesUrls}
                        onRefresh={() => getFilesUrls()}
                        refreshing={isFetching}
                        renderItem={(image) => {
                            return (
                                <>
                                    <Image
                                        style={styles.images}
                                        source={{
                                            uri:
                                                "https://wildstagram.nausicaa.wilders.dev/files/" +
                                                image.item,
                                        }}
                                    ></Image>
                                </>
                            );
                        }}
                    ></FlatList>
                    <Ionicons
                        style={styles.arrowToTop}
                        name="arrow-up"
                        size={40}
                        onPress={toTop}
                    ></Ionicons>
                </>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    images: {
        resizeMode: "contain",
        height: 500,
    },
    arrowToTop: {
        position: "absolute",
        right: 5,
        top: 200,
        backgroundColor: "white",
        borderRadius: 50,
        margin: 20,
    },
});
