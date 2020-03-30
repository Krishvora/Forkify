import axios from 'axios';
import {key,proxy} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`${proxy}https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}&includeNutrition=false`);
            this.title = res.data.title;
            this.time = res.data.readyInMinutes;
            this.img = `https://spoonacular.com/recipeImages/${this.id}-556x370.jpg`;
            this.url = res.data.sourceUrl;
            this.ingredients = res.data.extendedIngredients;
            
        }catch(error){
            console.log(error);
            alert('Unable to fetch recipe information.');
        }
    }

    calcServings(){
        this.servings = 4;
    }

}