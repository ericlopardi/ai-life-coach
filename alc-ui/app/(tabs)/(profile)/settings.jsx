import React from 'react'; 
import { View, Text } from 'react-native';
import AppLayout from '../../../components/AppLayout.js';

export default function Settings() {
    return (
        <AppLayout noScroll>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: '#111' }}>Root Settings Page</Text>
            </View>
        </AppLayout>    
    );
}