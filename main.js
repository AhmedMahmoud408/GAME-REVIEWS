
let mmorpg = document.querySelector("#mmorpg");
let gameData = document.querySelector("#gameData");
let gameDetails= document.querySelector("#gameDetails")
let btnClose = document.querySelector("#btnClose");
let dataArray =[];
let gameIdData=

document.querySelectorAll(".categoryData a").forEach((link) => {
  link.addEventListener("click", (e) => {
     document.querySelector(".categoryData .active").classList.remove("active");
     e.target.classList.add("active");
     getGame(e.target.dataset.category);
    
  });
});
getGame("mmorpg")

async function getGame(tags){
gameData.innerHTML = `<div class="lds-ring text-center start-50 "><div></div><div></div><div></div><div></div></div>`
  try {
    let res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${tags}`,{ method: 'GET',
      headers: {
     'x-rapidapi-key': '23100a8affmshcaeb195135c2ae4p150ecbjsn40e12b42d056',
     'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
   }}
     );
    let finalResponse = await res.json();
    display(finalResponse);
      
    // console.log(finalResponse);
  } catch (error) {
    console.error(error);
  }
}

function display(data){
dataArray=data;
console.log(dataArray);
let cartona = ``
for (let i = 0; i < dataArray.length; i++) {
  let dataIndex= dataArray[i].length;
  cartona+=`
        <div class="col-lg-3 col-md-4 col-sm-6" id="cardData" data-id="${dataArray[i].id}">
            <div
              class="container border overflow-hidden border-1 border-white card rounded pt-3"
            >
              <img src="${dataArray[i].thumbnail}" class="w-100" alt="" />
              <div
                class="d-flex align-items-center justify-content-between mt-2 text-white"
              >
                <h5>${dataArray[i].title}</h5>
                <span class="badge text-bg-danger ">Free</span>
              </div>
              <p class="text-center text-warning pt-4">${dataArray[i].short_description.split("").splice(0,50).join("")}</p>
              <div class="d-flex align-items-center justify-content-between">
                <span class="badge text-bg-danger position-fixed bottom-0 start-0 mb-2 ms-2">${dataArray[i].genre}</span>
                <span class="ms-2 badge text-bg-danger position-fixed bottom-0 end-0 mb-2 me-2">${dataArray[i].platform}</span>
              </div>
            </div>
          </div>
  `
  // console.log(dataArray[i]);
  gameData.innerHTML=cartona;

  
  
  document.querySelectorAll("#cardData").forEach((card) =>
    { card.addEventListener("click", function(){
    gameDetail(card.dataset.id)
    
    document.querySelector("#home").classList.add("d-none")
    document.querySelector("#header").classList.add("d-none")
    document.querySelector("#details").classList.remove("d-none")
    console.log("hiiiiiiiii" , card.dataset.id);

  })
}
  )
}}

async function gameDetail(data){
  try {
    let result = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${data}`,{ method: 'GET',
      headers: {
     'x-rapidapi-key': '23100a8affmshcaeb195135c2ae4p150ecbjsn40e12b42d056',
     'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
   }}
     );
    let finalresult = await result.json();
    gameIdData=finalresult
    console.log(gameIdData);
      gameId(gameIdData)
    // console.log(finalResponse);
  } catch (error) {
    console.error(error);
  }

}
function gameId (id){
  
  let newCartona =`
  <img src="${id.thumbnail}" class="w-25" alt="" />
          <div class="ms-4">
            <h4>Title: ${id.title}</h4>
            <h5>
              Category:<span class="badge text-bg-danger ms-2"
                >${id.genre}</span
              >
            </h5>
            <h5>
              Platform:<span class="badge text-bg-danger ms-2"
                >${id.platform}</span
              >
            </h5>
            <h5>
              Status:<span class="badge text-bg-danger ms-2"
                >${id.status}</span
              >
            </h5>
            <p>
             ${id.description}
            </p>
            <button class="btn btn-warning"><a href="${id.game_url}" target="_blank" class="text-white text-decoration-none">Show Game</a></button>
  `
  gameDetails.innerHTML= newCartona;
   }
function closeData(){
  document.querySelector("#home").classList.remove("d-none")
  document.querySelector("#header").classList.remove("d-none")
    document.querySelector("#details").classList.add("d-none")
}
btnClose.addEventListener("click",function(){
  closeData()
})