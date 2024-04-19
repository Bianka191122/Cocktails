import { apiKey } from "./apiKey.js";
import { getData } from "./getData.js";
/*
import { verifyUserPw } from "./verifyUserPw.js";
import { userExist } from "./userExist.js";

document.querySelectorAll("button").forEach((obj) => {
    obj.addEventListener("click", auth);
});
function auth(e) {
    //console.log(e.target);
    if (document.querySelector("input").classList.contains("hidden")) {
        document.querySelectorAll("input").forEach((obj) => {
            obj.classList.remove("hidden");
        });
        return;
    }
    let username = document.getElementById("username").value;
    let pw = document.getElementById("pw").value;
    if (!username || !pw || !verifyUserPw(username, pw)) {
        document.querySelector("#msg").innerHTML = "Nem megfelelő adatok!....";
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];

    //register
    //nem szeretnénk 2 egyforma felhasználónevet eltárolni
    if (e.target.textContent == "Register") {
        if (userExist(users, "username", username)) {
            document.querySelector("#msg").innerHTML =
                "Foglalt felhasználónév!....";
            return;
        }
        users.push({ username, pw });
        localStorage.setItem("users", JSON.stringify(users));
    }
    //login
    else {
        let isValidUser = users.find(
            (obj) => obj.username == username && obj.pw == pw
        );
        if (isValidUser) {
            document.querySelector("#msg").innerHTML = "Sikeres bejelentkezés!";
            localStorage.setItem("authUser", username);
            document.querySelector(".logout").title = username;
            hideInputs();
            verifyAuth();
        } else {
            document.querySelector("#msg").innerHTML =
                "Hibás felhasználónév/jelszó páros!....";
        }
    }
}

function hideInputs() {
    document.querySelectorAll("input").forEach((obj) => {
        obj.classList.add("hidden");
    });
}

function verifyAuth() {
    if (localStorage.getItem("authUser")) {
        console.log("Van bejelentkezés.");
        let uName = localStorage.getItem("authUser");
        document.querySelector(".logout").title = uName
        document.querySelector(".login").classList.add("hidden");
        document.querySelector(".register").classList.add("hidden");
        document.querySelector(".logout").classList.remove("hidden");
        document.querySelector(".logout").addEventListener("click", logoutUser);
    }
    else{
        console.log('Nincs bejelentkezés!');
    }
}

function logoutUser() {
    localStorage.removeItem("authUser");
    document.querySelector(".login").classList.remove("hidden");
    document.querySelector(".register").classList.remove("hidden");
    document.querySelector(".logout").classList.add("hidden");
    document.querySelector("#msg").innerHTML = "";
    hideInputs();
}
//első látogatáskor:
verifyAuth();
*/

const url = 'https://api.api-ninjas.com/v1/cocktail?ingredients=soda';
const options = {
	method: 'GET',
	headers: {'X-Api-Key': apiKey},
    contentType: 'application/json'
};

document.querySelector('.pagination').addEventListener('click', handlePaginationClick)

let cocktails = []
let page = 1
let totalPage = 5
let cocktailPerPage = 2

let card = getData(url, options, renderData);
function renderData(data){
    console.log(data);
    cocktails = data
    showCocktails()
    for(let op = 0; op < data.length; op++){
        document.querySelector('.cats-list').innerHTML += `
        <div class="myCard">
        <div class="name">${data[op].name}</div>
        <div class="ingredients">${data[op].ingredients}</div>
        </div>`
    }
}

/*
function handleClick(){
    let breedName = document.querySelector('.myInput').value
    //let url = breedName.length==0 ? returnUrl(apiKey) : returnUrl(apiKey,breedName)
    //getData(url, renderCats)
    //console.log(getData(url, options));
}

function showCocktails(){
    document.querySelector('.cocktail-list').innerHTML = ''
    let stratIndex = (page-1)*cocktailPerPage
    let endIndex = stratIndex+cocktailPerPage
    let cocktailsToShow = cocktails.slice(stratIndex,endIndex)
    cocktailsToShow.forEach(obj=>{
        document.querySelector('.cocktail-list').innerHTML += `<div class="myCard"><img src="https://source.unsplash.com/random/200×300/?cocktail"></img>${obj.name}</div>`
    })
    renderPagination(cocktails.length)
}

function renderPagination(totalItem){
    document.querySelector('.pagination').innerHTML = ''
    totalPage =Math.ceil(totalItem/cocktailPerPage)
    for(let i=1; i<=totalPage; i++){
        let button = document.createElement('button')
        button.textContent = i
        button.classList.add('page-btn')
        if(i==page){
            button.classList.add('bg-indigo-400')
        }
        document.querySelector('.pagination').appendChild(button)
    }
}

function handlePaginationClick(e){
    if(e.target.tagName=='BUTTON'){
        console.log('ok', e.target.textContent);
        page =+ e.target.textContent
        showCocktails()
    }
}