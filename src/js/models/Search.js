import axios from "axios";
import { key, proxy } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(
        `${proxy}/https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${this.query}&number=30`
      );
      this.result = res.data.results;
    } catch (error) {
      console.log("error");
    }
  }
}
