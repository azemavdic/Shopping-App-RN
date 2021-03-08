import React from 'react';
import {Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const ProductsOverviewScreen = () => {
    const products = useSelector((state) => state.products.availableProducts);
    const renderItem = (itemData) => {
        return (
            <View>
                <Text>{itemData.item.title}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
};

ProductsOverviewScreen.navigationOptions={
    headerTitle: 'Početna'
}

export default ProductsOverviewScreen;

