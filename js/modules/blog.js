document.addEventListener("DOMContentLoaded", () => {

const buttons = document.querySelectorAll(".category-btn");
const cards = document.querySelectorAll(".post-card");

buttons.forEach(button => {

button.addEventListener("click", () => {

buttons.forEach(btn => btn.classList.remove("active"));
button.classList.add("active");

const filter = button.dataset.filter;

cards.forEach(card => {

if(filter === "all"){
card.style.display = "block";
}
else if(card.dataset.category === filter){
card.style.display = "block";
}
else{
card.style.display = "none";
}

});

});

});

});