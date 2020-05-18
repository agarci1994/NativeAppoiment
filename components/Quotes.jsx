import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

const Quotes = ({ items, deletePatient}) => {

const deleteQuotes = id => deletePatient(id)

  return (
    <View style={styles.quote}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.text}>{items.patient}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propietario:</Text>
        <Text style={styles.text}>{items.owner}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas:</Text>
        <Text style={styles.text}>{items.symptoms}</Text>
      </View>

      <View>
        <TouchableHighlight onPress={ () => deleteQuotes(items.id)} style={styles.btnDelete}>
          <Text style={styles.textDelete}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quote: {
    backgroundColor: "#FFF",
    borderBottomColor: "#e1e1e1",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
  },
  btnDelete: {
    padding: 10,
    backgroundColor: "red",
    marginVertical: 10,
  },
  textDelete: {
    color: "#FFF",
    fontWeight: 'bold',
    textAlign: "center"
  },
});

export default Quotes;
