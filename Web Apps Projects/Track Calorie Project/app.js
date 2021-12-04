// Storage Controller
const StorageCtrl = (function(){
    //Public Method
    return {
        storeItem: function(item){
            let items;
            // Check if nay items in ls
            if(localStorage.getItem('items') === null){
                items = [];
                // Push new Item
                items.push(item);
                // Set local storace
                localStorage.setItem('items' , JSON.stringify(items));

            }else{
                //Get what is already in local storage
                items = JSON.parse(localStorage.getItem('items'));

                //push new item
                items.push(item);

                //reset local storage 
                localStorage.setItem('items' , JSON.stringify(items));
            }
        },

        getItemsFromStorage: function (){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
    
            }else{
                items = JSON.parse(localStorage.getItem('items'))
            }
            return items;
        },
        updateItemStorage : function(updateItem){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(updateItem.id === item.id){
                    items.splice(index, 1, updateItem)
                }
            });
            localStorage.setItem('items' , JSON.stringify(items));
        },

        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });

            localStorage.setItem('items' , JSON.stringify(items))
       

        },

        clearItemsFromStorage: function(){
            localStorage.removeItem('items');
        }



    }
    
  

})();






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
        //  items :  [
        //     //  {id: 0, name : 'Steak Dinner' , calories : 1200},
        //     //  {id: 1, name : 'Cookie' , calories : 200},
        //     //  {id: 2, name : 'Eggs' , calories : 500}
        //  ],
        items : StorageCtrl.getItemsFromStorage(),
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
            updateItem: function(name, calories){
                // Calories to number
                calories = parseInt(calories);

                let found = null;

                data.items.forEach(function(item){
                    if(item.id === data.currentItem.id){
                        item.name = name;
                        item.calories = calories;
                        found = item;
                    }
                })
                    return found;
            },

            deleteItem: function(id){
                //Get ids
                const ids = data.items.map(function(item){
                    return item.id;
                })
                    // get index
                const index = ids.indexOf(id);

                // Remove item
                data.items.splice(index, 1);
            },
            clearAllItems : function(){
                data.items = [];


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
            listItems : '#item-list li',
            addBtn : '.add-btn',
            updateBtn : '.update-btn',
            deleteBtn : '.delete-btn',
            backBtn : '.back-btn',
            clearBtn : '.clear-btn',
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
            updateListItem: function(item){
                let listItems = document.querySelectorAll(UISelectors.listItems);

                //Turn Node list into array
                listItems = Array.from(listItems);

                listItems.forEach(function(listItem){
                    const itemID = listItem.getAttribute('id');

                    if(itemID === `item-${item.id}`){
                        document.querySelector(`#${itemID}`).innerHTML = 
                        `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
                `;
                    }

                })
            },

                deleteListItem : function(id){

                    const itemID = `#item-${id}`;
                    const item = document.querySelector(itemID);
                    item.remove();

                

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
            removeItems : function(){
                let listItems = document.querySelectorAll(UISelectors.listItems);

                // Turn Node list into Array
                listItems = Array.from(listItems);

                listItems.forEach(function(item){
                    item.remove();

                })

                
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
const App = (function(ItemCtrl, StorageCtrl, UICtrl){

    // Load Event Listeners
    const loadEventListeners = function(){
            // Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable submit on enter
        document.addEventListener('keypress', function(e){
            if(e.key === 13){
                e.preventDefault();
                return false;
            }
        })

        // edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update Item Event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
          // Back Button Event
          document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

            // Delete Item Event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);


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

        // Store in localStorage
        StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

        // click edit item
        const itemEditClick = function(e){
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

        // Update item submit
        const itemUpdateSubmit = function(e){

            // Get item input
            const input = UICtrl.getItemInput();

            // update Item
            const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
            //update UI
            UICtrl.updateListItem(updatedItem);
                
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);


            // update local storage
            StorageCtrl.updateItemStorage(updatedItem);

            UICtrl.clearEditState();

                

            e.preventDefault();
        }

        // Delte Button event
        const itemDeleteSubmit = function(e){
            // Get current item 

            const currentItem = ItemCtrl.getCurrentItem();

            //Delete Data Structure
            ItemCtrl.deleteItem(currentItem.id);

            //Delete from UI
            UICtrl.deleteListItem(currentItem.id);
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            
            // delete from local storage
            StorageCtrl.deleteItemFromStorage(currentItem.id);

            UICtrl.clearEditState();


            e.preventDefault


        }

   
  // Clear items event
  const clearAllItemsClick = function(){
    // Delete all items from data structure
    ItemCtrl.clearAllItems();


            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

        // remove from UI
        UICtrl.removeItems();

        // Clear from local storage
        StorageCtrl.clearItemsFromStorage();

        // Hide the UL
        UICtrl.hideList();
        }




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

})(ItemCtrl, StorageCtrl, UICtrl);


// Initialize app
App.init();