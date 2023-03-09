import { StyleService } from '@ui-kitten/components';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const uiStyles = StyleService.create({
    wrapper: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : getStatusBarHeight()
    },

    item: {
        borderBottomWidth: 1,
        borderBottomColor: 'background-basic-color-3',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 0.5,
        paddingVertical: 28,
        paddingHorizontal: 16,
    },

    checkoutButton: {
        marginHorizontal: 16,
        marginVertical: 24,
    },
});
