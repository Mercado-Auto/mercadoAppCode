import { Button, Input, Text } from '@ui-kitten/components';
import React from 'react';
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Toast from 'react-native-toast-message';
import Badge from '../../../../components/Badge';
import RangeSlider from '../../../../components/RangeSlider';
import Section from '../../../../interfaces/Section';
import Tag from '../../../../interfaces/Tag';
import { readSections } from '../../../../services/section';
import { readTags } from '../../../../services/tag';

export type IFiltersOptions = {
    name?: string;
    tags?: string[];
    sections?: string[];
    price?: number[];
}

export type IFiltersProps = {
    filters?: IFiltersOptions;
    onFilter: (filters: IFiltersProps['filters']) => void;
};

const MIN_SLIDER = 1;
const MAX_SLIDER = 5_000;

const Filters: React.FC<IFiltersProps> = ({
    filters: _initialFilters,
    onFilter,
}) => {
    const id$ = React.useId();
    const [isLoading, setIsLoading] = React.useState(true);
    const [cancelController, setCancelController] = React.useState(
        new AbortController(),
    );
    const [filters, setFilters] =
        React.useState<IFiltersProps['filters']>(_initialFilters);

    // Tags
    const [tags, setTags] = React.useState<Tag[]>([]);
    const [sections, setSections] = React.useState<Section[]>([]);

    const load = async () => {
        if (cancelController.signal.aborted) {
            setCancelController(new AbortController());
        }
        setIsLoading(true);
        try {
            const tagsResponse = await readTags();
            setTags(tagsResponse.data);
            const sectionsResponse = await readSections();
            setSections(sectionsResponse.data);
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao buscar os dados',
                text2: 'Por favor, tente novamente mais tarde!',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateText = (_value?: string) => {
        setFilters({ ...filters, name: _value });
    };

    const handleSelectTag = (_tag: Tag) => {
        const _tags: string[] = filters?.tags || [];
        const alreadyInIndex = _tags.findIndex((id) => _tag.id === id);
        if (alreadyInIndex > -1) {
            _tags.splice(alreadyInIndex, 1);
        } else {
            _tags.push(_tag.id);
        }
        setFilters({ ...filters, tags: _tags });
    };

    const handleSelectSection = (_section: Section) => {
        const _sections: string[] = filters?.sections || [];
        const alreadyInIndex = _sections.findIndex((id) => _section.id === id);
        if (alreadyInIndex > -1) {
            _sections.splice(alreadyInIndex, 1);
        } else {
            _sections.push(_section.id);
        }
        setFilters({ ...filters, sections: _sections });
    };

    const handleUpdatePrice = (prices: number[]) => {
        setFilters({ ...filters, price: prices });
    };

    React.useEffect(() => {
        load();
    }, []);

    return (
        <>


            <Input
                style={styles.input}
                size='medium'
                placeholder='Pesquisar por nome...'
                value={filters?.name}
                onChangeText={handleUpdateText}
            />

            <View style={styles.horizonContainer}>
                <Text category='h6'>Categorias:</Text>

                <ScrollView
                    style={styles.horizonScrolledView}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {isLoading && <ActivityIndicator />}

                    {!isLoading && sections.map((section, index) => (
                        <TouchableOpacity
                            key={`${id$}-section-${index}`}
                            onPress={() => handleSelectSection(section)}>
                            <Badge

                                isSelected={filters?.sections?.includes(section.id)}
                            >
                                {(props) => <Text {...props}>{section.name}</Text>}
                            </Badge>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.horizonContainer}>
                <Text category='h6'>Tags:</Text>

                <ScrollView
                    style={styles.horizonScrolledView}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {isLoading && <ActivityIndicator />}

                    {!isLoading && tags.map((tag, index) => (
                        <TouchableOpacity
                            key={`${id$}-tag-${index}`}
                            onPress={() => handleSelectTag(tag)}
                        >
                            <Badge

                                isSelected={filters?.tags?.includes(tag.id)}
                            >
                                {(props) => <Text {...props}>{tag.name}</Text>}
                            </Badge>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.horizonContainer}>
                <Text category='h6'>
                    Preço:
                </Text>

                <RangeSlider
                    from={MIN_SLIDER}
                    to={MAX_SLIDER}
                    onChange={handleUpdatePrice}
                />
            </View>

            <Button
                style={styles.blockFilterButton}
                onPress={() => onFilter?.(filters)}
            >
                Filtrar
            </Button>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
    },
    input: {
        paddingBottom: 20,
    },
    horizonContainer: {
        marginHorizontal: 0,
        marginBottom: 10,
    },
    blockFilterButton: {
        marginHorizontal: 0,
        marginBottom: 10,
    },
    horizonScrolledView: {
        marginTop: 10,
        width: '100%',
    },
});

export default Filters;
