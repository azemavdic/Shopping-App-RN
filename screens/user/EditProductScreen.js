import React, { useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import { createProduct, updateProduct } from "../../store/actions/products";

const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.value,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    {
      inputValues: {
        title: editedProduct ? editedProduct.title : "",
        image: editedProduct ? editedProduct.imageUrl : "",
        description: editedProduct ? editedProduct.description : "",
        price: "",
      },
      inputValidities: {
        title: editedProduct ? true : false,
        image: editedProduct ? true : false,
        description: editedProduct ? true : false,
        price: editedProduct ? true : false,
      },
      formIsValid: editedProduct ? true : false,
    },
    init
  );

  const submitHandler = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert("Pogrešan unos", "Molimo unesite naziv proizvoda", [
        { text: "OK" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(updateProduct(prodId, title, description, image));
    } else {
      dispatch(createProduct(title, description, image, +price));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, description, image, price, titleIsValid]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    } else {
    }
    dispatchFormState({
      type: FORM_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Naziv</Text>
          <TextInput
            style={styles.input}
            placeholder='Naziv proizvoda'
            value={title}
            onChangeText={textChangeHandler.bind(this, "title")}
            returnKeyType='next'
            onEndEditing={() => {}}
            onSubmitEditing={() => {}}
          />
          {!titleIsValid && <Text>Upišite validan naziv</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Slika (url)</Text>
          <TextInput
            style={styles.input}
            placeholder='Slika proizvoda'
            value={image}
            onChangeText={textChangeHandler.bind(this, "image")}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Cijena</Text>
            <TextInput
              style={styles.input}
              placeholder='Cijena proizvoda'
              value={price}
              onChangeText={textChangeHandler.bind(this, "price")}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Opis</Text>
          <TextInput
            style={styles.input}
            placeholder='Opis proizvoda'
            value={description}
            onChangeText={textChangeHandler.bind(this, "description")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const subHand = navData.navigation.getParam("submit");

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
          onPress={subHand}
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
