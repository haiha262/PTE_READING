
$(document).ready(function(){
  
 
  function load_question()
  {
    var str ="";
    var xhr=new XMLHttpRequest();
    xhr.open("GET","https://raw.githubusercontent.com/haiha262/PTE_READING/master/RW_1.txt");
    xhr.onload=function(){
      str = (xhr.responseText);
    };
    xhr.send();
    return str;
  }
    $("button").click(function(){

     
     var str = load_question();
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
    });

  
 
        
   
});