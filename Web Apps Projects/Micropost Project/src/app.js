import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);


// listen for edit state
document.querySelector('#posts').addEventListener('click', enabledEdit);

// listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);


// Get Posts
function getPosts() {
  http
    .get('http://localhost:3000/post')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submit Post
function submitPost() {

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
    
  };
    // Validate input
    if(title === '' || body === ''){
      ui.showAlert('Please fill in all fields', 'alert alert-danger');
    }else{
      // Check for ID
      if(id === ''){
          // Create post
          
      http.post('http://localhost:3000/post', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));

      }else{
        // Update the post
        
      http
      .put(`http://localhost:3000/post/${id}`, data)
      .then(data => {
        ui.showAlert('Post Updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));

      }
    }

}

// Delete Post
function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http
        .delete(`http://localhost:3000/post/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

    // Enable edit state

    function enabledEdit(e){
      if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

          const data = {
            id, 
            title,
            body
          }
          // fill form with current post
          ui.fillForm(data);
      }

      e.preventDefault();
    }

    // Cancel edit state
    function cancelEdit(e){
      if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add')
      }
        e.preventDefault();
    }