import React from 'react';
import RecipeList from '../components/RecipeList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = (props) => {
  const favRecipes = useSelector((state) => state.recipes.favoriteRecipes);

  if (favRecipes.length === 0 || !favRecipes) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite recipes found. Start adding some!</DefaultText>
      </View>
    );
  }

  return <RecipeList listData={favRecipes} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Favorite Recipes',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
