import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import RecipeItem from './RecipeItem';
import { useSelector } from 'react-redux';

const RecipeList = (props) => {
  const favoriteRecipes = useSelector((state) => state.recipes.favoriteRecipes);
  const renderRecipeItem = (itemData) => {
    const isFavorite = favoriteRecipes.some(
      (recipe) => recipe.id === itemData.item.id
    );
    return (
      <RecipeItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectRecipe={() => {
          props.navigation.navigate({
            routeName: 'RecipeDetails',
            params: {
              recipeId: itemData.item.id,
              recipeTitle: itemData.item.title,
              isFav: isFavorite,
            },
          });
        }}
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        style={{ width: '100%' }}
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderRecipeItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecipeList;
