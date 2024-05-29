// Js untuk Navbar
const navigation = document.getElementById('nav'); // untuk mendapatkan elemen HTML dengan id="nav" dan tersimpan ke dalam variabel Navigation
const menu = document.getElementById('menu'); // // untuk mendapatkan elemen HTML dengan id="menu" dan tersimpan ke dalam variabel Menu

menu.addEventListener('click', () => {
	// event listener itu untuk mendeteksi klik pada elemen 'menu'. dan ketik di klik maka akan dijalankan

	navigation.style.setProperty('--childenNumber', navigation.children.length);
	// untuk Mengatur sebuah variabel CSS --childenNumber dengan jumlah anak dari elemen navigation. seperti <li> dalam <ul>.

	navigation.classList.toggle('active'); // untuk menambahkan/menghapus kelas 'active' pada elemen 'navigation'
	menu.classList.toggle('active'); // untuk menambahkan/mengapus kelas 'active' pada elemen 'menu' dan 'navigation'
});





//fungsi fly
const goToTop = () => {
	return (location.href = '#Home');
};



//Sales Perbulan
const ctx1 = document.getElementById('chart-2').getContext('2d');
const lineChart = new Chart(ctx1, {
	type: 'line',
	data: {
		labels: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'Mei',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'Mei',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'Mei',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'Mei',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
		datasets: [
			{
				label: 'Total Sales Per Month',
				data: [
					926929, 326370, 1911668, 1762336, 1537392, 1741447, 2027738, 1912360, 3303447, 1936858, 4900162, 3681679, 559404, 814060, 1644174, 2168021, 1831950, 1488433, 2007176, 2228368, 3876360,
					2317750, 4720169, 4005348, 1009505, 1175077, 2457987, 1801930, 2380132, 2547478, 2644062, 2052894, 4466174, 2296695, 4437111, 5037568, 1828788, 1609476, 3273477, 2284067, 3157171, 3121578,
					2998816, 2891349, 5067435, 3326550, 5982827, 5622997,
				],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
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

//Sales Pertahun
const ctx2 = document.getElementById('chart-3').getContext('2d');
const barChart = new Chart(ctx2, {
	type: 'bar',
	data: {
		labels: [2014, 2015, 2016, 2017],
		datasets: [
			{
				label: 'Total Sales Per Years',
				data: [25968386, 27661213, 32306613, 41164531],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
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

//Profitabilitas Penjualan
const ctx3 = document.getElementById('chart-4').getContext('2d');
const linechart2 = new Chart(ctx3, {
	type: 'line',
	data: {
		labels: [2014, 2015, 2016, 2017],
		datasets: [
			{
				label: '',
				data: [0.09, 0.12, 0.1, 0.11],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
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

//Total Sales Per-Category
const ctx4 = document.getElementById('chart-5').getContext('2d');
const doughnutbar = new Chart(ctx4, {
	type: 'doughnut',
	data: {
		labels: ['Technology', 'Furniture', 'Office Supplies'],
		datasets: [
			{
				label: 'Total Sales Per Years',
				data: [37097641, 45045015, 44958087],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1,
			},
		],
	},
});

//Total Sales Per-Shipmode
const ctx5 = document.getElementById('chart-6').getContext('2d');
const piebar = new Chart(ctx5, {
	type: 'pie',
	data: {
		labels: ['First Class', 'Second Class', 'Standard Class', 'Same Day'],
		datasets: [
			{
				label: 'Total Sales Per Years',
				data: [19252666, 25489491, 75883132, 6475454],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1,
			},
		],
	},
});

//Sales Per-SubCategory
const ctx6 = document.getElementById('chart-7').getContext('2d');
const barChart2 = new Chart(ctx6, {
	type: 'bar',
	data: {
		labels: [
			'Phones',
			'Chairs',
			'Storage',
			'Accessories',
			'Tables',
			'Furnishings',
			'Binders',
			'Paper',
			'Appliances',
			'Bookcases',
			'Machines',
			'Art',
			'Copiers',
			'Envelopes',
			'Supplies',
			'Labels',
			'Fasteners',
		],
		datasets: [
			{
				label: 'Total Sales Per-SubCategory ',
				data: [20350228, 19890127, 15134121, 11839826, 10484065, 8509469, 8290025, 7847924, 6617569, 6161354, 2721648, 2600578, 2185939, 1647638, 1269177, 1248630, 302425],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1,
			},
		],
	},
	options: {
		indexAxis: 'y',
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});

//Total Sales Per-Segment
const ctx7 = document.getElementById('chart-8').getContext('2d');
const doughnutbar2 = new Chart(ctx7, {
	type: 'doughnut',
	data: {
		labels: ['Corporate', 'Home Office', 'Consumer'],
		datasets: [
			{
				label: 'Total Sales Per Years',
				data: [38846921, 22751065, 65502757],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1,
			},
		],
	},
});

//5 Customers dengan pembelian tertinggi
const ctx8 = document.getElementById('chart-9').getContext('2d');
const barChart3 = new Chart(ctx8, {
	type: 'bar',
	data: {
		labels: ['Dan Reichenbach', 'William Brown', 'Laura Armstrong', 'Cassandra Brandow', 'Maria Etezadi'],
		datasets: [
			{
				label: '',
				data: [652803, 616010, 516833, 507672, 506598],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1,
			},
		],
	},
	options: {
		indexAxis: 'y',
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});
