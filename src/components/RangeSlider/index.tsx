import React, { useCallback, useState } from "react";
import RangeSliderRN from "rn-range-slider";
import { View, } from "react-native";
import { Text } from '@ui-kitten/components'

import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Thumb from "./Thumb";
import { formatMoney } from "../../utils/format";

const RangeSlider: React.FC<any> = ({ from, to, onChange }) => {
    const [low, setLow] = useState(from);
    const [high, setHigh] = useState(to);

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);

    const handleValueChange = useCallback(
        (newLow: number, newHigh: number) => {
            onChange && onChange([newLow, newHigh])
            setLow(newLow);
            setHigh(newHigh);
        },
        [setLow, setHigh]
    );

    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 10
                }}
            >
                <View>
                    <Text category="label">Mínimo</Text>
                    <Text category="h6">{formatMoney(low)}</Text>
                </View>
                <View
                    style={{
                        alignItems: 'flex-end',
                    }}
                >
                    <Text category="label">Máximo</Text>
                    <Text category="h6">{formatMoney(high)}</Text>
                </View>
            </View>
            <RangeSliderRN
                min={from}
                max={to}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                onValueChanged={handleValueChange}
            />
        </>
    );
};

export default RangeSlider;
