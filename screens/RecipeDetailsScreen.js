import React, { useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/recipes';

const ListItem = (props) => (
  <View style={styles.listItem}>
    <DefaultText>{props.children}</DefaultText>
  </View>
);

const RecipeDetailsScreen = (props) => {
  const availableRecipes = useSelector((state) => state.recipes.recipes);
  const recipeId = props.navigation.getParam('recipeId');
  const currentRecipeIsFavorite = useSelector((state) =>
    state.recipes.favoriteRecipes.some((recipe) => recipe.id === recipeId)
  );
  const selectedRecipe = availableRecipes.find(
    (recipe) => recipe.id === recipeId
  );
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(recipeId));
  }, [dispatch, recipeId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentRecipeIsFavorite });
  }, [currentRecipeIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedRecipe.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedRecipe.duration}m</DefaultText>
        <DefaultText>{selectedRecipe.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedRecipe.affordability}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedRecipe.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedRecipe.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
      <View style={styles.screen}>
        <Text>{selectedRecipe.title}</Text>
        <Button
          title="Go Back to Categories"
          onPress={() => {
            props.navigation.popToTop();
          }}
        />
      </View>
    </ScrollView>
  );
};

RecipeDetailsScreen.navigationOptions = (navigationData) => {
  const recipeTitle = navigationData.navigation.getParam('recipeTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');
  return {
    headerTitle: recipeTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '20%',
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default RecipeDetailsScreen;
