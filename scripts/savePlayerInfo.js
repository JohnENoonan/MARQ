function saveInfo() {
  var player = new Object();
  player.pname = document.getElementById("name").value;
  player.tname = document.getElementById("teamName").value;
  player.role = document.getElementById("role").value;
  player.steps = {};
  Player.setObj(player);

  console.log(JSON.stringify(player));

  console.log(Player.getPlayerObj());


  // window.location.href = "../index.html";
  return false;
}
