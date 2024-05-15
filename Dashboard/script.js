// Js untuk Navbar
const navigation = document.getElementById("nav"); // untuk mendapatkan elemen HTML dengan id="nav" dan tersimpan ke dalam variabel Navigation
const menu = document.getElementById("menu"); // // untuk mendapatkan elemen HTML dengan id="menu" dan tersimpan ke dalam variabel Menu

menu.addEventListener("click", () => { // event listener itu untuk mendeteksi klik pada elemen 'menu'. dan ketik di klik maka akan dijalankan
  
  navigation.style.setProperty("--childenNumber", navigation.children.length);
  // untuk Mengatur sebuah variabel CSS --childenNumber dengan jumlah anak dari elemen navigation. seperti <li> dalam <ul>.

  navigation.classList.toggle("active");  // untuk menambahkan/menghapus kelas 'active' pada elemen 'navigation'
  menu.classList.toggle("active"); // untuk menambahkan/mengapus kelas 'active' pada elemen 'menu' dan 'navigation'
});

// Js untuk Bulan
const ctxBulan = document.getElementById("myChartBulan").getContext("2d");
new Chart(ctxBulan, {
  type: "line", // untuk menentukan tipe grafik
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Total Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});


// Js untuk Tahun
// ctx adalah sebuah variabel. itu nanti akan digunakan untuk menggambar grafik menggunakan Chart.js.
// document.getElementById('myChart'); untuk memanggil nama id yang ada di tag canvas
const ctx = document.getElementById("myChart"); 

new Chart(ctx, {
  type: "bar", // untuk menentukan tipe grafik
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [ 
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3], // untuk menentukan data
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
  },
});

// Js untuk State
const ctxr = document.getElementById("myChartState");

new Chart(ctxr, {
  type: "scatter", // untuk menentukan tipe grafik
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
