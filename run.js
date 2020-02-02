function gradeToGPA(grade){
    if(grade>=97)return 4.3
    if(grade>=93)return 4.0
    if(grade>=90)return 3.7
    if(grade>=87)return 3.3
    if(grade>=83)return 3.0
    if(grade>=80)return 2.7
    if(grade>=77)return 2.3
    if(grade>=73)return 2.0
    if(grade>=70)return 1.7
    if(grade>=67)return 1.3
    if(grade>=63)return 1.0
    if(grade>=60)return 0.7
    if(grade>=57)return 0.3
    return 0
}



function run(){
var elements = document.getElementsByClassName("showGrade")
var titles = []
var grades = []


if(elements.length==0)throw "No elements";

for (var i = 0; i < elements.length; i++) {
    grades.push(elements[i].innerHTML)
    titles.push(elements[i].parentElement.parentElement.children[0].children[0].innerText)
}

var weights = []
for (var i = 0; i < grades.length; i++) {
    if (grades[i].indexOf("%") == -1) {
        grades.splice(i, 1);
        titles.splice(i, 1);
        i--;
    } else {
        grades[i] = parseFloat(grades[i])
        if (titles[i].indexOf("AP") != -1 || titles[i].indexOf("Honors") != -1 || titles[i].indexOf("Advanced") != -1) {
            weights[i] = 1.1
        } else {
            weights[i] = 1.0
        }
    }
}

var gpa=0;
var el="<table class='table'  ><tr><td>Course<td>Grade<td>*Weighting<td>GPA<td>Weighted GPA"
for (var i = 0; i < grades.length; i++) {
	el+="<tr><td>"+titles[i]+"<td>"+grades[i]+"<td>"+weights[i]+"<td>"+gradeToGPA(grades[i])+"<td>"+Math.round(gradeToGPA(grades[i])*weights[i]*100)/100
gpa+=gradeToGPA(grades[i])*weights[i]
}
gpa/=grades.length

if(isNaN(gpa)){throw "NaN GPA";}

if(document.getElementById("gpaBox"))document.getElementById("gpaBox").remove()
document.getElementById("coursesCollapse").innerHTML+="<span id='gpaBox'>"
document.getElementById("gpaBox").innerHTML+="<h1 class='text-center'>Overall GPA: "+Math.round(gpa*100)/100+"<\h1>"

document.getElementById("gpaBox").innerHTML+=el
document.getElementById("gpaBox").innerHTML+="*Please double check that these weightings are correct. If you have any issues, questions, or suggestions, please email gfitez20@kentdenver.org"
}

function go(){
if(window.location=="https://kentdenver.myschoolapp.com/app/student#studentmyday/progress"){
console.log("run")
try{run()}catch(err){console.log(err);setTimeout(go,1000)}
}
}
go()
window.onhashchange=go



