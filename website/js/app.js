const zip = document.getElementById('zip');     //zipcode input
const feel = document.getElementById('feel');   //feeling textarea
const btn = document.getElementById('btn');     //generate btn
const key = 'de32b52bddf39edb7084f51310a6b3a4&units';  // weather api key 

const collectedData = {}; // temprature => api , current date , the feeling of the user (this is the data that will be sent to the server)
let finalData ={}; // the incoming data from the server (temp, current date, user feelings) to pend it in DOM

// fetch weather api to get temperature of the zipcode city and assign it in the collectedData object
const weather = async (zipcode,key)=>{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${key}=metric`);
   try{
    const data = await res.json();
    collectedData.temperature = Math.floor(data.main.temp);
   }
   catch(err){
    console.log('error',err)
    
   }
};

// set the current date and assign it in the collectedData object
const currentDate = ()=>{
    const time = new Date();
    const timeNow = time.toDateString();
    collectedData.date = timeNow;
};

// post the collected data in the collectedData object to the local server
const postData = async (url='',data={})=>{
    const response = await fetch(url,{
        method:'post',
        credentials:"same-origin",
        headers:{'content-type':'application/json',},
        body: JSON.stringify(data),
    });

    try{
        const sentData =await response.json();
        console.log(sentData)
        return sentData
    }catch(error){
        console.log('ooops',error)
    }

};

// get data from local server and pend it in Dom
const retrive = async ()=>{
    const res = await fetch('/all');
    try{
        const result = await res.json();
        finalData=result; // store the upcoming data in the 'finalData' object 
        document.getElementById('temp').innerHTML = `<i class="fa-solid fa-temperature-low temp"></i>  ${finalData.temperature} &deg;C`; // temperature 
        document.getElementById('date').innerHTML=`<i class="fa-solid fa-clock time"></i>  ${finalData.date}`;  // current date
        document.getElementById('feeling').innerHTML=`<i class="fa-solid fa-heart-pulse heart"></i> ${finalData.feelings}`; // user feelings
        
    }catch(err){
        console.log('oba',err)
    }
}

// click the generate data btn to 
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    showLoader()
    const zipCode = zip.value;   //store the zipcode input value to send it to the api to get the temp of the country

    collectedData.feelings = feel.value;   // store the user feeling in the 'collectedData' object that has the whole data  that will be sent to server 

    currentDate();   // set the current date and store it in the 'collectedData' object

    weather(zipCode,key)   // fetching the weather temp data and store it in the 'collectedData' object
    .then(()=>{
      postData('/add',collectedData);   // send the data that collected in the 'collectedData' object to server
      retrive('/all');   // fetching the data from the server and show it in the client side
      
    })
    
});

