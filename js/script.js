
$(document).ready(function(){

var global_question= 0;





 
function getAnswer(str) {
  var start = str.search("Answer");
  var end = str.lastIndexOf("");
  var content = str.substring(start, end);
  document.getElementById("answer").innerHTML = content;
  return str.replace(content, ""); 

}


function AddAnswerButton() {
    if ($("#showAnswer").length > 0){
    $("#showAnswer").remove();
    }
    var btn = document.createElement("BUTTON");
    var name = document.createTextNode("Show Answer");
    btn.appendChild(name);
    document.body.appendChild(btn);
    btn.setAttribute("id","showAnswer");

    $("#showAnswer").click(function() {
      var x = document.getElementById("answer");
      if (x.style.display === "none") {
          x.style.display = "block";
      } else {
          x.style.display = "none";
      }
    }) ;
  }   

function question_process(str)
{
  str = getAnswer(str);
  AddAnswerButton();
  while(str.indexOf("(")>0)
        {
          var start = str.indexOf("(");
          var end = str.indexOf(")");

          var content = str.substring(start+1, end);
          var list_aws = content.split("/");
          for (var i = 0; i < list_aws.length; i++) {
            list_aws[i] = "<option value = "+ list_aws[i] +">"+list_aws[i]+"</option>";
          }
          var replace  = "<select>"+list_aws+"</select>";
          var need_replace = str.substring(start, end+1);
         
          str = str.replace(need_replace, replace); 
        }
        document.getElementById("div1").innerHTML = str;
}

function nextQuestion(question)
{
  var str ="";
      document.getElementById("answer");
    document.getElementById("answer").style.display = "none";;
    var useXHR = true;
      if (useXHR)
      {
        var xhr=new XMLHttpRequest();
        var link = "https://raw.githubusercontent.com/haiha262/PTE_READING/master/data/RW_"+(question)+".txt";
        xhr.open("GET",link);
        xhr.onload=function(){
          var text = xhr.responseText;
          if (text.search("404") !=-1)
          {
            global_question = 1;


            document.getElementById("div1").innerHTML = "Start Again";
            document.getElementById("start").innerHTML = "Start Again";
            $("#showAnswer").remove();
            //hide list page
            var x = document.getElementById("page_number");
            if (x.style.display === "block") {
                x.style.display = "none";
            } 
          }
          else
          {
            str = text;
            document.getElementById("start").innerHTML = "Next";
            question_process (str);
            global_question = question;
          }
        };
        xhr.send();
      }
      else
      {
        readTextFile("./data/RW_1.txt");
        document.getElementById("start").innerHTML = "Next";
            question_process (str);
      }
}

$("#start").click(function(){

  //show list page
  var x = document.getElementById("page_number");
  if (x.style.display === "none") {
      x.style.display = "block";
  } 

  global_question = global_question+1;
  nextQuestion(global_question);


    
});

listPage();
function listPage()
{
  var number_page = 100;
  var ul_tag = document.getElementById("list_page");
  for (var i = 1; i <=  number_page; i++) {
 
    var li_tag = document.createElement("li");
    var a_tag = document.createElement("a");
    var name = document.createTextNode(i);
    a_tag.appendChild(name);
    clickEvent(a_tag,i);
    li_tag.appendChild(a_tag);
    ul_tag.appendChild(li_tag);
  }
}
function clickEvent(o,x)
{
 o.onclick=function(){ nextQuestion(x); }
}
  
  function readTextFile(filepath) {
    var str = "";
    var txtFile = new File(filepath);
    txtFile.open("r");
    while (!txtFile.eof) {
    // read each line of text
    str += txtFile.readln() + "\n";
    }
    return str;
  }
  

  
});