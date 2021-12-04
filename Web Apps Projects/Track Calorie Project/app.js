// Storage Controller








// Item Controller
const ItemCtrl = (function(){


     // Item Constructor
     const Item = function(id, name, calories){
         this.id =id;
         this.name = name;
         this.calories= calories;
      
     }
     
        // Data Structure / State
     const data = {
         items :  [
            //  {id: 0, name : 'Steak Dinner' , calories : 1200},

            //  {id: 1, name : 'Cookie' , calories : 200},

            //  {id: 2, name : 'Eggs' , calories : 500}
         ],

         currentItem: null,
         totalCalories: 0
     } 


        // Public Methods
        return {
            getItems: function(){
                return data.items;
            },
            addItem : function(name, calories){
                let ID;
                    // Create ID
                    if(data.items.length > 0 ){
                        ID = data.items[data.items.length - 1].id+1;

                    }else{
                        ID = 0;
                    }

                    // calories to number
                      calories = parseInt(calories);


                    // Create new Item
                    newItem = new Item(ID, name, calories);

                    // Add to Items array
                    data.items.push(newItem);

                    return newItem;
               
            },
            getItemById: function(id){

                let found = null;
                //loop through items
                data.items.forEach(function(item){
                    if(item.id === id){
                        found = item;
                    }
                })

                return found;
            },

            setCurrentItem: function(item){
                data.currentItem = item;
            },

            getCurrentItem: function(){
                return data.currentItem;
            },

            getTotalCalories: function(){
                let total = 0;


                // loop through items and add calories
                data.items.forEach(function(items){
                    total += items.calories;
                   
                });
                //Set total calories in data structure
                data.totalCalories = total;


                // return total
                return data.totalCalories;

            },
            logData: function(){
                return data;

                
            }
        }
})();




// Ui Controller
const UICtrl = (function(){
        const UISelectors = {
            itemList : '#item-list',
            addBtn : '.add-btn',
            updateBtn : '.update-btn',
            deleteBtn : '.delete-btn',
            backBtn : '.back-btn',
            itemNameInput: '#item-name',
            itemCaloriesInput: '#item-calories',
            totalCalories: '.total-calories'

        }



    // Public Methods
        return {
            populateItemList: function(items){
                let html = '';

                items.forEach(function(item) {
                    html += ` <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                      <i class="edit-item fa fa-pencil"></i>
                    </a>
                  </li>`;
                    
                });
                // Insert List items
                 document.querySelector(UISelectors.itemList).innerHTML = html;

            },
            getItemInput : function(){

                return{
                    name: document.querySelector(UISelectors.itemNameInput).value,
                    calories: document.querySelector(UISelectors.itemCaloriesInput).value

                }
                
            },
            addListItem: function(item){
                // Show the list
                document.querySelector(UISelectors.itemList).style.display = 'block';
                // Create li element
                const li = document.createElement('li');
                // add class
                li.className = 'collection-item';
                // add ID
                li.id = `item-${item.id}`;
                //add HTML
                li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
                `;

                // Insert Item
                document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

            },
            clearInput: function(){
              document.querySelector(UISelectors.itemNameInput).value = '';
              document.querySelector(UISelectors.itemCaloriesInput).value = '';
            },

            addItemToForm: function(){
                document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
                document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
                UICtrl.showEditState();
            },

            hideList: function(){
              document.querySelector(UISelectors.itemList).style.display = 'none';
            },
            showTotalCalories: function(totalCalories){
              document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
            },
            clearEditState: function(){
                UICtrl.clearInput();
                document.querySelector(UISelectors.updateBtn).style.display = 'none';
                document.querySelector(UISelectors.backBtn).style.display = 'none';
                document.querySelector(UISelectors.deleteBtn).style.display = 'none';
                document.querySelector(UISelectors.addBtn).style.display = 'inline';
            },
            showEditState: function(){
                
                document.querySelector(UISelectors.updateBtn).style.display = 'inline';
                document.querySelector(UISelectors.backBtn).style.display = 'inline';
                document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
                document.querySelector(UISelectors.addBtn).style.display = 'none';
            },
            getSelectors: function(){
              return UISelectors;
            }
          }
})();



// App Controller
const App = (function(ItemCtrl, UICtrl){

    // Load Event Listeners
    const loadEventListeners = function(){
            // Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);

    }

  // Add item submit
  const itemAddSubmit = function(e){
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if(input.name !== '' && input.calories !== ''){
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

        // update Item submit
        const itemUpdateSubmit = function(e){
            if(e.target.classList.contains('edit-item')){
                // Get list item id
                const listId = e.target.parentNode.parentNode.id;

                // break into an array
                const listIdArr = listId.split('-');
                

                // get the actual id
                const id = parseInt(listIdArr[1]);

                // get item
                const itemToEdit = ItemCtrl.getItemById(id);

                //set current item
                ItemCtrl.setCurrentItem(itemToEdit);

                // add item to form
                UICtrl.addItemToForm();
            }


            e.preventDefault();
        }

    //console.log(ItemCtrl.logData());

    // Public Methods
    return {
        init: function(){
            // Clear edit state/ set initial set
            UICtrl.clearEditState();
            
            // Fetch Items from Data Structure
            const items = ItemCtrl.getItems();

            //check if any items 
            if(items.length === 0 ){
                UICtrl.hideList();

            }else{
                
            // Populate List with items
            UICtrl.populateItemList(items);

                  // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
            

            }

            //Load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);


// Initialize app
App.init();