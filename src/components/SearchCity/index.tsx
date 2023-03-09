import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Keyboard, KeyboardEventName, Platform } from 'react-native';
import City from '../../interfaces/City';
import { CityService } from '../../services';
interface SearchCityProps {
  query: string;
  disabled?: boolean;
  setQuerySearch: React.Dispatch<React.SetStateAction<string>>;
  setValue: (value: any) => void;
}

const showEvent = Platform.select({
  android: 'keyboardDidShow',
  default: 'keyboardWillShow',
});

const hideEvent = Platform.select({
  android: 'keyboardDidHide',
  default: 'keyboardWillHide',
});

const SearchCity: React.FC<SearchCityProps> = ({
  query,
  disabled,
  setValue,
  setQuerySearch,
}) => {
  const [dataCities, setDataCities] = useState<City[]>([]);
  const [placement, setPlacement] = React.useState('bottom');

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      showEvent as KeyboardEventName,
      () => {
        setPlacement('top');
      },
    );

    const keyboardHideListener = Keyboard.addListener(
      hideEvent as KeyboardEventName,
      () => {
        setPlacement('bottom');
      },
    );

    const getData = setTimeout(() => {
      if (query.length > 3) {
        CityService.readCities({ name: query }).then((response) => {
          setDataCities(response.data);
        });
      }
    }, 800);

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
      clearTimeout(getData);
    };
  }, [query]);

  const renderOption = (item: City, index: number) => (
    <AutocompleteItem key={index} title={`${item.name} - ${item.uf}`} />
  );

  return (
    <Autocomplete
      value={query}
      label='Cidade'
      placement={placement}
      placeholder='Digite o nome da cidade'
      onSelect={(idx) => {
        setValue(dataCities[idx].id);
        setQuerySearch(`${dataCities[idx].name} - ${dataCities[idx].uf}`);
      }}
      onChangeText={(value) => {
        setQuerySearch(value);
      }}
      disabled={disabled}
    >
      {dataCities.map(renderOption)}
    </Autocomplete>
  );
};

export default SearchCity;
