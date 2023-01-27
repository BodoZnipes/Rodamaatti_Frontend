// einmalige Definiton der URL
const URL = 'http://127.0.0.1:5000';


// Charts



// Request für Parkplatz Kennzahlen eines spezifischen Parkplatzes



// Request für Parkplatz-Selektor oben rechts 

async function searchpp() {

    var apiURL = URL + "/all/parkingplace"
    const response = await fetch(apiURL)
    pp_list = await response.json()

    selector = document.getElementById("Spaces")

    console.log(pp_list)


    pp_list.forEach(element => {
        option = document.createElement("option")
        option.text = element.pp_nickname
        option.id = element.pp_id
        selector.add(option)
    });



}



async function showpp(id){

    //Mit dem Selektor wird eine andere URL angesprochen. Somit sind auch andere Kennzahlen hinterlegt
    // Wenn Selektor auf alle steht, in die IF-Schleife gehen (data und labels von  "/org/parkingplace/info" erhalten)
    // wenn der Selektor auf "Alle " steht sollen also die Kennzahlen von der Alle-URL abgegriffen werden
    // ansonsten sollen die Kennzahlen der spezifischen Parkplätze abgegriffen werden 

    if(id === "all") {
        var apiURL = URL + "/org/parkingplace/info"

        const response = await fetch(apiURL)
        pp_profil = await response.json()
        console.log(pp_profil)

        //chart 1
        var popluar_times = pp_profil.total_popular_time

        var timearray = []
        var einheit = []
        for (time in popluar_times){
            timearray.push(time)
           einheit.push(popluar_times[time])
        }
        chart(timearray, einheit, "popular_time_container")
        console.log(einheit)


        //chart 2

        var popluar_times = pp_profil.popular_parkingplace

        var timearray = []
        var einheit = []
        for (time in popluar_times){
            timearray.push(time)
           einheit.push(popluar_times[time])
        }
        chart(timearray, einheit, "popular_parkingplace_container")
        console.log(einheit)

        

        //Charts löschen, die eventuell vorher von spezifischen Parkplatz erzeugt wurden

        document.getElementById("popular_month_container").innerHTML=""
        document.getElementById("popular_days_container").innerHTML=""
        document.getElementById("popular_lot_container").innerHTML=""
        document.getElementById("KPIs").style.display="none"
        
        
    }
    else{

// Wenn Selektor auf spezifischen Parkplatz steht, in  Else gehen (data und labels von  "/org/parkingplace/info?pp_id=" + id erhalten)
    var apiURL = URL + "/org/parkingplace/info?pp_id=" + id

    const response = await fetch(apiURL)
    pp_profil = await response.json()
    console.log(pp_profil)

 //chart 1 beliebte Tageszeit

    var popluar_times = pp_profil.res_popular_time

    var timearray = []
    var einheit = []
    for (time in popluar_times){
        timearray.push(time)
       einheit.push(popluar_times[time])
    }
    chart(timearray, einheit, "popular_time_container")
    console.log(einheit)
    
    //chart 2 beleibte Monate

    var popluar_times = pp_profil.res_popular_months

    var timearray = []
    var einheit = []
    for (time in popluar_times){
        timearray.push(time)
       einheit.push(popluar_times[time])
    }
    chart(timearray, einheit, "popular_month_container")
    console.log(einheit)

    //chart 3 beliebte Tage

    var popluar_times = pp_profil.res_popular_days

    var timearray = []
    var einheit = []
    for (time in popluar_times){
        timearray.push(time)
       einheit.push(popluar_times[time])
    }
    chart(timearray, einheit, "popular_days_container")
    console.log(einheit)

    //chart 4 beliebte Parkplätze 

    var popluar_times = pp_profil.res_popular_lot

    var timearray = []
    var einheit = []
    for (time in popluar_times){
        timearray.push(time)
       einheit.push(popluar_times[time])
    }
    chart(timearray, einheit, "popular_lot_container")
    console.log(einheit)


    //Div-Container mit KPI's sichtbar machen
    document.getElementById("KPIs").style.display="block";

    //KPI_cancel_rate

    const KPI = document.getElementById("KPI_cancel_rate");
    var popluar_times = pp_profil.avg_turnover_rate
    KPI.innerHTML = popluar_times;

    //KPI_res_avg_time

    const KPI2 = document.getElementById("KPI_res_avg_time");
    var popluar_times = pp_profil.res_avg_time
    KPI2.innerHTML = popluar_times;

    //KPI_avg_turnover_rate
    const KPI3 = document.getElementById("KPI_avg_turnover_rate");
    var popluar_times = pp_profil.avg_turnover_rate
    KPI3.innerHTML = popluar_times;

    //KPI_estimated_turnover
    const KPI4 = document.getElementById("KPI_estimated_turnover");
    var popluar_times = pp_profil.estimated_turnover
    KPI4.innerHTML = popluar_times;

}
}




//Chart mithilfe Funktion erzeugt, nur (data und labels werden zugeordnet)

 function chart(labels, data, id){
    
    const xtc = document.getElementById(id);
    xtc.innerHTML= ""
    var canvas = document.createElement("CANVAS");
    
    xtc.appendChild(canvas);
    const ctx = canvas;

var mychart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Anzahl Reservierungen',
            data: data,
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
 }

//Bild in Bas64 umwandeln

  function encodeImageFileAsURL(element) {
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            base64Output_raw = reader.result;
          console.log('RESULT: ', reader.result);
         base64Output = base64Output_raw.substring(24)
        }
        reader.readAsDataURL(file);
      }

    // Parkplatz hinzufügen


    async function addSpace(){
        const form = document.getElementById('addspaceform');
    form.addEventListener('submit', function(e) {
        e.preventDefault()});

        const payload = new FormData(form);
       // const data =Object.fromEntries(payload);
       const data ={"pp_max_duration_h" : payload.get('pp_max_duration_h'), "pp_cost_h": payload.get('pp_cost_h'), "pp_nickname":payload.get('pp_nickname') , "pp_plz": payload.get('pp_plz'), "pp_street": payload.get('pp_street'), "pp_state":payload.get('pp_state') ,"plan_img": base64Output}
        fetch(URL + "/org/parkingplace", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        }).then(res=> res.json())
            .then(data => createparkinglots(data.pp_id));
        

    }

    

    // Parkplatz editieren

    async function editSpace(){
        const form = document.getElementById('editspaceform');
  
    form.addEventListener('submit', function(e) {
        e.preventDefault()});

        const payload = new FormData(form);
        //const data =Object.fromEntries(payload);
        const data ={"pp_id": option.id ,"pp_max_duration_h" : payload.get('pp_max_duration_h'), "pp_cost_h": payload.get('pp_cost_h')}
        fetch(URL + "/org/parkingplace", {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(  data  ),
        });
        console.log(data)
    }


  //Vorschau Image

  function loadFile (event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  

async function createparkinglots(pp_id){

     count = document.getElementById('pp_lots').value;
     

     for ( var pl_id= 1; pl_id <= count; pl_id++) {
        console.log(pl_id)

        const data ={"pl_pp_id": pp_id, "pl_id": pl_id}
        fetch(URL + "/org/parkinglot", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data)
        })

     }
       
}

