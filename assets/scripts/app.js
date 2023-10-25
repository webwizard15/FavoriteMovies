const addMovieModalElement = document.getElementById("add-modal");
const startMovieButton = document.querySelector("header button"); // selecting through element tags
const backdropElement = document.getElementById("backdrop");
const cancelAddMovieButton =
  addMovieModalElement.querySelector(".btn.btn--passive"); // do classes ya do sai jayda toh dono mai ().() lagta hai
const addMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModalElement.querySelectorAll("input");
const addBackdropClass = () => {
  backdropElement.classList.toggle("visible");
};
const toggleMovieModal = () => {
  addMovieModalElement.classList.toggle("visible");
  addBackdropClass();
  clearUserInput();
};
const backdropClickHandler = () => {
 toggleMovieModal();
};

const clearUserInput = () => {
  for (const el of userInputs) {
    el.value = "";
  }
};
const Movie = []; //.....array that will store movie in form of objects.
const entryTextSextionElement = document.getElementById("entry-text");
const updateUI = () => {
  if (Movie.length === 0) {
    entryTextSextionElement.style.display = "block"; 
  } else {
    entryTextSextionElement.style.display = "None";  // adding inline css style to hide display. 
  }
};

const deleteMovie=(movieId)=>{
  let movieIndex=0;
  for (const el of Movie){
    if (el.id===movieId){
      break;
    }
    movieIndex++; // yeah q kiya bhai ??
  }
  Movie.splice(movieIndex,1); // splice use karte hai array mai sai element hatane aur uski jagah par add karne ke liye. 
  //arguments is splice(index , no of elements want to remove, whatever you wants to add..any type of datatypes.)

  const listRootElement=document.getElementById("movie-list"); 
  listRootElement.children[movieIndex].remove(); //
  // listRootElement.removeChild(listRoot.children[movieIndex]);
}; 

 const deleteMovieHandler=(movieId)=> {
  const deleteMOvieModal=  document.getElementById("delete-modal");
  deleteMOvieModal.classList.add('visible');
  addBackdropClass();
//  deleteMovie(movieId);  
 };

const renderMovieElement=(id, title, imageurl, rating)=>{
 const newMovieElement=document.createElement("li");
 newMovieElement.class="movie-element";
 newMovieElement.innerHTML=`
 <div class="movie-element__image"> 
  <img src="${imageurl}" alt="${title}"> 
 </div>
 <div class="movie-element__info">                           
 <h2>${title}</h2> 
 <p>${rating}/5 stars</p>
 </div>`;
 newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id)); // bind ka use q kiya hai.  
 const listRootElement=document.getElementById("movie-list");               // output same nahi aaraha . 
 listRootElement.append(newMovieElement);
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" || // trim function is to avoid extra whitespaces front starting and last. 
    ratingValue.trim() === "" ||
    parseInt(ratingValue) < 1 ||
    parseInt(ratingValue) > 5
  ) {
    alert("invalid UserInput rating (1 to 5) and no null strings");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),  // same id ane ka khatra hai. 
    title: titleValue,
    imageurl: imageUrlValue,
    rating: ratingValue,
  };
  Movie.push(newMovie);
  console.log(Movie);
  toggleMovieModal(); // after adding movie tab will be closed.
  renderMovieElement(newMovie.id, newMovie.title, newMovie.imageurl, newMovie.rating);
  clearUserInput(); // this will clear the userInput once the modal will be closed.
  updateUI(); 
};

startMovieButton.addEventListener("click", toggleMovieModal);
backdropElement.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", toggleMovieModal);
addMovieButton.addEventListener("click", addMovieHandler);
