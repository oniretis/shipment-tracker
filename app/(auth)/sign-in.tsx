import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";

import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    url: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        "https://shippex-demo.bc.brandimic.com/api/method/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: (() => {
            const formData = new FormData();
            formData.append("usr", form.email);
            formData.append("pwd", form.password);
            return formData;
          })(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.");
      }

      const result = await response.json();

      if (result.message) {
        setUser(result.message); // Assuming 'message' contains user data.
        setIsLogged(true);

        Alert.alert("Success", "User signed in successfully");
        router.replace("/home");
      } else {
        throw new Error("Invalid login credentials.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary-100 h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 200,
          }}
        >
          <Text className="text-3xl font-semibold text-neutral-900 mt-10 font-psemibold">
            Login
          </Text>
          <Text className="text-lg font-pregular mt-10 text-[#757281]">
            Please enter your first, last name, and your phone number in order
            to register.
          </Text>

          <FormField
            title="URL"
            placeholder="URL"
            value={form.url}
            handleChangeText={(e) => setForm({ ...form, url: e })}
            otherStyles="mt-7"
            keyboardType="web-search"
          />
          <FormField
            title="Username/Email"
            placeholder="Username/Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-32"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
