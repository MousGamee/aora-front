import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustumButton = ({ title, handlePress, containerStyle, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={.7}
            disabled={isLoading}
            className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}>
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustumButton