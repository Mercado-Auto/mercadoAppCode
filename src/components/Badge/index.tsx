import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export type IBadgeProps = {
  isSelected?: boolean;
  onPress?: () => void;
  children?: (props: any, theme: Record<string, string>) => React.ReactNode;
};

const Badge: React.FC<IBadgeProps> = ({
  isSelected,
  children,

  ...rest
}) => {
  const theme = useTheme();

  return (
    <TouchableWithoutFeedback
      style={{
        marginRight: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme['border-basic-color-5'],
        backgroundColor: isSelected
          ? theme['background-basic-color-4']
          : theme['background-primary-default'],
      }}
      {...rest}
    >
      {children?.(
        {
          style: {
            color: isSelected
              ? theme['color-basic-color-4']
              : theme['color-primary-default'],
          },
        },
        theme,
      )}
    </TouchableWithoutFeedback>
  );
};

export default Badge;
