import React from "react";
import { ImageStyle, StyleSheet, View, ViewProps } from "react-native";
import {
  Button,
  ButtonElement,
  Icon,
  IconElement,
} from "@ui-kitten/components";

export interface RatingBarProps extends ViewProps {
  value: number;
  readonly: boolean;
  onValueChange?: (value: number) => void;
}

export const StarIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="star" style={styles.starIcon} />
);

export const RatingBar = (
  props: RatingBarProps
): React.ReactElement<ViewProps> => {
  const renderRateButtonElement = (value: number): ButtonElement => {
    const status: string = value <= props.value ? "warning" : "basic";

    if (props.readonly === true) {
      return (
        <Icon
          key={value}
          style={styles.starIcon}
          fill={value <= props.value ? "orange" : "#8F9BB3"}
          name="star"
        />
      );
    }

    return (
      <Button
        key={value}
        style={styles.iconButton}
        appearance="ghost"
        size="tiny"
        status={status}
        accessoryLeft={<StarIcon />}
        onPress={() => props.onValueChange && props.onValueChange(value)}
        disabled={props.readonly}
      />
    );
  };

  const { style, ...viewProps } = props;

  return (
    <View {...viewProps} style={[styles.container, style]}>
      {[1, 2, 3, 4, 5].map(renderRateButtonElement)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  starIcon: {
    width: 18,
    height: 18,
  },
});
