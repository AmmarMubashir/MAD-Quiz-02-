import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
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
        <Text style={styles.appName}>Sign Up</Text>
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
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry={true}
        />
        <Pressable onPress={handleSignUp} style={styles.btn}>
          <Text style={styles.btnText}>
            {loading ? "Processing..." : "Sign Up"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("SignIn")}
          style={styles.loginContainer}
        >
          <Text style={styles.haveAccountLabel}>
            Already have an account?{"  "}
            <Text style={styles.loginLabel}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F9", // Changed background color
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
    color: "#2C3E50", // Changed app name color
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ECF0F3", // Changed input background color
    padding: 12,
    height: 48,
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
  },
  errorText: {
    color: "#E74C3C",
    alignSelf: "center",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#3498DB", // Changed button background color
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
  loginContainer: {
    marginTop: 30,
  },
  haveAccountLabel: {
    color: "#2C3E50",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  loginLabel: {
    color: "#3498DB",
  },
});

export default SignUpScreen;
