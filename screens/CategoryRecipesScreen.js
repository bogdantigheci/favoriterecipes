import React from 'react';
import { CATEGORIES } from '../data/dummy-data';
import RecipeList from '../components/RecipeList';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const CategoryRecipesScreen = (props) => {
  const categoryId = props.navigation.getParam('categoryId');

  const availableRecipes = useSelector(
    (state) => state.recipes.filteredRecipes
  );

  const displayedRecipes = availableRecipes.filter(
    (recipe) => recipe.categoryIds.indexOf(categoryId) >= 0
  );
  if (displayedRecipes.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No recipes found, maybe check your filters!?</DefaultText>
      </View>
    );
  }

  return (
    <RecipeList listData={displayedRecipes} navigation={props.navigation} />
  );
};

CategoryRecipesScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryRecipesScreen;
