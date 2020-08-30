let key = "2fbddeec374d79c5f43b8d106fe806ba";

let all_data = [
  { city: "NYC", state: "Hot", temp: 44, main: "Clear" },
  { city: "LA", state: "Clear", temp: 20, main: "Clouds" },
  { city: "Berlin", state: "Rainy", temp: 10, main: "Thunderstorm" },
];
// 9:30

const add_Recent = (box, data) => {
  let recent = document.createElement("div");
  recent.classList.add("alert", "alert-dismissible");
  let c;
  let states = [
    ["Thunderstorm", "alert-danger"],
    ["Clouds", "alert-warning"],
    ["Atmosphere", "alert-dark"],
    ["Clear", "alert-success"],
    ["Drizzle", "alert-primary"],
    ["Rain", "alert-info"],
    ["Snow", "alert-light"],
  ];
  recent.classList.add(states.filter((i) => i[0] == data.main)[0][1]);
  recent.innerHTML =
    `<button
                              type="button"
                              class="close"
                              data-dismiss="alert"
                              onclick="kill_Recent(r` +
    "i" +
    `)"
                          >
                              &times;
                          </button>
                          <strong>` +
    data.city +
    `</strong> : ` +
    data.state +
    `..
                          <span class="badge badge-dark">` +
    data.temp +
    `</span>`;
  box.prepend(recent);
};

const get_Response = (link) => {
  let request = new XMLHttpRequest();
  request.open("GET", link, false);
  request.send();
  return JSON.parse(request.responseText);
};

const get_Data = (city) => {
  let result = get_Response(
    "https://nominatim.openstreetmap.org/search?format=json&q=" + city
  );
  let x = result[1].lat,
    y = result[1].lon;
  result = get_Response(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      x +
      "&lon=" +
      y +
      "&exclude=minutely,hourly,daily&units=metric&appid=" +
      key
  );
  return {
    city: city,
    state: result.current.weather[0].description,
    main: result.current.weather[0].main,
    temp: result.current.temp,
  };
};

const show_Modal = () => {
  let city = document.getElementById("city").value;
  let head = document.getElementById("mh");
  let body = document.getElementById("mb");
  if (city == "") {
    head.innerHTML = "Hey!!";
    body.innerHTML = "You Have to Enter a City Name First!";
  } else {
    let data = get_Data(city);
    body.innerHTML = "";
    head.innerHTML = data.city + " : " + data.state + "(" + data.temp + ")";
    if (all_data.filter((i) => i.city == data.city).length == 0) {
      all_data.unshift(data);
      add_Recent(document.getElementById("recents"), data);
    }
  }
};

const init_Recents = () => {
  let box = document.getElementById("recents");
  for (let i = 0; i < all_data.length; i++) {
    add_Recent(box, all_data[i]);
  }
};

const kill_Recent = () => {
  // removing from local storage
};
