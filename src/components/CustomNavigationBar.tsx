import React from 'react';
import { useTheme, Switch, Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { PreferencesContext } from './PreferencesContext';

export default function CustomNavigationBar({ navigation, route, options, back }) {
    const title  = getHeaderTitle(options, route.name)

    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

    return (
        <Appbar.Header
            theme={{
                colors: {
                    primary: theme?.colors.surface,
                },
            }}
        >
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
                <Switch
                    color={'white'}
                    value={isThemeDark}
                    onValueChange={toggleTheme}
                />
        </Appbar.Header>
    );
}