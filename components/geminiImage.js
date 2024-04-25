import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios"; // Import Axios for making HTTP requests
const ImagePickerComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedText, setGeneratedText] = useState("");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please allow access to your photo library to pick an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const generateText = async () => {
    if (!selectedImage) {
      Alert.alert("No Image", "Please upload an image first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: selectedImage,
        name: "image.jpg",
        type: "image/jpg",
      });

      const response = await axios.post("YOUR__API_KEY", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.description) {
        setGeneratedText(response.data.description);
      } else {
        setGeneratedText("Description not found.");
      }
    } catch (error) {
      console.error("Error generating text:", error);
      setGeneratedText("Error generating text.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        )}
        <Pressable onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Pick an image</Text>
        </Pressable>
      </View>
      <Pressable onPress={generateText} style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate Text</Text>
      </Pressable>
      <View style={styles.generatedTextContainer}>
        {generatedText !== "" && (
          <Text style={styles.generatedText}>{generatedText}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  generateButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  generateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  generatedTextContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  generatedText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ImageModel;
