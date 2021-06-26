import React from 'react'
import { View } from 'react-native'

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 5 }}>
            <View style={{ flex: 1, borderLeftColor: '#EFEFF0', borderLeftWidth: 1 }}></View>
        </View>
    )
}

export {LineDivider}