// shopify.js

import fetch from 'node-fetch';

const SHOPIFY_API_URL = 'https://your-shopify-store.myshopify.com/admin/api/';
const ACCESS_TOKEN = 'your_access_token'; // Replace with your actual access token

// Function to get all products
export const getProducts = async () => {
    const response = await fetch(`${SHOPIFY_API_URL}products.json`, {
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': ACCESS_TOKEN,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data.products;
};

// Function to get all collections
export const getCollections = async () => {
    const response = await fetch(`${SHOPIFY_API_URL}custom_collections.json`, {
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': ACCESS_TOKEN,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data.custom_collections;
};

// Function to get shop information
export const getShopInfo = async () => {
    const response = await fetch(`${SHOPIFY_API_URL}shop.json`, {
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': ACCESS_TOKEN,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data.shop;
};