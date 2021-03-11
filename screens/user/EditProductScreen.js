import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === prodId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [image, setImage] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Naziv</Text>
          <TextInput
            style={styles.input}
            placeholder='Naziv proizvoda'
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Slika (url)</Text>
          <TextInput
            style={styles.input}
            placeholder='Slika proizvoda'
            value={image}
            onChangeText={(image) => setImage(image)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Cijena</Text>
            <TextInput
              style={styles.input}
              placeholder='Cijena proizvoda'
              value={price}
              onChangeText={(price) => setPrice(price)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Opis</Text>
          <TextInput
            style={styles.input}
            placeholder='Opis proizvoda'
            value={description}
            onChangeText={(desc) => setDescription(desc)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Proizvoda"
      : "Dodaj Proizvod",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Snimi'
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
