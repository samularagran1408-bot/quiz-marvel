import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { MovieCard } from '../components/timeline/MovieCard';
import { Header } from '../components/common/Header';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useMarvelData } from '../hooks/useMarvelData';
import { colors } from '../styles/colors';

const TimelineScreen = () => {
  const { loading, timeline } = useMarvelData();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <Header title="Cronología MCU" showBackButton={true} />
      <FlatList
        data={timeline}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            year={item.year}
            phase={item.phase}
            order={item.order}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
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
    paddingVertical: 10,
  },
});

export default TimelineScreen;