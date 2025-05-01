import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Modal,TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "react-native-paper";


export default function TodoList() {
  const [data, setData] = useState([{ id: 1, name: "Listador de tareas" }]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );
  const addItem = () => {
    const newItem = {
      id: data.length + 1,
      name: `Tarea ${newItemName}`
    };
    setData((prevData) => [...prevData, newItem]);
    setModalVisible(false);
    setNewItemName("");
  };

  const handleInputChange = (e) => {
    setNewItemName(e.target.value);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
        />
        <Modal  animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          style={styles.modalContainer}>
          <View>
            <TextInput placeholder="Enter a todo" style={{ borderWidth: 1, padding: 8 }}  onChange={(e)=>handleInputChange(e)}/>
            <Button title="Add" onPress={addItem} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
        <FAB style={styles.fab} icon="plus" color="white" onPress={()=>setModalVisible(true)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: "#ddd",
    borderRadius: 5
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#6200ee"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
});
