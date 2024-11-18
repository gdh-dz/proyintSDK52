import { logIn } from "@/services/auth"; // Import the login function
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const navigation = useNavigation(); // Initialize navigation
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Se requiere correo y contraseña para entrar");
      return;
    }

    setLoading(true);
    try {
      await logIn(email, password); // Call the login function
      Alert.alert("Éxito", "Se ha iniciado sesión");
     // navigation.navigate("Home"); // Navigate to Explore or your main screen
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar la sesión. Intenta de nuevo");
      console.error("Hubo un error iniciando sesión", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/SignUp3.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.outerFrame}>
        <TouchableOpacity style={styles.switchButton}>
          <Text style={styles.switchButtonText}>Log In / Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#A8A8A8"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#A8A8A8"
          />
        </View>
        <TouchableOpacity
          style={[styles.registerButton, { opacity: loading ? 0.6 : 1 }]}
          onPress={loading ? undefined : handleLogin}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? "Logging in" : "Log in"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    opacity: 1,
  },
  registerButton: {
    borderRadius: 20,
    backgroundColor: '#5F7F1E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  outerFrame: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: "rgba(37, 104, 71, .9)",
    borderRadius: 20,
    alignItems: "center",
    width: width * 0.8,
    maxWidth: 400,
  },
  buttonBox:{
    padding: 10, // This combines paddingHorizontal and paddingVertical
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  loginswitch:{
    width: 80, 
    height: 40,
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: '#5F7F1E', 
  },
  signupswitch:{
    flexDirection: 'row', // Adjust this to 'column' if you want vertical stacking
    paddingHorizontal: 10, // For horizontal padding (0px top/bottom, 10px left/right)
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#5F7F1E",
    paddingHorizontal: 15,
    marginBottom: 41,
  },
  switchButtonText: {
    fontSize: 16,
    color: "#ffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "regular",
    textAlign: "center",
    marginBottom: 41,
    color: "#FFFF",
  },
  inputContainer: {
    width: '100%',
    marginBottom: 50,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
    backgroundColor: "#fff",
    width: '100%',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'medium',
  },
  
});
