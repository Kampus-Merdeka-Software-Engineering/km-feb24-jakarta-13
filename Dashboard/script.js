// Js untuk Navbar
const navigation = document.getElementById("nav"); // untuk mendapatkan elemen HTML dengan id="nav" dan tersimpan ke dalam variabel Navigation
const menu = document.getElementById("menu"); // // untuk mendapatkan elemen HTML dengan id="menu" dan tersimpan ke dalam variabel Menu

menu.addEventListener("click", () => { // event listener itu untuk mendeteksi klik pada elemen 'menu'. dan ketik di klik maka akan dijalankan

  navigation.style.setProperty("--childenNumber", navigation.children.length);
  // untuk Mengatur sebuah variabel CSS --childenNumber dengan jumlah anak dari elemen navigation. seperti <li> dalam <ul>.

  navigation.classList.toggle("active");  // untuk menambahkan/menghapus kelas 'active' pada elemen 'navigation'
  menu.classList.toggle("active"); // untuk menambahkan/mengapus kelas 'active' pada elemen 'menu' dan 'navigation'
});

const ctx1 = document.getElementById('myChartBulan').getContext('2d');
const lineChart = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [{
      label: 'Total Sales Per Month',
      data: [926929, 326370, 1911668, 1762336, 1537392, 1741447, 2027738, 1912360, 3303447, 1936858, 4900162, 3681679, 559404, 814060, 1644174, 2168021, 1831950, 1488433, 2007176, 2228368, 3876360, 2317750, 4720169, 4005348, 1009505, 1175077, 2457987, 1801930, 2380132, 2547478, 2644062, 2052894, 4466174, 2296695, 4437111, 5037568, 1828788, 1609476, 3273477,
        2284067, 3157171, 3121578, 2998816, 2891349, 5067435, 3326550, 5982827, 5622997],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const ctx2 = document.getElementById('myChart').getContext('2d');
const barChart = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: [2014, 2015, 2016, 2017
    ],
    datasets: [{
      label: 'Total Sales Per Years',
      data: [25968386, 27661213, 32306613, 41164531],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});





