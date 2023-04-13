const tempLoad = () =>{
    let temp = document.getElementById('temp');
    temp.innerHTML ="&#xf2cb";
    temp.style.color ="#f1c40f";

    setTimeout(() =>{
        temp.innerHTML ="&#xf2ca";
        temp.style.color ="#f39c12";
    }, 1000)

    setTimeout(() =>{
        temp.innerHTML ="&#xf2c9";
        temp.style.color ="#e67e22";
    }, 2000)

    setTimeout(() =>{
        temp.innerHTML ="&#xf2c8";
        temp.style.color ="#e74c3c";
    }, 3000)

    setTimeout(() =>{
        temp.innerHTML ="&#xf2c7";
        temp.style.color ="red";
    }, 4000)
}

tempLoad();

setInterval(tempLoad, 5000);



//weather display
const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    if(cityVal === ""){
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    }else{

        try{
           

            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=259430140a26a5eca4b4fa9f74408cab`;
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
            temp_status.innerHTML =
                "<i class='fa  fa-sun-o' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
            temp_status.innerHTML =
                "<i class='fa  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
            temp_status.innerHTML =
                "<i class='fa fa-tint' style='color: #a4b0be;'></i>";
            } else {
            temp_status.innerHTML =
                "<i class='fa fa-cloud' style='color:#f1f2f6;'></i>";

            }
            datahide.classList.remove('data_hide');
            cityVal = "";
           
       
        }catch{
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText =  `please enter the proper city name`;
            console.log('please add the proper city name');
        }
        
    }
}

submitBtn.addEventListener('click', getInfo);