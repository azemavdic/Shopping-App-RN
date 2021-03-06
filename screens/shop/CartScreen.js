import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import Card from '../../components/UI/Card';

const CartScreen = (props) => {
    const dispatch = useDispatch();

    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => {
        const arrayCartItems = [];
        for (const key in state.cart.items) {
            arrayCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return arrayCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    UKUPNO:{' '}
                    <Text style={styles.amount}>
                        {Math.round(cartTotalAmount.toFixed(2) * 100) / 100} KM
                    </Text>{' '}
                </Text>
                <Button
                    color={Colors.accent}
                    title='Naruči'
                    onPress={() => {
                        dispatch(addOrder(cartItems, cartTotalAmount));
                    }}
                    disabled={cartItems.length === 0}
                />
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.productId}
                renderItem={(itemData) => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(removeFromCart(itemData.item.productId));
                        }}
                    />
                )}
            />
        </View>
    );
};

CartScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Korpa',
    };
};

export default CartScreen;

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary,
    },
});
