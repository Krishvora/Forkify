//4f1ff6cef77b4a14abd3775e664a233d 

//https://api.spoonacular.com/recipes/search

import Search from './models/Search';
import * as searchView from './views/searchView';
import * as RecipeView from './views/recipeView';
import * as listViews from './views/listViews';
import * as likesView from './views/likesView';
import {elements, renderLoader,clearLoader} from './views/base';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

const state = {};


const controlSearch = async() =>{
    // get query
    const query = searchView.getInput();
    
    if(query){
        //1)
        state.search = new Search(query);
        // 2) UI results preparations
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try{

            await state.search.getResults();
            clearLoader();
            searchView.renderResults(state.search.result);

        }catch(error){
         
            alert('Something went wrong with the search...');
        }
    }
}

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
    }
})

///////

const controlRecipe = async()=>{
    const id = window.location.hash.replace('#','');

    if(id){
        
        RecipeView.clearRecipe();
        renderLoader(elements.recipe)

        if(state.search){
            searchView.highlightSelected(id);
        }

        state.recipe = new Recipe(id);
        try{

            await state.recipe.getRecipe();
            //Servings
            state.recipe.calcServings();
            //Render
           
            clearLoader();
            RecipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
            

        }catch(error){
            alert('Error processing recipe');
        }
    }
}

const controlList=()=>{
    if(!state.list)state.list = new List();
   

    state.recipe.ingredients.forEach(el=>{
        
        const item = state.list.addItem(el.amount,el.name,el.unit);
        listViews.renderItem(item);
    })
    
}


const controlLike = ()=>{
    if(!state.likes) state.likes = new Likes();
    const curid = state.recipe.id;

    if(!state.likes.isLiked(curid)){
        //Add like to state
        const newLike = state.likes.addLike(curid,state.recipe.title,state.recipe.time,state.recipe.img)
        //toggle like
        likesView.toggleLike(true);
        likesView.renderLike(newLike);
        //add to UI
    
    }else{
        state.likes.deleteLike(curid);
        likesView.toggleLike(false);
        likesView.deleteLike(curid);
       
        
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

elements.shopping.addEventListener('click',e=>{
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listViews.deleteItem(id);
    }else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value);
        state.list.updateCount(id,val);
    }
})

elements.recipe.addEventListener('click',e=>{
    if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();

    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});

['hashchange','load'].forEach(event =>{
    window.addEventListener(event,controlRecipe);
});

//
window.addEventListener('load',()=>{

    state.likes = new Likes();

    state.likes.readStore();

    likesView.toggleLikeMenu(state.likes.getNumLikes());
    console.log(state.likes);
    state.likes.likes.forEach(like=>{
        likesView.renderLike(like);
    })
})