import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Button,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId');

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
                    onPress={() => {}}
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
    actions:{
        alignItems:'center',
        marginVertical:15
    },
    price:{
        fontSize:18,
        color:'#888',
        textAlign:'center',
        marginVertical:20
    },
    description:{
        fontSize:14,
        textAlign:'center',
        marginHorizontal:10
    }
});
