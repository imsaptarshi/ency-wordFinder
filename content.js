document.getElementsByTagName('head')[0].innerHTML+=`
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<meta http-equiv="Content-Security-Policy" content="style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;">
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet">`

var x=100;
var y=100;
onmousemove=function(e){
		x=e.clientX;
		y=e.clientY;
	}

document.addEventListener("dblclick",function(){
	const query=window.getSelection().toString();

	const dict_modal_style=`
	background: rgba(255, 255, 255, 0.64);
	left:${x}px;
	top:${y+document.documentElement.scrollTop}px;
	box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
	z-index:999;position:absolute;
	height:200px;
	width:500px;
	backdrop-filter: blur(20px);
	border-radius: 10px;
	padding:1.25rem;
	padding-left:1.55rem;
	font-family: 'Poppins', sans-serif;
	color:#3E3E3E;
	overflow-y:scroll;`

	const component=`
	<div id="dict" style="${dict_modal_style}">
		<div class="">
            <img class="" style="margin-right:0.75rem; transform: translateY(5px);" src="https://drive.google.com/uc?export=view&id=1bG3fnvt-_NUFNwfngBJ4nr4AJrczx_LP" id="play-ency">
            <audio id="audio-ency" src=""></audio>
            <span class="" style="font-size:1.25rem;" id="word-ency">${query}</span>
            <br/>
            <span style="margin-left:2.45rem;font-size:1rem;color:#757575;" id="pronunciation-ency">__</span>
            <div class="secondary-font mt-5" id="meanings-ency">
                __
            </div>
        </div>
	</div>`
	if(query.length>1){
		document.body.innerHTML=component+document.body.innerHTML;
		getDictionary(query);
	}
	document.getElementById('dict').addEventListener("mouseleave",function(){
		document.getElementById('dict').remove();
	})
	
})

function getDictionary(query){
	const dict_req=new XMLHttpRequest();
	const dict_url=`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
	dict_req.open("GET",dict_url)
	dict_req.send();
	dict_req.onreadystatechange=(e)=>{
		const res=JSON.parse(dict_req.responseText);
		document.getElementById('pronunciation-ency').innerHTML=res[0].phonetics[0].text;

		document.getElementById("play-ency").addEventListener("click",function play() {
        var audio = document.getElementById("audio-ency");
        audio.src=res[0].phonetics[0].audio
        audio.play();
      })

		const dict_area=document.getElementById("meanings-ency")
		var components="";

		for(var i=0;i<res[0].meanings.length;i++){
			components+=`<div class="" style="font-size:0.875rem;font-style:italic;margin-bottom:0.75rem;margin-top:0.75rem;">${res[0].meanings[i].partOfSpeech}</div>`
			if(i==res[0].meanings.length-1){
				components+=`<div class="" style="margin-left:2.5rem"`
			}
			else{
				components+=`<div class="" style="margin-left:2.5rem;margin-bottom:1.25rem;">`
			}
			for(var j=0;j<res[0].meanings[i].definitions.length;j++){
				components+=`
				<span class="text-sm" style="font-size:0.875rem;">${j+1}. ${res[0].meanings[i].definitions[j].definition}</span><br/>
				<span class="text-sm gray" style="font-size:0.875;color:#757575;">"${res[0].meanings[i].definitions[j].example?res[0].meanings[i].definitions[j].example:""}"</span><br/><br/>`
			}
			components+="</div>"
		}
		dict_area.innerHTML=components;

	}
}