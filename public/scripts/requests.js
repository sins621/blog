let user = "sins621";
let repo = "Obsidian-Notes";

function update_content(user, repo, path, url) {
  console.log(path);
  console.log(url);
  $.ajax({
    url: "http://localhost:3000/get_file",
    type: "get", //send it through get method
    data: {
      github_user: user,
      github_repo: repo,
      path: path,
      url: url,
    },
    success: function (response) {
      let content = $(".content");
      content.empty();
      content.append(response);
    },
    error: function (xhr) {
      //Do Something to handle error
    },
  });
}

let tree = localStorage.getItem("myTree");

function onSuccessfulTreeCall(response) {
  localStorage.setItem("myTree", response);
  console.log(response);
  let sidebar_list = $(".list");
  response.forEach((element) => {
    sidebar_list.append(`<li id="${element.url}">${element.path}</li>`);
  });

  let list_items = $("li");
  list_items.on("click", function (event) {
    update_content(user, repo, event.target.innerText, event.target.id);
  });
}

tree = undefined

if (!tree)
  $.ajax({
    url: "http://localhost:3000/get_tree",
    type: "get", //send it through get method
    data: {
      github_user: user,
      github_repo: repo,
    },
    success: function (response) {
      onSuccessfulTreeCall(response);
    },
    error: function (xhr) {
      //Do Something to handle error
    },
  });
else onSuccessfulTreeCall(tree);
