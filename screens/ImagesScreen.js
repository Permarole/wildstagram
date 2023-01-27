import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Image, Text, FlatList, Button, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import singleFileUploader from "single-file-uploader";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ImagesScreen() {
    const [images, setImages] = useState([]);
    const flatListRef = useRef();

    const toTop = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    };

    useEffect(() => {
        (async () => {
            const images = await FileSystem.readDirectoryAsync(
                FileSystem.cacheDirectory + "ImageManipulator"
            );
            setImages(images.reverse());
        })();
    }, []);
    return (
        <>
            {images ? (
                <>
                    <FlatList
                        ref={flatListRef}
                        style={{ flex: 1 }}
                        data={images}
                        renderItem={(images) => {
                            return (
                                <>
                                    <Image
                                        style={styles.images}
                                        source={{
                                            uri:
                                                FileSystem.cacheDirectory +
                                                "ImageManipulator/" +
                                                images.item,
                                        }}
                                    ></Image>
                                    <Button
                                        onPress={async () => {
                                            try {
                                                await singleFileUploader({
                                                    distantUrl:
                                                        "https://wildstagram.nausicaa.wilders.dev/upload",
                                                    expectedStatusCode: 201,
                                                    filename: images.item,
                                                    filetype: "image/jpeg",
                                                    formDataName: "fileData",
                                                    localUri:
                                                        FileSystem.cacheDirectory +
                                                        "ImageManipulator/" +
                                                        images.item,
                                                    token: Constants.manifest
                                                        .extra.token,
                                                });
                                                alert("uploaded");
                                            } catch (error) {
                                                alert("An error occured");
                                            }
                                        }}
                                        title="Upload"
                                    />
                                </>
                            );
                        }}
                        keyExtractor={(image) => images.indexOf(image)}
                    ></FlatList>
                    <Ionicons
                        style={styles.arrowToTop}
                        name="arrow-up"
                        size={40}
                        onPress={toTop}
                    ></Ionicons>
                </>
            ) : (
                <Text>No image to display</Text>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    images: {
        resizeMode: "cover",
        height: 500,
    },
    arrowToTop: {
        position: "absolute",
        right: 5,
        top: 200,
        backgroundColor: "white",
        borderRadius: 50,
        margin: 20
    },
});
