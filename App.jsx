import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Quotes from "./components/Quotes";
import Form from "./components/Form";
import asyncStorage from "@react-native-community/async-storage";
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
  const [viewForm, setViewForm] = useState(false);
  const [quotes, setQuotes] = useState([]);

  const deletePatient = (id) => {

    const appoimentFilter = newQuotes.filter((quotes) => quotes.id !== id));
    setQuotes(appoimentFilter)
    saveAppoiment(JSON.stringify(appoimentFilter))

  };
  const changeViewForm = () => setViewForm(!viewForm);
  const closeKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    const getAppoiment = async () => {
      try {
        const appoimentStorage = await AsyncStorage.getItem("appoiment");
        if (appoimentStorage) {
          setQuotes(JSON.parse(appoimentStorage));
        }
      } catch (error) {}
    };
    getAppoiment();
  }, []);

  const saveAppoiment = async (appoimentJSON) => {
    try {
      await asyncStorage.setItem("appoiment", appoimentJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.title}> Admnistrador de Tareas </Text>
        <View>
          <TouchableHighlight
            onPress={() => changeViewForm()}
            style={styles.btnView}
          >
            <Text style={styles.textView}>
              {viewForm ? "Ocultar formulario" : "Muestra el Formulario"}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          {viewForm ? (
            <>
              <Text style={styles.title}>Crear nueva cita</Text>
              <Form
                quotes={quotes}
                setQuotes={setQuotes}
                setViewForm={setViewForm}
                saveAppoiment={saveAppoiment}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>
                {quotes.length > 0 ? "Administra tus citas" : "No hay citas"}
              </Text>
              <FlatList
                style={styles.list}
                data={quotes}
                renderItem={({ item }) => (
                  <Quotes items={item} deletePatient={deletePatient} />
                )}
                keyExtractor={({ id }) => id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AA076B",
  },
  title: {
    color: "#FFF",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    marginHorizontal: "2.5%",
  },
  list: {
    flex: 1,
  },
  btnView: {
    padding: 10,
    backgroundColor: "#7d024e",
    marginVertical: 10,
  },
  textView: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
