const names = fetch("https://jsonplaceholder.typicode.com/users");
let currentUser = 0;
let previousUser = 0;
console.log(names);
names
  .then(function (response) {
    let data = response.json();
    return data;
  })
  .then(function (data) {
    console.log(data);
    addUsersName(data);
    fillFisrtPosts(data);
  })
  .catch(function () {
    console.log("error");
  });
/**
 * it take array of users ,
 * and display it by foreach,
 
 * @param {string} data
 */
function addUsersName(data) {
  data.forEach((element, i, arr) => {
    let nameDiv = document.createElement("div");
    if (i == 0) {
      nameDiv.classList.add("background");
    }
    nameDiv.addEventListener("click", function (e) {
      previousUser = currentUser;
      document
        .querySelectorAll(".usersDiv div")
        [previousUser].classList.remove("background");
      e.target.classList.add("background");
      currentUser = i;
      document.getElementsByClassName("userData")[0].innerHTML = "";
      let userId = element.id;
      getDataOfUser(userId);
    });
    nameDiv.innerHTML = `${element.name}`;
    nameDiv.classList.add("username");
    document.getElementsByClassName("usersDiv")[0].append(nameDiv);
  });
}
async function getDataOfUser(userId) {
  try {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    console.log(response);
    let data = await response.json();
    displayUserData(data);
  } catch {
    console.log("error in getDataOfUser");
  }
}
function displayUserData(user) {
  user.forEach(function (ele) {
    let title = document.createElement("div");
    title.innerHTML = ele.title;
    title.classList.add("userDatastyle");
    document.getElementsByClassName("userData")[0].append(title);
  });
}
async function fillFisrtPosts(data) {
  try {
    let FirstPosts = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${data[0].id}`
    );
    let responce = await FirstPosts.json();
    displayUserData(responce);
  } catch {
    console.log("error in fillFisrtPosts");
  }
}
