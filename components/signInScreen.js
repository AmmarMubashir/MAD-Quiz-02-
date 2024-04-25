import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Sign In</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={true}
        />
        <Pressable
          onPress={handleSignIn}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}
        >
          <Text style={styles.btnText}>
            {loading ? "Processing..." : "Sign In"}
          </Text>
        </Pressable>
        {/* Sign up navigation */}
        <Pressable
          onPress={() => navigation.navigate("SignUp")}
          style={styles.signUpContainer}
        >
          <Text style={styles.noAccountLabel}>
            Don't have an account?{"  "}
            <Text style={styles.signUpLabel}>Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Changed background color
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Changed form container background color
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Added elevation for shadow effect
  },
  appName: {
    color: "#333", // Changed app name color
    fontSize: 36,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F2F4F8", // Changed input background color
    padding: 12,
    height: 48,
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB", // Changed border color
  },
  errorText: {
    color: "#E53E3E",
    alignSelf: "center",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#4C51BF", // Changed button background color
    padding: 14,
    height: 50,
    borderRadius: 8,
    width: "100%",
    marginTop: 20,
  },
  btnText: {
    color: "#FFFFFF", // Changed button text color
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 20,
  },
  noAccountLabel: {
    color: "#718096",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  signUpLabel: {
    color: "#4C51BF", // Changed sign up label color
  },
});

export default SignInScreen;
