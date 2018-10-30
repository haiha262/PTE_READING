
$(document).ready(function(){
  
 var question= 0;

    
    
    function getAnswer(str) {
      var start = str.search("Answer");
      var end = str.lastIndexOf("");
      var content = str.substring(start, end);
      document.getElementById("answer").innerHTML = content;
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
  getAnswer(str);
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


    $("#start").click(function(){

      var str ="";
      document.getElementById("answer");

      var xhr=new XMLHttpRequest();
      var link = "https://raw.githubusercontent.com/haiha262/PTE_READING/master/data/RW_"+(++question)+".txt";
      xhr.open("GET",link);
      xhr.onload=function(){
        var text = xhr.responseText;
        if (text.search("404") !=-1)
        {
          question = 0;
          document.getElementById("div1").innerHTML = "Start Again";
          document.getElementById("start").innerHTML = "Start Again";
          $("#showAnswer").remove();
        }
        else
        {
          str = text;
          document.getElementById("start").innerHTML = "Next";
          question_process (str);
        }
      };
      xhr.send();
        

        
    });

  
 
  
  

  
});