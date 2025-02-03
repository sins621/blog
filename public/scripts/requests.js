$.get("http://localhost:3000/", (data) => {
  console.log(data);
  let content = $(".content");
  content.append(data);
});
