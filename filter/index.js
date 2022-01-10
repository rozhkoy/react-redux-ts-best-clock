fetch("http://worldtimeapi.org/api/timezone")
  .then(response => response.json())
  .then(result => sortBy(result))

function sortBy(obj) {
  console.log(obj)
  for (let i = 0; i < obj.length; i++) {
    obj[i] = obj[i].split("/");
    if (obj[i].length == 2 && (obj[i][0] !== "Etc")) {
      obj[i][1] = obj[i][1].split("_");
      obj[i][1] = obj[i][1].join(" ");
      console.log(obj[i]);
    }
  }
}

