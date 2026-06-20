import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MovieCard } from '../components/timeline/MovieCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useMarvelData } from '../hooks/useMarvelData';
import { colors } from '../styles/colors';

const TimelineScreen = () => {
  const { loading, timeline } = useMarvelData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('all');

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredMovies = timeline.filter((movie) => {
    const matchTitle = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchPhase = selectedPhase === 'all' || movie.phase === selectedPhase;
    return matchTitle && matchPhase;
  });

  const getUniquePhases = () => {
    const phases = timeline.map((movie) => movie.phase);
    return [...new Set(phases)].sort();
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const renderHeader = () => (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar película..."
          placeholderTextColor={colors.textSecondary}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {searchTerm !== '' && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        <TouchableOpacity
          style={[styles.filterButton, selectedPhase === 'all' && styles.activeFilter]}
          onPress={() => setSelectedPhase('all')}
        >
          <Text style={[styles.filterText, selectedPhase === 'all' && styles.activeFilterText]}>
            Todas
          </Text>
        </TouchableOpacity>

        {getUniquePhases().map((phase) => (
          <TouchableOpacity
            key={phase}
            style={[styles.filterButton, selectedPhase === phase && styles.activeFilter]}
            onPress={() => setSelectedPhase(phase)}
          >
            <Text style={[styles.filterText, selectedPhase === phase && styles.activeFilterText]}>
              Fase {phase}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.resultCount}>
        {filteredMovies.length} película{filteredMovies.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            year={item.year}
            phase={item.phase}
            order={item.order}
          />
        )}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron películas</Text>
            <Text style={styles.emptySubtext}>Prueba con otro término de búsqueda</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    color: colors.text,
    fontSize: 16,
  },
  clearButton: {
    padding: 12,
  },
  clearText: {
    color: colors.textSecondary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: colors.text,
  },
  resultCount: {
    color: colors.textSecondary,
    fontSize: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: colors.text,
    fontWeight: 'bold',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
});

export default TimelineScreen;
