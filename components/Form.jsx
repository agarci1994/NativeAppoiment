import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid'

const Form = ({ quotes, setQuotes, setViewForm}) => {
  const [patient, setPatient] = useState("");
  const [owner, setOwner] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [phone, setPhone] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmDate = (date) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const dateSpanish = date.toLocaleDateString("es-ES", options);
    setDate(dateSpanish);
    hideDatePicker();
  };
  const confirmTime = (time) => {
    const options = { hour: "numeric", minute: "2-digit", hour12: false };
    const timeSpanish = time.toLocaleString("en-US", options);
    setTime(timeSpanish);
    hideTimePicker();
  };

  const createNewQuote = () => {
      if (patient === "" || owner === "" || phone === "" || date === "" || time === "" || symptoms === "")
      {viewAlert()}
      const quote = { patient, owner, phone, date, time, symptoms}
      quote.id = shortid.generate()
      const newQuotes = [...quotes, quote]
      setQuotes(newQuotes)
      setViewForm(false)
  }

  const viewAlert = () => Alert.alert("Error", "Todos los campos son obligatorios", [{text: "OK"}])

  return (
    <>
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Paciente:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPatient(text)}
        />
        <Text style={styles.label}>Dueño:</Text>
        <TextInput
          onChangeText={(text) => setOwner(text)}
          style={styles.input}
        />
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPhone(text)}
          keyboardType="numeric"
        />
        <View>
          <Text style={styles.label}>Fecha:</Text>

          <Button title="Seleccionar fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmDate}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige una fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{date}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>

          <Button title="Seleccionar hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmTime}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{time}</Text>
        </View>
        <Text style={styles.label}>Sintomas:</Text>
        <TextInput
          multiline
          onChangeText={(text) => setSymptoms(text)}
          style={styles.input}
        />
        <View>
          <TouchableHighlight
            onPress={() => createNewQuote()}
            style={styles.btnCreate}
          >
            <Text style={styles.textCreate}>Crear nueva cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderStyle: "solid",
  },
  btnCreate: {
    padding: 10,
    backgroundColor: "#7d024e",
    marginVertical: 10,
  },
  textCreate: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default Form;
