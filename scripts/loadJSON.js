/*
  helper to load and parse a json file. Call loadJSON(path_to_file, funstion to process)
  ex:
    loadJSON("data.json", function(response) {
         var actual_JSON = JSON.parse(response);
         console.log(actual_JSON);
     });
*/
function loadJSON(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a
            // value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}
