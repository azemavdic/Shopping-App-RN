import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
} from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            };
        case UPDATE_PRODUCT:
            const prodIndex = state.userProducts.findIndex((prod) => {
               return prod.id === action.pid;
            });

            const updatedProduct = new Product(
                action.pid, //zadržati id
                state.userProducts[prodIndex].ownerId, //zadržati ownerId
                action.productData.title, // novi title
                action.productData.imageUrl, // novi image
                action.productData.description, // novi description
                state.userProducts[prodIndex].price // zadržati price
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[prodIndex] = updatedProduct;

            const availprodIndex = state.availableProducts.findIndex((prod) => {
                prod.id === action.pid;
            });
            const updatedAvailProducts = [...state.availableProducts];
            updatedAvailProducts[availprodIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailProducts,
                userProducts: updatedUserProducts,
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    (product) => product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
                    (product) => product.id !== action.pid
                ),
            };
    }
    return state;
};
