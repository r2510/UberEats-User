import {StyleSheet } from "react-native";
export default StyleSheet.create({
    page: {
        flex: 1
    },
    iconContainer: {
        position: 'absolute',
        top: 22,
        left: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 5 / 3
    },
    container: {
        margin: 10
    },
    title: {
        fontSize: 35,
        fontWeight: '700',
        marginVertical: 10
    },
    subtitle: {
        fontSize: 16,
        color: '#525252'
    },
    menuTitle:{
        marginTop:10,
        fontSize:18,
        letterSpacing:0.5
    }
});