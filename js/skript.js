// einmalige Deklaration der URL
const URL = 'http://5.75.148.247:80';
//const URL = 'http://127.0.0.1:5000';




/* Request für Parkplatz-Selektor oben rechts 
 get Aufruf an API-Endpunkt. 
Antwort wird unter pp_list gespeichert. Für jedes Element, dass in pp_list enthalten ist soll eine Option erstellt werden. 
Die Option wird mit dem Text des Parkplatznamens gefüllt (pp_nickname).
Console.logs dienen dem Debugging */ 

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

    console.log(option.id)
 
}

 /*  Get-Aufruf an das Backend . ID wird aus der index.html-Datei mitgegeben. 
     Wenn Parkplatz-Selektor auf alle steht, in die IF-Schleife gehen (data und labels von  "/org/parkingplace/info" erhalten)
    Antwort wird unter pp_profil gespeichert.    */

async function showpp(id){

    if(id === "all") {
        var apiURL = URL + "/org/parkingplace/info"

        const response = await fetch(apiURL)
        pp_profil = await response.json()
        console.log(pp_profil)

        /* Diagramm 1
         2 Arrays erzeugen, die später für das Chart notwendig werden. In das timearray werden die Zeit-einheiten des Backends geladen.
        In das einheit-Array werden die spezifischen Datensätze geladen. In diesem Fall "total_popular_time" 
        Am Ende wird die Funktion chart aufgerufen. Im Konstruktor sind alle Diagramm notwendigen Daten enthalten*/
        var popluar_times = pp_profil.total_popular_time

        var timearray = []
        var einheit = []
        for (time in popluar_times){
            timearray.push(time)
           einheit.push(popluar_times[time])
        }
        chart(timearray, einheit, "popular_time_container")
        console.log(einheit)


        /*Diagramm 2
        Selbes Verfahren wie bei Diagramm 1. Jedoch werden die spzeifischen Daten durch "popular_parkingplace" ausgetauscht*/
        var popluar_times = pp_profil.popular_parkingplace

        var timearray = []
        var einheit = []
        for (time in popluar_times){
            timearray.push(time)
           einheit.push(popluar_times[time])
        }
        chart(timearray, einheit, "popular_parkingplace_container")
        console.log(einheit)

        

        /* Da manche Kennzahlen und Diagramme nur bei spezifischen Parkplätzen vorhanden sind, müssen diese für 
        die aggregierte Version ausgeblednet werden.
        Ebenfalls werden die Diagrammüberschriften ausgeblendet (ID 2 , 3 ,4 ) */

        document.getElementById("popular_month_container").innerHTML=""
        document.getElementById("popular_days_container").innerHTML=""
        document.getElementById("popular_lot_container").innerHTML=""
        document.getElementById("2").style.display="none"
        document.getElementById("3").style.display="none"
        document.getElementById("4").style.display="none"
        document.getElementById("KPIs").style.display="none"
        
        
    }
    else{

    // Wenn Parkplatz-Selektor auf spezifischen Parkplatz steht, in  Else gehen (data und labels von  "/org/parkingplace/info?pp_id=" + id erhalten)
    var apiURL = URL + "/org/parkingplace/info?pp_id=" + id

    const response = await fetch(apiURL)
    pp_profil = await response.json()
    console.log(pp_profil)

    /*Diagramm 1
        Verfahren bereits erklärt Jedoch werden die spzeifischen Daten durch "res_popular_time" ausgetauscht*/

    var popluar_times = pp_profil.res_popular_time

    var timearray = []
    var einheit = []
    for (time in popluar_times){
        timearray.push(time)
       einheit.push(popluar_times[time])
    }
    chart(timearray, einheit, "popular_time_container")
    console.log(einheit)
    
    /*Diagramm 2
        Verfahren bereits erklärt Jedoch werden die spzeifischen Daten durch "res_popular_months" ausgetauscht*/

    document.getElementById("2").style.display="block"

    var popluar_times = pp_profil.res_popular_months

    var timearray = []
    var einheit = []
    for (time in popluar_times){
        timearray.push(time)
       einheit.push(popluar_times[time])
    }
    chart(timearray, einheit, "popular_month_container")
    console.log(einheit)

    /*Diagramm 3
        Verfahren bereits erklärt Jedoch werden die spzeifischen Daten durch "res_popular_days" ausgetauscht*/

    document.getElementById("3").style.display="block"
    var popluar_times = pp_profil.res_popular_days

    var timearray = []
    var einheit = []
    for (time in popluar_times){
        timearray.push(time)
       einheit.push(popluar_times[time])
    }
    chart(timearray, einheit, "popular_days_container")
    console.log(einheit)

    /*Diagramm 4
        Verfahren bereits erklärt Jedoch werden die spzeifischen Daten durch "res_popular_lot" ausgetauscht*/

    document.getElementById("4").style.display="block"

    var popluar_times = pp_profil.res_popular_lot

    var timearray = []
    var einheit = []
    for (time in popluar_times){
        timearray.push(time)
       einheit.push(popluar_times[time])
    }
    chart(timearray, einheit, "popular_lot_container")
    console.log(einheit)


    // Da die spezifischen Parkplätze Kennzahlen enthalten müssen diese sichtbar gemacht werden.
    // --> Div-Container der  KPI's enthält sichtbar machen
    document.getElementById("KPIs").style.display="block";


    // Einzelne KPI_cancel_rate sichtbar machen

    const KPI = document.getElementById("KPI_cancel_rate");
    var popluar_times = pp_profil.avg_turnover_rate
    KPI.innerHTML = popluar_times;

    // Einzelne KPI_res_avg_time sichtbar machen

    const KPI2 = document.getElementById("KPI_res_avg_time");
    var popluar_times = pp_profil.res_avg_time
    KPI2.innerHTML = (popluar_times/3600).toFixed(2);

    // Einzelne KPI_avg_turnover_rate sichtbar machen
    const KPI3 = document.getElementById("KPI_avg_turnover_rate");
    var popluar_times = pp_profil.avg_turnover_rate
    KPI3.innerHTML = popluar_times;

    // Einzelne KPI_estimated_turnover sichtbar machen
    const KPI4 = document.getElementById("KPI_estimated_turnover");
    var popluar_times = pp_profil.estimated_turnover
    KPI4.innerHTML = popluar_times.toFixed(2);

}
}




/*Chart mithilfe Funktion erzeugt. Im Konstruktor die Label-bezeichnungen und die spezfischen Daten des Backend enthalten.
Das chart wird mithilfe von Chart.js erzeugt.
Der erste des Teil unterhalb des Konstruktors ist dafür zuständig, dass mehrere Charts erzeugt werden können aber dennoch nur 1 Funktion gebraucht wird. */

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

/*Die vom Nutzer hochgeladenen Bilder müssen in einen Base64 String umgewandelt werden (Backend-Anforderung)
 Funktion wird mithilfe eines FileReaders umgesetzt. 
 Da der File-Reader aber nicht den puren  Base64String widergibt sondern zusätzlich noch : data:image/jpeg;base64,
 muss dieser Präfix entfernt werden mithilfe einer substring-Methode  */

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

      /* Funktion um das hochgeladene Bild zur Vorschau anzuzeigen. Hier wird ebenfalls der FileReader benutzt. 
      Das Bild wird unter der Variable output gespeichert.*/

  function loadFile (event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  

    /* Funktion dient zum hinzufügen eines Parkplatzes. Post-Aufruf an das Backend. 
    Hauptbestandteil dieses POST's ist der Body. Dieser wird mithilfe der varibale form gefüllt, die widerrum in FormData als Input verwendet wird.
    Durch diese Logik wird es ermöglicht auf die Form-Inputs in der addspace.html-Datei zuzugreifen. 
    Unter der Varibale data wird der Body definiert. Die angegebenen Strings bilden die einzelnen Inputs, rechts daneben die Werte.
    Der Body muss noch in einen JSON verwandelt werden (JSON.stringfy)
    Die Antwort des Backends wird in data gespeichert. Benötigt wird für den Funktionsaufruf createparkinglots nur die pp_id (deswegen data.pp_id im Konstruktor angegeben)  */

    async function addSpace(){
        const form = document.getElementById('addspaceform');
    form.addEventListener('submit', function(e) {
        e.preventDefault()});

        const payload = new FormData(form);
       const data ={ "pp_max_duration_h" : payload.get('pp_max_duration_h'), "pp_cost_h": payload.get('pp_cost_h'), "pp_nickname":payload.get('pp_nickname') , "pp_plz": payload.get('pp_plz'), "pp_street": payload.get('pp_street'), "pp_state":payload.get('pp_state') ,"plan_img": base64Output}
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



      /*Einzelne Parkplätze dem großen Parkplatz hinzufügen 
      Jeder Get-Aufruf symbolisiert einen hinzugefügten Parkplatz. Deswegen eine For-Schleife. 
      Die Anzahl der Parkplätze wird über Count eingelesen. Die For-Schleife startet bei 1 und nicht bei 0, weil bei einer Angabe von 10, 10 Parkpätze erstellt werden
      sollen und nicht 11.
      Da POST-Aufruf gleiche Logik wie beim vorherigen POST-Aufruf */

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
    

    /* PATCH-Aufruf um einen Parkplatz zu editieren.
    Funktion ähnlich wie beim POST-Aufruf mithilfe der "form"-logik. 
    Um herauszufinden welcher Parkplatz editiert werden soll diennen die Variablen index und id.
    Aus dem Selektor werden die einzelnen Indexe herausgelesen und dann die ID's abgegriffen und unter id gespeichert. 
    Das Bild wird mithilfe der Varibale base64Output an die API übergeben. */

    async function editSpace(){
        const form = document.getElementById('editspaceform');
  
        var e = document.getElementById("Spaces");
        var index = e.selectedIndex;
        var id = e[index].id

    form.addEventListener('submit', function(e) {
        e.preventDefault()});

        const payload = new FormData(form);
        const data ={"pp_id": id ,"pp_max_duration_h" : payload.get('pp_max_duration_h'), "pp_cost_h": payload.get('pp_cost_h'), "plan_img": base64Output }
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






