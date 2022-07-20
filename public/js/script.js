console.log("hiii");

document.getElementById("forcastForm").addEventListener("submit", (event) => {
  event.preventDefault();
  getWeatherByLoaction();
});

const getWeatherByLoaction = async () => {
  try {
    const address = document.getElementById("address").value;
    const res = await fetch("http://localhost:3000/weather?address=" + address);
    const data = await res.json();
    console.log(data);
    if (data.error) {
      document.getElementsByClassName("error")[0].innerText = data.error;
      document.getElementsByClassName("location")[0].innerText = "";
      document.getElementsByClassName("forecast")[0].innerText = "";
    } else {
      document.getElementsByClassName("location")[0].innerText =
        data.location[0].toUpperCase() + data.location.slice(1);
      document.getElementsByClassName("forecast")[0].innerText = data.data + " C";
      document.getElementsByClassName("error")[0].innerText = "";
    }
  } catch (e) {
    alert(e);
  }
};
