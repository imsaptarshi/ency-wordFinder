const Http = new XMLHttpRequest();
const url="config.json";
Http.open("GET", url);
Http.send();

var config;



const random_word_req=new XMLHttpRequest();
const random_word_url="https://random-word-api.herokuapp.com/word"
random_word_req.open("GET",random_word_url)
random_word_req.send();
random_word_req.onreadystatechange=(e)=>{
	const query=random_word_req.responseText.substring(2,random_word_req.responseText.length-2)
	document.getElementById('word_of_the_day').innerHTML=query
	getDictionary(query)
}


function getDictionary(query){
	const dict_req=new XMLHttpRequest();
	const dict_url=`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
	dict_req.open("GET",dict_url)
	dict_req.send();
	dict_req.onreadystatechange=(e)=>{
		document.getElementById('pronunciation').innerHTML=JSON.parse(dict_req.responseText)[0].phonetics[0].text
	}
}