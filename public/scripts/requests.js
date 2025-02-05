// TODO: Convert flat list of dirs into nested <li>s

let user = "sins621";
let repo = "Obsidian-Notes";

function update_content(user, repo, path, url) {
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
  let sidebar_list = $(".list");
  response.forEach((element) => {
    sidebar_list.append(`<li id="${element.url}">${element.path}</li>`);
  });

  let list_items = $("li");
  list_items.on("click", function (event) {
    update_content(user, repo, event.target.innerText, event.target.id);
  });
}

if (!tree)
  $.ajax({
    url: "http://localhost:3000/get_tree",
    type: "get", //send it through get method
    data: {
      github_user: user,
      github_repo: repo,
    },
    success: function (response) {
      localStorage.setItem("myTree", JSON.stringify(response));
      onSuccessfulTreeCall(response);
    },
    error: function (xhr) {
      //Do Something to handle error
    },
  });
else onSuccessfulTreeCall(JSON.parse(tree));
