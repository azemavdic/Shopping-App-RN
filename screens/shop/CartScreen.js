import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const CartScreen = (props) => {
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const arrayCartItems = []
        for (const key in state.cart.items) {
            arrayCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return arrayCartItems
    })
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    UKUPNO:{' '}
                    <Text style={styles.amount}>{cartTotalAmount.toFixed(2)} KM</Text>{' '}
                </Text>
                <Button color={Colors.accent} title='Naruči' onPress={() => {}} disabled={cartItems.length === 0 } />
            </View>
            <View>
                <Text>Narudžba</Text>
                {cartItems}
            </View>
        </View>
    );
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
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize:18
    },
    amount: {
        color: Colors.primary
    },
});
