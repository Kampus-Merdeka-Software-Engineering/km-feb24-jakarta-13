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

// tombol Read More
function scrollToAboutUs() {
    const aboutUsSection = document.getElementById("AboutUs"); // Mengambil elemen "AboutUs"
    aboutUsSection.scrollIntoView({ behavior: 'smooth' }); // Menggulirkan halaman secara mulus ke bagian "AboutUs"
}

// Fungsi untuk mengarahkan pengguna kembali ke bagian atas halaman
const goToTop = () => {
    return (location.href = '#Home'); // Mengarahkan pengguna kembali ke bagian atas halaman dengan menggunakan anchor tag '#Home'
};

//Filter Container
// Memuat data dari file dataset13.json menggunakan fetch API
fetch('dataset13.json')
    .then(response => response.json()) // Mengubah respons menjadi objek JSON
    .then(data => {
        // Fungsi untuk memfilter dan menghitung data berdasarkan filter yang dipilih
        function filterData() {
            // Mengambil nilai dari elemen input untuk setiap filter
            const orderDate = document.getElementById('orderdate').value;
            const category = document.getElementById('category').value;
            const region = document.getElementById('region').value;
            const segment = document.getElementById('segment').value;

            // Memfilter data berdasarkan nilai filter yang dipilih
            const filteredData = data.filter(item => {
                return (
                    // Memeriksa apakah nilai filter kosong atau cocok dengan nilai pada data
                    (orderDate === "" || item['Order Date'].includes(orderDate)) &&
                    (category === "" || item['Category'] === category) &&
                    (region === "" || item['Region'] === region) &&
                    (segment === "" || item['Segment'] === segment)
                );
            });

            // Menghitung total penjualan dari data yang sudah difilter
            const totalSales = filteredData.reduce((acc, item) => {
                // Mengakumulasikan nilai penjualan setiap item setelah diubah ke tipe float
                return acc + parseFloat(item['Sales'].replace('$', '').replace('.', '').replace('-', '0'));
            }, 0);

            // Menghitung total profit dari data yang sudah difilter
            const totalProfit = filteredData.reduce((acc, item) => {
                // Mengakumulasikan nilai profit setiap item setelah diubah ke tipe float
                return acc + parseFloat(item['Profit'].replace('$', '').replace('.', '').replace('-', '0'));
            }, 0);

            // Menghitung total produk dari data yang sudah difilter
            const totalProduct = filteredData.reduce((acc, item) => {
                // Menambahkan jumlah produk jika terdapat Product ID pada item
                return acc + (item['Product ID'] ? 1 : 0);
            }, 0);

            // Menghitung total pelanggan dari data yang sudah difilter
            const totalCustomer = filteredData.reduce((acc, item) => {
                // Menambahkan jumlah pelanggan jika terdapat Customer ID pada item
                return acc + (item['Customer ID'] ? 1 : 0);
            }, 0);

            // Menampilkan hasil perhitungan pada elemen HTML
            document.getElementById('totalSales').innerText = totalSales.toLocaleString();
            document.getElementById('totalProfit').innerText = totalProfit.toLocaleString();
            document.getElementById('totalProduct').innerText = totalProduct;
            document.getElementById('totalCustomer').innerText = totalCustomer;
        }

        // Set nilai default dropdown untuk tahun order date
        document.getElementById('orderdate').value = '2014';

        // Panggil fungsi filterData saat halaman dimuat
        filterData();

        // Menambahkan event listener pada dropdown untuk memanggil fungsi filterData saat perubahan terjadi
        document.getElementById('dropdown').addEventListener('change', filterData);
    });

//Chart-1 MAP/PETA
document.addEventListener('DOMContentLoaded', () => {
    // Mengambil elemen dropdown filter dan menambahkan event listener untuk event 'change'
    const filters = document.getElementById('dropdown');
    filters.addEventListener('change', updateChart);

    // Membuat objek root untuk chart dengan ID "chart-1"
    let root = am5.Root.new("chart-1");

    // Menambahkan tema animasi ke chart
    root.setThemes([am5themes_Animated.new(root)]);

    // Membuat chart map menggunakan objek root yang telah dibuat sebelumnya
    let chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "none",
        projection: am5map.geoAlbersUsa(),
        layout: root.horizontalLayout
    }));

    // Membuat series untuk menampilkan data polygon pada map
    let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_usaLow,
        valueField: "value",
        calculateAggregates: true
    }));

    // Mengatur properti tooltip pada setiap polygon pada map
    polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}: {value}"
    });

    // Mengatur aturan-aturan untuk menampilkan warna (heatmap) pada setiap polygon
    polygonSeries.set("heatRules", [{
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color(0x8DAEFF),
        max: am5.color(0x0A2053),
        key: "fill"
    }]);

    // Membuat legend untuk heatmap
    let heatLegend = chart.children.push(am5.HeatLegend.new(root, {
        orientation: "vertical",
        startColor: am5.color(0x8DAEFF),
        endColor: am5.color(0x0A2053),
        startText: "Lowest",
        endText: "Highest",
        stepCount: 5
    }));

    // Mengatur properti untuk label awal dan akhir pada legend
    heatLegend.startLabel.setAll({
        fontSize: 12,
        fill: heatLegend.get("startColor")
    });

    heatLegend.endLabel.setAll({
        fontSize: 12,
        fill: heatLegend.get("endColor")
    });

    // Event handler untuk mengupdate legend heatmap ketika data pada polygon series telah divalidasi
    polygonSeries.events.on("datavalidated", function () {
        heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
        heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
    });

    // Fungsi untuk mengupdate chart berdasarkan filter yang dipilih
    function updateChart() {
        fetch('dataset13.json')
            .then(response => response.json())
            .then(data => {
                const orderDate = document.getElementById('orderdate').value;
                const category = document.getElementById('category').value;
                const region = document.getElementById('region').value;
                const segment = document.getElementById('segment').value;

                // Memfilter data berdasarkan filter yang dipilih
                const filteredData = data.filter(item => {
                    const year = new Date(item['Order Date']).getFullYear();
                    return (!orderDate || year == orderDate) &&
                        (!category || item['Category'] === category) &&
                        (!region || item['Region'] === region) &&
                        (!segment || item['Segment'] === segment);
                });

                const salesByState = {};

                // Menghitung total penjualan berdasarkan negara bagian
                filteredData.forEach(item => {
                    const state = item['State'];
                    const sales = parseFloat(item['Sales'].replace(/[\$,]/g, ''));

                    if (!salesByState[state]) {
                        salesByState[state] = 0;
                    }
                    salesByState[state] += sales;
                });

                // Mengubah data penjualan menjadi format yang sesuai untuk ditampilkan pada chart
                const polygonData = Object.keys(salesByState).map(state => {
                    const stateId = getStateId(state);
                    return {
                        id: stateId,
                        value: salesByState[state]
                    };
                });

                // Mengatur data pada polygon series dengan data penjualan yang sudah diupdate
                polygonSeries.data.setAll(polygonData);
            })
            .catch(error => console.error('Error loading data:', error));
    }

    // Fungsi untuk mendapatkan ID negara bagian berdasarkan nama negara bagian
    function getStateId(stateName) {
        const stateIdMapping = {
            'Alabama': 'US-AL',
            'Alaska': 'US-AK',
            'Arizona': 'US-AZ',
            'Arkansas': 'US-AR',
            'California': 'US-CA',
            'Colorado': 'US-CO',
            'Connecticut': 'US-CT',
            'Delaware': 'US-DE',
            'Florida': 'US-FL',
            'Georgia': 'US-GA',
            'Hawaii': 'US-HI',
            'Idaho': 'US-ID',
            'Illinois': 'US-IL',
            'Indiana': 'US-IN',
            'Iowa': 'US-IA',
            'Kansas': 'US-KS',
            'Kentucky': 'US-KY',
            'Louisiana': 'US-LA',
            'Maine': 'US-ME',
            'Maryland': 'US-MD',
            'Massachusetts': 'US-MA',
            'Michigan': 'US-MI',
            'Minnesota': 'US-MN',
            'Mississippi': 'US-MS',
            'Missouri': 'US-MO',
            'Montana': 'US-MT',
            'Nebraska': 'US-NE',
            'Nevada': 'US-NV',
            'New Hampshire': 'US-NH',
            'New Jersey': 'US-NJ',
            'New Mexico': 'US-NM',
            'New York': 'US-NY',
            'North Carolina': 'US-NC',
            'North Dakota': 'US-ND',
            'Ohio': 'US-OH',
            'Oklahoma': 'US-OK',
            'Oregon': 'US-OR',
            'Pennsylvania': 'US-PA',
            'Rhode Island': 'US-RI',
            'South Carolina': 'US-SC',
            'South Dakota': 'US-SD',
            'Tennessee': 'US-TN',
            'Texas': 'US-TX',
            'Utah': 'US-UT',
            'Vermont': 'US-VT',
            'Virginia': 'US-VA',
            'Washington': 'US-WA',
            'West Virginia': 'US-WV',
            'Wisconsin': 'US-WI',
            'Wyoming': 'US-WY'
        };

        return stateIdMapping[stateName] || '';
    }

    // Memanggil fungsi updateChart() untuk pertama kali saat DOM telah dimuat
    updateChart();
});

// Chart Selanjutnya
document.addEventListener('DOMContentLoaded', () => {
    // Mengambil konteks untuk setiap elemen canvas di halaman
    const ctxSalesMonth = document.getElementById('chart-2').getContext('2d');
    const ctxSalesYear = document.getElementById('chart-3').getContext('2d');
    const ctxProfitability = document.getElementById('chart-4').getContext('2d');
    const ctxCategory = document.getElementById('chart-5').getContext('2d');
    const ctxShipMode = document.getElementById('chart-6').getContext('2d');
    const ctxSubCategory = document.getElementById('chart-7').getContext('2d');
    const ctxSegment = document.getElementById('chart-8').getContext('2d');
    const ctxTopCustomers = document.getElementById('chart-9').getContext('2d');
    const ctxCLV = document.getElementById('chart-10').getContext('2d');
    const ctxAOV = document.getElementById('chart-11').getContext('2d');

    // Mendefinisikan variabel untuk setiap objek chart
    let chartSalesMonth, chartSalesYear, chartProfitability, chartCategory, chartShipMode, chartSubCategory, chartSegment, chartTopCustomers, chartCLV, chartAOV;

    // Menambahkan event listener pada dropdown untuk memperbarui grafik saat perubahan terjadi
    document.getElementById('dropdown').addEventListener('change', updateCharts);

    // Fungsi untuk memperbarui grafik
    function updateCharts() {
        // Memuat data dari dataset13.json
        fetch('dataset13.json')
            .then(response => response.json()) // Mengubah respons menjadi objek JSON
            .then(data => {
                // Memfilter data berdasarkan nilai input pengguna
                const filteredData = data.filter(item => {
                    const year = new Date(item['Order Date']).getFullYear();
                    const orderDate = document.getElementById('orderdate').value;
                    const category = document.getElementById('category').value;
                    const region = document.getElementById('region').value;
                    const segment = document.getElementById('segment').value;

                    return (!orderDate || year == orderDate) &&
                        (!category || item['Category'] === category) &&
                        (!region || item['Region'] === region) &&
                        (!segment || item['Segment'] === segment);
                });

                // Inisialisasi objek untuk menyimpan data hasil perhitungan
                const salesByMonth = {};
                const salesByYear = {};
                const profitability = {};
                const salesByCategory = {};
                const salesByShipMode = {};
                const salesBySubCategory = {};
                const salesBySegment = {};
                const customerSales = {};
                const orderValues = {};

                // Melakukan perhitungan berdasarkan data yang sudah difilter
                filteredData.forEach(item => {
                    // Mendapatkan tahun dan bulan dari tanggal pesanan
                    const orderDate = new Date(item['Order Date']);
                    const year = orderDate.getFullYear();
                    const month = orderDate.getMonth() + 1;
                    // Mendapatkan nilai penjualan dan profit dari item
                    const sales = parseFloat(item['Sales'].replace(/[\$,]/g, ''));
                    const profit = parseFloat(item['Profit'].replace(/[\$,]/g, ''));

                    // Menambahkan nilai penjualan per bulan
                    salesByMonth[month] = (salesByMonth[month] || 0) + sales;
                    // Menambahkan nilai penjualan per tahun
                    salesByYear[year] = (salesByYear[year] || 0) + sales;
                    // Menambahkan nilai profit per tahun
                    profitability[year] = (profitability[year] || 0) + profit;
                    // Menambahkan nilai penjualan per kategori
                    salesByCategory[item['Category']] = (salesByCategory[item['Category']] || 0) + sales;
                    // Menambahkan nilai penjualan per mode pengiriman
                    salesByShipMode[item['Ship Mode']] = (salesByShipMode[item['Ship Mode']] || 0) + sales;
                    // Menambahkan nilai penjualan per sub-kategori
                    data.slice(0, 100).forEach(item => {
                        // Filter data yang memiliki nilai sales tidak kosong
                        if (item['Sales']) {
                            // Filter berdasarkan Category
                            if (salesByCategory[item['Category']]) {
                                // Mendapatkan nilai penjualan dari data
                                const sales = parseFloat(item['Sales'].replace(/\$|,/g, ''));

                                // Menambahkan nilai penjualan per sub-kategori
                                salesBySubCategory[item['Sub-Category']] = (salesBySubCategory[item['Sub-Category']] || 0) + sales;
                            }
                        }
                    });
                    // Menambahkan nilai penjualan per segmen pelanggan
                    salesBySegment[item['Segment']] = (salesBySegment[item['Segment']] || 0) + sales;

                    // Menambahkan nilai penjualan dan jumlah pesanan per pelanggan
                    if (!customerSales[item['Customer Name']]) {
                        customerSales[item['Customer Name']] = { sales: 0, orders: 0 };
                    }
                    customerSales[item['Customer Name']].sales += sales;
                    customerSales[item['Customer Name']].orders += 1;

                    // Menambahkan nilai penjualan per pesanan
                    orderValues[item['Order ID']] = (orderValues[item['Order ID']] || 0) + sales;
                });

                // Mengurutkan data berdasarkan tahun yang diinginkan
                const desiredOrder = ['2014', '2015', '2016', '2017'];
                const sortedYears = desiredOrder.filter(year => Object.keys(salesByYear).includes(year));
                const sortedSales = sortedYears.map(year => salesByYear[year]);
                const sortedProfitability = sortedYears.map(year => profitability[year]);

                // Mengambil lima pelanggan teratas berdasarkan penjualan
                const topCustomers = Object.keys(customerSales).sort((a, b) => customerSales[b].sales - customerSales[a].sales).slice(0, 5);
                const topCustomerLabels = topCustomers;
                const topCustomerSales = topCustomers.map(customer => customerSales[customer].sales);

                // Menghitung nilai CLV untuk setiap pelanggan berdasarkan total penjualan yang dilakukan oleh setiap pelanggan.
                const clvData = Object.keys(customerSales)
                    .map(customer => ({
                        customer,
                        clv: customerSales[customer].sales
                    }))
                    .sort((a, b) => b.clv - a.clv)
                    .slice(0, 10); // Mengambil hanya 10 data teratas

                const clvLabels = clvData.map(item => item.customer);
                const clvValues = clvData.map(item => item.clv);

                //Menghitung nilai rata-rata dari setiap order yang dilakukan.
                const aovData = Object.keys(orderValues).map(orderId => orderValues[orderId]);
                const totalOrderValue = aovData.reduce((a, b) => a + b, 0);
                const aovValue = totalOrderValue / aovData.length;

                // Menghapus dan membuat ulang grafik untuk menampilkan data baru
                // Total Sales Per Month
                if (chartSalesMonth) chartSalesMonth.destroy();
                chartSalesMonth = new Chart(ctxSalesMonth, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Total Sales Per Month',
                            data: Object.values(salesByMonth),
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });

                // Total Sales Per Years
                if (chartSalesYear) chartSalesYear.destroy();

                chartSalesYear = new Chart(ctxSalesYear, {
                    type: 'bar',
                    data: {
                        labels: sortedYears,  // Menampilkan tahun-tahun sebagai label
                        datasets: [{
                            label: 'Total Sales Per Year',
                            data: sortedSales,
                            backgroundColor: sortedYears.map(year => {
                                switch (year) {
                                    case '2014':
                                        return 'rgba(255, 99, 132, 0.2)'; // Merah
                                    case '2015':
                                        return 'rgba(54, 162, 235, 0.2)'; // Biru
                                    case '2016':
                                        return 'rgba(255, 206, 86, 0.2)'; // Kuning
                                    case '2017':
                                        return 'rgba(75, 192, 192, 0.2)'; // Hijau
                                    default:
                                        return 'rgba(153, 102, 255, 0.2)'; // Default
                                }
                            }),
                            borderColor: sortedYears.map(year => {
                                switch (year) {
                                    case '2014':
                                        return 'rgba(255, 99, 132, 1)'; // Merah
                                    case '2015':
                                        return 'rgba(54, 162, 235, 1)'; // Biru
                                    case '2016':
                                        return 'rgba(255, 206, 86, 1)'; // Kuning
                                    case '2017':
                                        return 'rgba(75, 192, 192, 1)'; // Hijau
                                    default:
                                        return 'rgba(153, 102, 255, 1)'; // Default
                                }
                            }),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });


                // Sales Profitability
                if (chartProfitability) chartProfitability.destroy();
                chartProfitability = new Chart(ctxProfitability, {
                    type: 'line',
                    data: {
                        labels: sortedYears,
                        datasets: [{
                            label: 'Total Profitability Per Year',
                            data: sortedProfitability,
                            backgroundColor: sortedYears.map(year => {
                                switch (year) {
                                    case '2014':
                                        return 'rgba(255, 99, 132, 0.2)'; // Merah
                                    case '2015':
                                        return 'rgba(54, 162, 235, 0.2)'; // Biru
                                    case '2016':
                                        return 'rgba(255, 206, 86, 0.2)'; // Kuning
                                    case '2017':
                                        return 'rgba(75, 192, 192, 0.2)'; // Hijau
                                    default:
                                        return 'rgba(153, 102, 255, 0.2)'; // Default
                                }
                            }),
                            borderColor: sortedYears.map(year => {
                                switch (year) {
                                    case '2014':
                                        return 'rgba(255, 99, 132, 1)'; // Merah
                                    case '2015':
                                        return 'rgba(54, 162, 235, 1)'; // Biru
                                    case '2016':
                                        return 'rgba(255, 206, 86, 1)'; // Kuning
                                    case '2017':
                                        return 'rgba(75, 192, 192, 1)'; // Hijau
                                    default:
                                        return 'rgba(153, 102, 255, 1)'; // Default
                                }
                            }),
                            borderWidth: 1,
                            fill: false  // Untuk garis, tidak mengisi area di bawah garis
                        }]
                    },
                    options: {
                        scales: {
                            y: { beginAtZero: true }
                        },
                    }
                });

                // Total Sales Per Category
                if (chartCategory) chartCategory.destroy();

                chartCategory = new Chart(ctxCategory, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(salesByCategory),
                        datasets: [{
                            label: 'Total Sales Per Category',
                            data: Object.values(salesByCategory),
                            backgroundColor: Object.keys(salesByCategory).map(category => {
                                switch (category) {
                                    case 'Technology':
                                        return 'rgba(255, 99, 132, 0.2)'; // Merah
                                    case 'Furniture':
                                        return 'rgba(54, 162, 235, 0.2)'; // Biru
                                    case 'Office Supplies':
                                        return 'rgba(255, 206, 86, 0.2)'; // Kuning
                                    default:
                                        return 'rgba(75, 192, 192, 0.2)'; // Default
                                }
                            }),
                            borderColor: Object.keys(salesByCategory).map(category => {
                                switch (category) {
                                    case 'Technology':
                                        return 'rgba(255, 99, 132, 1)'; // Merah
                                    case 'Furniture':
                                        return 'rgba(54, 162, 235, 1)'; // Biru
                                    case 'Office Supplies':
                                        return 'rgba(255, 206, 86, 1)'; // Kuning
                                    default:
                                        return 'rgba(75, 192, 192, 1)'; // Default
                                }
                            }),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });


                // Total Sales Per Ship Mode
                if (chartShipMode) chartShipMode.destroy();
                chartShipMode = new Chart(ctxShipMode, {
                    type: 'pie',
                    data: {
                        labels: Object.keys(salesByShipMode),
                        datasets: [{
                            label: 'Total Sales Per Ship Mode',
                            data: Object.values(salesByShipMode),
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });

                // Total Sales Per Sub Category
                if (chartSubCategory) chartSubCategory.destroy();
                chartSubCategory = new Chart(ctxSubCategory, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(salesBySubCategory),
                        datasets: [{
                            label: 'Total Sales Per Sub Category',
                            data: Object.values(salesBySubCategory),
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });

                // Total Sales Per Segment
                if (chartSegment) chartSegment.destroy();

                chartSegment = new Chart(ctxSegment, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(salesBySegment),
                        datasets: [{
                            label: 'Total Sales Per Segment',
                            data: Object.values(salesBySegment),
                            backgroundColor: Object.keys(salesBySegment).map(segment => {
                                if (segment === 'Consumer') return 'rgba(255, 99, 132, 0.2)'; // Merah
                                if (segment === 'Home Office') return 'rgba(54, 162, 235, 0.2)'; // Biru
                                if (segment === 'Corporate') return 'rgba(255, 206, 86, 0.2)'; // Kuning
                                return 'rgba(75, 192, 192, 0.2)'; // Default
                            }),
                            borderColor: Object.keys(salesBySegment).map(segment => {
                                if (segment === 'Consumer') return 'rgba(255, 99, 132, 1)'; // Merah
                                if (segment === 'Home Office') return 'rgba(54, 162, 235, 1)'; // Biru
                                if (segment === 'Corporate') return 'rgba(255, 206, 86, 1)'; // Kuning
                                return 'rgba(75, 192, 192, 1)'; // Default
                            }),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });


                // Top 5 Customers by Sales
                if (chartTopCustomers) chartTopCustomers.destroy();
                chartTopCustomers = new Chart(ctxTopCustomers, {
                    type: 'bar',
                    data: {
                        labels: topCustomerLabels,
                        datasets: [{
                            label: 'Top 5 Customers by Sales',
                            data: topCustomerSales,
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });

                // Customer Lifetime Value
                if (chartCLV) chartCLV.destroy();
                chartCLV = new Chart(ctxCLV, {
                    type: 'bar',
                    data: {
                        labels: clvLabels,
                        datasets: [{
                            label: 'Customer Lifetime Value',
                            data: clvValues,
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });

                // Average Order Value
                if (chartAOV) chartAOV.destroy();
                chartAOV = new Chart(ctxAOV, {
                    type: 'bar',
                    data: {
                        labels: ['Average Order Value'],
                        datasets: [{
                            label: 'Average Order Value',
                            data: [aovValue],
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });
            });
    }

    updateCharts();
});
