import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Platform,
    Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import { createProduct, updateProduct } from '../../store/actions/products';

const EditProductScreen = (props) => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector((state) =>
        state.products.userProducts.find((product) => product.id === prodId)
    );

    const dispatch = useDispatch();

    const [title, setTitle] = useState(
        editedProduct ? editedProduct.title : ''
    );
    const [image, setImage] = useState(
        editedProduct ? editedProduct.imageUrl : ''
    );
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(
        editedProduct ? editedProduct.description : ''
    );

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(updateProduct(prodId, title, description, image));
        } else {
            dispatch(createProduct(title, description, image, +price));
        }
        props.navigation.goBack()
    }, [dispatch, prodId, title, description, image, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

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
    const subHand = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Proizvoda'
            : 'Dodaj Proizvod',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Snimi'
                    iconName={
                        Platform.OS === 'android'
                            ? 'md-checkmark'
                            : 'ios-checkmark'
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
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});
