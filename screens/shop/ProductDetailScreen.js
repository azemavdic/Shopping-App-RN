import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Button,
    View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import { addToCart } from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId');

    const dispatch = useDispatch()

    const selectedProduct = useSelector((state) =>
        state.products.availableProducts.find(
            (product) => product.id === productId
        )
    );
    return (
        <ScrollView>
            <Image
                source={{ uri: selectedProduct.imageUrl }}
                style={styles.image}
            />
            <View style={styles.actions}>
                <Button
                    title='Dodaj u korpu'
                    onPress={() => {
                        dispatch(addToCart(selectedProduct))
                    }}
                    color={Colors.primary}
                />
            </View>
            <Text style={styles.price}>
                {selectedProduct.price.toFixed(2)} KM
            </Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('productTitle'),
    };
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    actions: {
        alignItems: 'center',
        marginVertical: 15,
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 10,
    },
});
