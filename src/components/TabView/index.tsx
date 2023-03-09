import { Text } from '@ui-kitten/components';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Tab = {
  Icon: any;
  label: string;
};

type Props = {
  tabs: Tab[];
  tabStyle?: object;
  tabBarStyle?: object;
  selectedIndex: number;
  tabTextStyle?: object;
  activeTabStyle?: object;
  checkoutStep1Done: boolean;
  checkoutStep2Done: boolean;
  activeTabTextStyle?: object;
  onSelect: (index: number) => void;
};

export default function TabView(props: Props) {
  const {
    tabs,
    onSelect,
    tabStyle,
    tabBarStyle,
    tabTextStyle,
    selectedIndex,
    activeTabStyle,
    checkoutStep1Done,
    checkoutStep2Done,
    activeTabTextStyle,
  } = props;

  return (
    <View style={[styles.tabBar, tabBarStyle]}>
      {tabs.map(({ label, Icon }, index) => {
        const isSelected = index === selectedIndex;

        return (
          <TouchableOpacity
            key={label}
            style={[
              styles.tab,
              tabStyle,
              isSelected ? [styles.activeTab, activeTabStyle] : undefined,
            ]}
            onPress={() => {
              if (index !== 2 && checkoutStep1Done) {
                return onSelect(index);
              }
              if (checkoutStep2Done) {
                return onSelect(index);
              }
            }}
          >
            <Text
              category='s1'
              style={[
                tabTextStyle,
                isSelected
                  ? [styles.activeTabText, activeTabTextStyle]
                  : undefined,
                { textAlign: 'center' },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#222B45',
  },

  activeTabText: {
    fontWeight: 'bold',
  },
});
