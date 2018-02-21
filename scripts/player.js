/*
Player serves as a wrapper to accessing and storing player information and game
states. Under the hood Player uses localStorage
*/

class Player {
  // used to store an individual key value pair in the JSON object
  static setKeyVal(key, value){
    var p = localStorage.getItem("player");
    // if no data has been stored
    if (p == null){
      var player = new Object();
    }
    else {
      try {
        var player = JSON.parse(p);
      } catch(e){
        throw e.message;
      }
    }
    player[key] = value;
    try {
      localStorage.setItem("player", JSON.stringify(player));
    } catch(e){
      throw e.message;
    }
  }

  // store an entire JSON object without overwriting data not included
  static setObj(obj){
    var p = localStorage.getItem("player");
    // if no data has been stored
    if (p == null){
      var player = new Object();
    }
    else {
      try{
        var player = JSON.parse(p);
      } catch(e){
        throw e.message;
      }
    }
    if (typeof(obj) != "object"){
      throw "Input must be object, not " + typeof(obj);
    }

    // iterate through objects pairs
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
          player[key] = obj[key];
      }
    }
    try{
      localStorage.setItem("player", JSON.stringify(player));
    } catch(e){
      throw e.message;
    }
  }

  // return the value associated with the key. Returns null if no info stored
  static getValue(key){
    var p = localStorage.getItem("player");
    if ("player" == null){
      return null;
    }
    else{
      try {
        var player = JSON.parse(p);
        return player[key];
      } catch(e){
        throw e.message;
      }
    }
  }

  // return the entire stored JSON object. Returns null if no info is stored
  static getPlayerObj(){
    var p = localStorage.getItem("player");
    try {
      return JSON.parse(p);
    } catch(e){
      throw e.message;
    }
  }
}
