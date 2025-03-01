import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const BannerText = ({ totalAmount }: { totalAmount: number }) => {
    return (
        <View>
            <Animated.Text style={styles.bannerText}>CAT FOOD TRACKER 🐱 | Essen insgesamt: {totalAmount}g</Animated.Text>
        </View>

    );
};

const styles = StyleSheet.create({
    bannerText: {
        flex: 1,
        textTransform: "uppercase",
        animationDirection: "right",
        fontFamily: "Consolas",
        fontSize: 15,
        padding: 10,
        color: "#71a5de",
        fontWeight: "bold"
    }
});

export default BannerText;
