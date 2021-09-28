const createPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#newPostTitle').value.trim();
    const text = document.querySelector('#newPostText').value.trim();
    
    if (title && text) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.newPostForm')
    .addEventListener('submit', createPostHandler);
