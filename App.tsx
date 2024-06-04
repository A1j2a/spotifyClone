import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ModalPortal } from "react-native-modals";
import { PlayerContext } from "./PlayerContext";
import Navigation from "./StackNavigator";
import { Buffer } from "buffer";
import { apiConstant } from "./components/api/constant";
import { callApi } from "./components/api/ApiManages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { asyncStorageKey, setData } from "./components/GConstant";
import { useEffect } from "react";
export default function App() {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(
      apiConstant.client_id + ":" + apiConstant.client_secret
    ).toString("base64")}`,
  };
  const fetchData = async () => {
    try {
      const result = await callApi("POST", "api/token", headers);
      AsyncStorage.setItem("token", JSON.stringify(result.access_token));
      setData(asyncStorageKey.token, result.access_token);
      console.log(result.access_token);
      
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("headers");
    fetchData();
  }, []);
  
  return (
    <>
      <PlayerContext>
        <Navigation />
        <ModalPortal/>
      </PlayerContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
