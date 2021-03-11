import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';

const ProductsOverviewScreen = (props) => {
    const products = useSelector((state) => state.products.availableProducts);

    const dispatch = useDispatch();

    return (
        <FlatList
            data={products}
            renderItem={(itemData) => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title,
                        });
                    }}
                    onAddToCart={() => {
                        dispatch(addToCart(itemData.item));
                    }}
                />
            )}
            keyExtractor={(item) => item.id}
        />
    );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Početna',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Narudžba'
                    iconName={
                        Platform.OS === 'android' ? 'md-menu' : 'ios-menu'
                    }
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Korpa'
                    iconName={
                        Platform.OS === 'android' ? 'md-cart' : 'ios-cart'
                    }
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                />
            </HeaderButtons>
        ),
    };
};

export default ProductsOverviewScreen;
