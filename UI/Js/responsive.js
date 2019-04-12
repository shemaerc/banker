// JavaScript Document
var x=0;
function menu(){
document.getElementById("responsive_mainy").style.visibility="visible";
document.getElementById("responsive_mainy").style.height= "50px";
document.getElementById("popover_signIn").style.visibility="visible";
document.getElementById("popover_signUp").style.visibility="visible";
document.getElementById("index_body").style.paddingTop="100px";
}
function move()
{document.getElementById("responsive_mainy").style.visibility="hidden";
document.getElementById("popover_signIn").style.visibility="hidden";
document.getElementById("popover_signUp").style.visibility="hidden";
document.getElementById("index_body").style.paddingTop="1px";
document.getElementById("responsive_mainy").style.height= "0px";
	}
function click_event()
	{
		if(x==0)
		{
document.getElementById("responsive_mainy").style.visibility="visible";
document.getElementById("responsive_mainy").style.height= "50px";
document.getElementById("popover_signIn").style.visibility="visible";
document.getElementById("popover_signUp").style.visibility="visible";
document.getElementById("index_body").style.paddingTop="100px";
			x=1;
			}else{
document.getElementById("responsive_mainy").style.visibility="visible";
document.getElementById("responsive_mainy").style.height= "50px";
document.getElementById("popover_signIn").style.visibility="visible";
document.getElementById("popover_signUp").style.visibility="visible";
document.getElementById("index_body").style.paddingTop="100px";
	       x=0;
			}
		
		}