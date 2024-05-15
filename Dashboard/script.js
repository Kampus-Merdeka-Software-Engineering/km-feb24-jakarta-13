        
        // Js untuk Bulan
        const ctxBulan = document.getElementById('myChartBulan').getContext('2d');
            new Chart(ctxBulan, {
                type: 'line', // tipe chart
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'Total Sales',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        borderColor: 'rgb(75, 192, 192)',
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

        // Js untuk Tahun
        // ctx adalah sebuah variabel. itu nanti akan digunakan untuk menggambar grafik menggunakan Chart.js.
        // document.getElementById('myChart'); untuk memanggil nama id yang ada di tag canvas
        const ctx = document.getElementById('myChart'); 
      
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
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

        // Js untuk State
        const ctxr = document.getElementById('myChartState'); 
      
        new Chart(ctxr, {
          type: 'scatter',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
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