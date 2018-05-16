// get all elements needed
var textDiv = document.createElement("DIV"); // holds dialogue
textDiv.id = "textDiv";
var topDiv = document.createElement("DIV");
topDiv.id = "topDiv";
var repeatDiv = document.createElement("DIV"); // holds repeat dialogue
repeatDiv.id = "repeatDiv";
var repeatText = document.createElement("H3");
repeatText.id = "repeatText";
repeatDiv.appendChild(repeatText);
var wrapper = document.getElementById("diaWrapper"); // holder of everything
var img = document.createElement("IMG"); // holds image
// adding image and dialogue text
var textP = document.createElement("p");
var dia;

// define class
class Dialogue {
  // take json data
  constructor(data) {
    this.index = 0;
    this.data = data.sequence;
  }
  // getter functions
  getType() { return this.data[this.index].type; }
  getText(){ return this.data[this.index].text;}
  getImage() { return this.data[this.index].image;}

  // takes user answer and returns true if correct, false if wrong
  validateAnswer(input){
    // get string input
    if (typeof input == "number"){
      input = input.toString();
    }
    input = input.toLowerCase();
    // get all possible answers
    var answers = this.data[this.index].answer;
    answers = answers.split("||");
    for (var i = 0; i < answers.length; i++){
      console.log(input + " : " + answers[i]);
      if (answers[i].toLowerCase() == input){
        console.log("correct");
        return true; // return true if equal
      }
    }
    console.log("wrong");
    return false;
  }

  // create number forms
  handleNumberQ(){
    var qdiv = document.getElementById("questionDiv");
    // clear anything that exists already
    qdiv.innerHTML = "";
    // create new form
    var numform = document.createElement("form");
    numform.innerHTML = 'Answer here: <input type="number" name="value" id="numInput">' +
                        '<button type="button" id="submit">Submit</button>';
    qdiv.appendChild(numform);
    // validate answer
    document.getElementById("submit").addEventListener("click",
      function(){
        var correct = dia.validateAnswer(document.getElementById("numInput").value);
        if (correct) { // update
          dia.index ++;
          img.src = dia.getImage();
          textP.innerHTML = dia.getText();
          repeatDiv.hidden = true;
          document.getElementById("questionDiv").hidden = true;
        }
      },
      false);
    // on enter also validate
    document.getElementById("numInput").addEventListener("keyup", function(event) {
      // on enter
      if (event.keyCode === 13) {
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("submit").click();
      }
    });
  }

  handleTextQ(){
    var qdiv = document.getElementById("questionDiv");
    // clear anything that exists already
    qdiv.innerHTML = "";
  }

  // move to next event in sequence
  next(){
    if (this.index < 0){
      this.index = 0;
    }
    // if on dialogue can just move on
    else if (this.getType() == "dialogue"){
      this.index++;
      // if current is not dialogue
      if (this.getType() != "dialogue"){
        //give option to repeat dialogue
        var repeat = document.getElementById("repeatDiv");
        document.getElementById("questionDiv").hidden = false;
        repeat.hidden = false;
        document.getElementById("repeatText").innerHTML = "Repeat";
        repeat.style.width = "100px";
        repeat.style.height = "100px";
        repeat.style.background = "red";
        // creat appropriate forms
        switch(this.getType()){
          case "number question":
            console.log("num question");
            this.handleNumberQ();
            break;
          case "text question":
            console.log("text question");
            this.handleTextQ();
            break;
          case "cite question":
            console.log("cite question");
            break;
          case "qr question":
            console.log("qr question");
            break;
        }
      }
    }
    // if on question don't move on until correct question

    // if (this.index + 1 < this.data.length){++this.index;}
    // else {
    //
    // }
  }
}

// load input file and init dialogue object
loadJSON("testImage.json", function(response){
  dia = new Dialogue(JSON.parse(response));
  function iterateDialogue(dia){
    dia.next();
    img.src = dia.getImage();
    textP.innerHTML = dia.getText();
  }

  // called to send dialogue to last checkpoint
  function repeatDia(){
    // dia.index = -1;
    // find the first dialogue event
    var i = dia.index;
    while (i > 0){
      i -= 1;
      if (dia.data[i].type != "dialogue"){
        break;
      }
    }
    if (i != 0){
      i ++;
    }
    console.log(i);
    dia.index = i;
    img.src = dia.getImage();
    textP.innerHTML = dia.getText();
    // iterateDialogue(dia);
    document.getElementById("repeatText").innerHTML = ""; // remove repeat line
    var repDiv = document.getElementById("repeatDiv");
    repDiv.style.width = "0px";
    repDiv.style.height = "0px";
    document.getElementById("questionDiv").hidden = true;
  }

  // add content
  textP.id = "diaText";
  textP.innerHTML = dia.getText();
  textDiv.appendChild(textP);
  textDiv.addEventListener("click", function(){iterateDialogue(dia)}, false);
  img.src = dia.getImage();
  img.id = "diaImg";
  wrapper.appendChild(img);
  // create container for dialogue
  var sect = document.createElement("section");
  sect.id = "textImgContainer";
  sect.appendChild(wrapper);
  sect.appendChild(textDiv);
  // set repeatDiv
  repeatDiv.addEventListener("click", repeatDia, false);
  // append divs to document
  topDiv.appendChild(repeatDiv);
  var container = document.getElementById("superContainer");
  container.appendChild(topDiv);
  container.appendChild(sect);
  // sect.appendChild(wrapper);
  // wrapper.appendChild(sect);
})
