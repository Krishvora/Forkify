import {elements} from './base' 

export const getInput = () => elements.searchInput.value;

export const clearInput = () =>{
    elements.searchInput.value = '';
}

export const clearResults = ()=>{
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML= '';
}

export const highlightSelected= id=>{

    const resultsArray = Array.from(document.querySelectorAll('.results__link'));
    resultsArray.forEach(el=>{
        el.classList.remove('results__link--active')
    });
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}

export const limitRecipeTitle = (title,limit=17)=>{
    const newTitle=[];
    if(title.length> limit){
        title.split(' ').reduce((acc,curr)=>{
           if(acc + curr.length<= limit){
            newTitle.push(curr);
           } 
           return acc + curr.length;
        },0)
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = element =>{

    
    const markup = `
                <li>
                    <a class="results__link" href="#${element.id}">
                        <figure class="results__fig">
                            <img src="https://spoonacular.com/recipeImages/${element.id}-556x370.jpg" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(element.title)}</h4>
                            <p class="results__author">Ready in ${element.readyInMinutes} minutes</p>
                        </div>
                    </a>
                </li>
    `;

    elements.searchResList.insertAdjacentHTML("beforeend",markup);
};

const createButton = (page,type)=> `

                <button class="btn-inline results__btn--${type}" data-goto =${type === 'prev' ? page-1: page+1}>
                <span>Page ${type === 'prev' ? page-1: page+1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
                    </svg> 
                </button>

`;

const renderButtons = (page,numResults,result) =>{
    const pages = Math.ceil(numResults/result);

    let button;
    if(page === 1 && pages > 1){
    button = createButton(page,'next');
    }else if(page === pages && pages > 1){
        button = createButton(page,'prev'); 
    }else if(page < pages ){
        
        button = `
        ${createButton(page,'prev')}
        ${createButton(page,'next')}
        `;
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};
     
export const renderResults = (recipes,page=1,result=10) =>{
    //render results of current PAGE
    const start= (page-1)*result;
    const end = page*result;

    //render buttons
    renderButtons(page,recipes.length,result);
    

    
    recipes.slice(start,end).forEach(element => {

        renderRecipe(element);

    });

    
    
};