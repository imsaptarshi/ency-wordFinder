const Http = new XMLHttpRequest();
const url="config.json";
Http.open("GET", url);
Http.send();


const word_of_the_day_req=new XMLHttpRequest();
const word_of_the_day_url="https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
word_of_the_day_req.open("GET",word_of_the_day_url)
word_of_the_day_req.send();
word_of_the_day_req.onreadystatechange=(e)=>{
	const query=JSON.parse(word_of_the_day_req.responseText).word
	document.getElementById('word_of_the_day').innerHTML=query
	getDictionary(query)
}


function getDictionary(query){
	const dict_req=new XMLHttpRequest();
	const dict_url=`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
	dict_req.open("GET",dict_url)
	dict_req.send();
	dict_req.onreadystatechange=(e)=>{
		const res=JSON.parse(dict_req.responseText);
		document.getElementById('pronunciation').innerHTML=res[0].phonetics[0].text;

		document.getElementById("play").addEventListener("click",function play() {
        var audio = document.getElementById("audio");
        audio.src=res[0].phonetics[0].audio
        audio.play();
      })

		const dict_area=document.getElementById("meanings")
		var components="";

		for(var i=0;i<res[0].meanings.length;i++){
			components+=`<div class="text-sm italic mb-3">${res[0].meanings[i].partOfSpeech}</div>`
			if(i==res[0].meanings.length-1){
				components+=`<div class="ml-10">`
			}
			else{
				components+=`<div class="ml-10 mb-5">`
			}
			for(var j=0;j<res[0].meanings[i].definitions.length;j++){
				components+=`
				<span class="text-sm">${j+1}. ${res[0].meanings[i].definitions[j].definition}</span><br/>
				<span class="text-sm gray">"${res[0].meanings[i].definitions[j].example?res[0].meanings[i].definitions[j].example:""}"</span><br/><br/>`
			}
			components+="</div>"
		}
		dict_area.innerHTML=components;

	}
}


//for browser actions
const urls=["https://github.com/saptarshibasu15/ency","https://dev.to/saptarshibasu15","https://www.instagram.com/codingverse/?hl=en"]
const els=document.getElementsByClassName('social');
for(var i=0;i<els.length;i++){
	els[i].addEventListener("click",function goto(){
		chrome.tabs.create({active:true,url:urls[i]})
	})
}