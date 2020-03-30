import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = []
    }

    addItem(amount,name,unit){
        const item = {
            id: uniqid(),
            count: amount,
            unit: unit,
            ingredient: name
        }
        
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        let count = 0;
        let index = 0;
        this.items.forEach(el=>{
           
            if(el.id === id){
                index = count;
              
            }
            count++;
        });
        this.items.splice(index,1);
    }


    updateCount(id,newCount){
        
        this.items.forEach(el=>{
            if(el.id == id){
                el.count = newCount;
                console.log(`flag at ${el.ingredient} with new count ${el.count}`);
            }
        })
        
    }
}