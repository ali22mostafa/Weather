// get data
let res = {};
let temp = [];
async function getData(keySearch = "cairo") {
    let dataR = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=58424bd125b840138a5113107232302&q=${keySearch}&days=3`);
    res = await dataR.json();
    temp = res.forecast.forecastday;

    display();
    showDate();
}
getData();

// search for country
let locationSearch = document.getElementById("location");
locationSearch.addEventListener("keyup", function () {
    keySearch = this.value;
    if (keySearch.length >=3) {
        getData(keySearch);
    }
    
});
// convert and show date with day and month
function showDate() {
    let timeData = new Date(res.current.last_updated);
    let towmoro = new Date(temp[1].date);
    let aftertomo = new Date(temp[2].date);
    let day = timeData.toLocaleString("default", { weekday: "long" });
    let daytow = towmoro.toLocaleString("default", { weekday: "long" });
    let afterTomo = aftertomo.toLocaleString("default", { weekday: "long" });
    let month = timeData.toLocaleString("default", { month: "long" });
    document.getElementById("today").innerHTML = day;
    document.getElementById("month").innerHTML =
        `${temp[0].date.slice(-2)}` + month;
    document.getElementById("towmoro").innerHTML = daytow;
    document.getElementById("aftertomo").innerHTML = afterTomo;
}
// show data of weather
function display() {
    // show current case
    document.getElementById("nameOfCountry").innerHTML = res.location.name;
    document.getElementById("desc").innerHTML = res.current.condition.text;
    document.getElementById("deg").innerHTML =
        res.current.temp_c +
        `<sup>o </sup> <span>c</span> <span class="ms-5"><img src="${
            `https:` + res.current.condition.icon
        }" width="80px" height="80px" alt=""></span>`;
    document.getElementById("compass").innerHTML = res.current.wind_dir;
    document.getElementById("wind").innerHTML = res.current.wind_mph + ` m/h`;
    document.getElementById("umbrila").innerHTML = res.current.cloud + ` %`;
    // show second case
    document.getElementById("describtion").innerHTML =
        temp[1].day.condition.text;
    document
        .getElementById("img1")
        .setAttribute("src", `https:` + temp[1].day.condition.icon);
    document.getElementById("deg1").innerHTML =
        temp[1].day.maxtemp_c + `<sup>o </sup> <span>c</span> `;
    document.getElementById("deg1Smal").innerHTML =
        temp[1].day.mintemp_c + `<sup> o </sup>  `;

    // show thired case
    document.getElementById("describtion1").innerHTML =
        temp[2].day.condition.text;
    document
        .getElementById("img2")
        .setAttribute("src", `https:` + temp[2].day.condition.icon);
    document.getElementById("deg2").innerHTML =
        temp[2].day.maxtemp_c + `<sup>o </sup> <span>c</span> `;
    document.getElementById("deg2Smal").innerHTML =
        temp[2].day.mintemp_c + ` <sup> o </sup> `;
}

$(document).ready(function(){
    $(".loading").fadeOut(2000)
})