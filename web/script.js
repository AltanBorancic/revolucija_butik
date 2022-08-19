trenutno_input = null

const resourceName = 'butik'

window.addEventListener('message', function(event) {
  let data = event.data

  if (data.tip == "butik") {
    $(".content").show()

  } else if (data.tip == "zatvori") {
    $(".content").hide()
    // $.post(`https://${GetParentResourceName()}/zatvori`, JSON.stringify({}));
  }
});

function promjeni_heading(self){
    $.post('https://' + resourceName + '/promjeniHeading', JSON.stringify({
        broj : self.value+".0"}))
}

function setup(self){
    if (trenutno_input != null){
        trenutno_input.style=""
        //self.style="box-shadow:0px 0px 0px 1px #ff6610 inset;background: rgba(255, 255, 255, 0.06);"
    }
    trenutno_input = self

}

function promjeni_boju(self){
    request(self.id, self.value)
}

function hexToRgb(hex) {
    const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (normal) return normal.slice(1).map(e => parseInt(e, 16));
  
    const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (shorthand) return shorthand.slice(1).map(e => 0x11 * parseInt(e, 16));
  
    return null;
  }

function hexToRgbNew(hex) {
    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0,parseInt(hex, 16),false);
    var arrByte = new Uint8Array(arrBuff);
  
    return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
  }

function promjeni_broj(status=null,id=null){
    self = document.getElementById(id)

    if(status == null || status == "null"){
        request(self.id,self.value)
    }
    else if(status){
        if (parseInt(self.value)+1 > parseInt(self.max)){return}
        self.value = (parseInt(self.value)+1)
        request(self.id,self.value)
        return
    }
    else{
        if (parseInt(self.value)-1 < parseInt(self.min)){return}
        self.value = (parseInt(self.value)-1)
        request(self.id,self.value)
        return
    }
}

function promjeni_kameru(self){}
function promjeni_kameru_v2(self){
    $.post('https://' + resourceName + '/promjeniKameruNaDugme', JSON.stringify({
        item : self.id
    }))
}
trenutno_item = null
function izaberi_item_na_vrhu(self){
    if (trenutno_item == null){
        trenutno_item = self
    }
    else{
        trenutno_item.className = "item"
        trenutno_item = self
    }
    self.className = "item aktivan"
    text = self.textContent.trim()
    if (text == "IDENTITET"){ubaci_identitet()}
    else if (text == "ODJECA"){ubaci_odjecu()}
    else if (text == "LICE"){ubaci_lice()}
    else if (text == "NAKIT"){ubaci_nakit()}
    else if (text == "ŠMINKA"){ubaci_sminku()}
    else{ocisti()}
}

function ocisti(){
    div = document.getElementsByClassName("sadrzaj")[0]
    div.innerHTML = ""
}

function ubaci_identitet(){
    div = document.getElementsByClassName("sadrzaj")[0]
    itemi = ""
    baza = config.IDENTITET
    for (let i = 0; i < baza.length; i++) {
        if (window.localStorage.getItem(baza[i].ID) == null){
            window.localStorage.setItem(baza[i].ID,0)
        }
        Max = 255 
        Min = -1
        if (baza[i].Max != null){
            Max = baza[i].Max
        }
        if (baza[i].Min != null){
            Min = baza[i].Min
        }
        if (baza[i].Type == "broj"){
            itemi += `
            <div class="item">
			    <p>`+baza[i].Naziv+`</p>
			    <i class="fa fa-angle-left left" onclick="promjeni_broj(false,'`+baza[i].ID+`')"></i>
			    <i class="fa fa-angle-right right" onclick="promjeni_broj(true,'`+baza[i].ID+`')"></i>
			    <input  onclick="promjeni_kameru(this)" type="number" min="`+Min+`" max = "`+Max+`" value="`+window.localStorage.getItem(baza[i].ID)+`" onmouseover="setup(this)" oninput="promjeni_broj(null,'`+baza[i].ID+`')"  id="`+baza[i].ID+`">
		    </div>
        `
        }
        else if (baza[i].Type == "boja"){
            itemi += `
            <div class="item">
			    <p>`+baza[i].Naziv+`</p>
                <i class="fa fa-angle-left left" onclick="promjeni_broj(false,'`+baza[i].ID+`')"></i>
			    <i class="fa fa-angle-right right" onclick="promjeni_broj(true,'`+baza[i].ID+`')"></i>
			    <input  onclick="promjeni_kameru(this)" type="number" oninput="promjeni_boju(this)" value="`+window.localStorage.getItem(baza[i].ID)+`" min="`+Min+`" max="`+Max+`" onmouseover="setup(this)" id="`+baza[i].ID+`">
		    </div>
        `
        }
        else{itemi += `
        <div class="item">
			<p>`+baza[i].Naziv+`</p>
            <input  onclick="promjeni_kameru(this)" type="range" value="`+window.localStorage.getItem(baza[i].ID)+`" min="`+Min+`" max="`+Max+`" onmouseover="setup(this)" id="`+baza[i].ID+`">
		</div>`}
    }
    if (window.localStorage.getItem("spremljeno") == "123"){
        content = `  
        <section class="skidanje">
            <h3>PROMJENITE KAMERU</h3>
            <div class="itemi">
                <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1024px" height="1024px" viewBox="0 0 1024 1024" class="icon"><path  d="M628.736 528.896A416 416 0 01928 928H96a415.872 415.872 0 01299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 11-416 0 208 208 0 01416 0z"/></svg>
                </div>
                <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera3">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.2" baseProfile="tiny" id="Layer_1" x="0px" y="0px" viewBox="0 0 256 256" xml:space="preserve"><g id="XMLID_1_"><path id="XMLID_4_" d="M232.4,227c-0.1,0-0.2,0.4-0.3,0.4c-32.4-2.3-31.3-63.7-33-80.4h-21.9c3.4-32.8,5.4-74.8,5.4-120.5   c0-9-0.1-17.8-0.2-26.5h-47.9c-0.2,8.7-0.2,17.5-0.2,26.5c0,45.7,2,87.7,5.4,120.5H134v104h28v-23.3l25.7,23.3h68.6   C256.3,238,245.6,227,232.4,227z"/><path id="XMLID_7_" d="M120.7,26.5c0-9-0.1-17.8-0.2-26.5H72.6c-0.2,8.7-0.2,17.5-0.2,26.5c0,45.7,2,87.7,5.4,120.5H57.2   c-1.7,16.6-0.6,78.1-33,80.4c-0.1,0-0.2-0.4-0.3-0.4c-13.2,0-24,10.8-24,24h68.6L94,227.7V251h28V147h-6.8   C118.6,114.2,120.7,72.2,120.7,26.5z"/></g></svg>
                </div>
                <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera2">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M256,128c35.375,0,64-28.625,64-64S291.375,0,256,0s-64,28.625-64,64S220.625,128,256,128z"/><path d="M256,160c-71.781,0-128,42.156-128,96v64c0,17.688,14.313,32,32,32h32v128c0,17.688,14.313,32,32,32h64   c17.688,0,32-14.313,32-32V352h32c17.688,0,32-14.313,32-32v-64C384,202.156,327.781,160,256,160z"/></g></svg>
                </div>
            </div>
        </section>

        <section class="menu">`+itemi+`</section>`
    }
    else{
        content = `
        <section class="pol">
        <h3>POL</h3>
           <div class="itemi">
            <div class="item" onclick="promjeni_pol(this)" id="1">
                <i class="fa fa-mars"></i>
                <span>Musko</span>
            </div>
            <div class="item" onclick="promjeni_pol(this)" id="2">
                <i class="fa fa-venus"></i>
                <span>Zensko</span>
            </div>
        </div>
           </section>
        
        <section class="menu">`+itemi+`</section>`
    }
    div.innerHTML = content
}

function ubaci_odjecu(){
    div = document.getElementsByClassName("sadrzaj")[0]
    itemi = ""
    baza = config.ODJECA
    for (let i = 0; i < baza.length; i++) {
        if (window.localStorage.getItem(baza[i].ID) == null){
            window.localStorage.setItem(baza[i].ID,0)
        }
        Max = 255 
        Min = -1
        if (baza[i].Max != null){
            Max = baza[i].Max
        }
        if (baza[i].Min != null){
            Min = baza[i].Min
        }
        if (baza[i].Type == "broj"){
            itemi += `
            <div class="item">
			    <p>`+baza[i].Naziv+`</p>
			    <i class="fa fa-angle-left left" onclick="promjeni_broj(false,'`+baza[i].ID+`')"></i>
			    <i class="fa fa-angle-right right" onclick="promjeni_broj(true,'`+baza[i].ID+`')"></i>
			    <input  onclick="promjeni_kameru(this)" type="number" min="`+Min+`" max = "`+Max+`" value="`+window.localStorage.getItem(baza[i].ID)+`" onmouseover="setup(this)" oninput="promjeni_broj(null,'`+baza[i].ID+`')" id="`+baza[i].ID+`">
		    </div>
        `
        }
        else if (baza[i].Type == "boja"){
            itemi += `
            <div class="item">
			    <p>`+baza[i].Naziv+`</p>
                <i class="fa fa-angle-left left" onclick="promjeni_broj(false,'`+baza[i].ID+`')"></i>
			    <i class="fa fa-angle-right right" onclick="promjeni_broj(true,'`+baza[i].ID+`')"></i>
			    <input  onclick="promjeni_kameru(this)" type="number" oninput="promjeni_boju(this)" value="`+window.localStorage.getItem(baza[i].ID)+`" min="`+Min+`" max="`+Max+`" onmouseover="setup(this)" id="`+baza[i].ID+`">
		    </div>
        `
        }
        else{itemi += `
        <div class="item">
			<p>`+baza[i].Naziv+`</p>
            <input  onclick="promjeni_kameru(this)" type="range"  onclick="promjeni_kameru(this)" value="`+window.localStorage.getItem(baza[i].ID)+`" min="`+Min+`" max="`+Max+`" onmouseover="setup(this)" id="`+baza[i].ID+`">
		</div>`}
    }
    content = `
    <section class="skidanje">
		<h3>SKINITE ODJECU</h3>
		<div class="itemi">
			<div class="item" onclick="skini_odjecu(this)" id="skinuto1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M341.52 285.56c33.65 0 82.34-6.94 82.34-47 .22-6.74.86-1.82-20.88-96.24-4.62-19.15-8.68-27.84-42.31-44.65-26.09-13.34-82.92-35.37-99.73-35.37-15.66 0-20.2 20.17-38.87 20.17-18 0-31.31-15.06-48.12-15.06-16.14 0-26.66 11-34.78 33.62-27.5 77.55-26.28 74.27-26.12 78.27 0 24.8 97.64 106.11 228.47 106.11M429 254.84c4.65 22 4.65 24.35 4.65 27.25 0 37.66-42.33 58.56-98 58.56-125.74.08-235.91-73.65-235.91-122.33a49.55 49.55 0 0 1 4.06-19.72C58.56 200.86 0 208.93 0 260.63c0 84.67 200.63 189 359.49 189 121.79 0 152.51-55.08 152.51-98.58 0-34.21-29.59-73.05-82.93-96.24"/></svg>
			</div>
            <div class="item" onclick="skini_odjecu(this)" id="skinuto2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M574.1 280.37L528.75 98.66c-5.91-23.7-21.59-44.05-43-55.81-21.44-11.73-46.97-14.11-70.19-6.33l-15.25 5.08c-8.39 2.79-12.92 11.86-10.12 20.24l5.06 15.18c2.79 8.38 11.85 12.91 20.23 10.12l13.18-4.39c10.87-3.62 23-3.57 33.16 1.73 10.29 5.37 17.57 14.56 20.37 25.82l38.46 153.82c-22.19-6.81-49.79-12.46-81.2-12.46-34.77 0-73.98 7.02-114.85 26.74h-73.18c-40.87-19.74-80.08-26.75-114.86-26.75-31.42 0-59.02 5.65-81.21 12.46l38.46-153.83c2.79-11.25 10.09-20.45 20.38-25.81 10.16-5.3 22.28-5.35 33.15-1.73l13.17 4.39c8.38 2.79 17.44-1.74 20.23-10.12l5.06-15.18c2.8-8.38-1.73-17.45-10.12-20.24l-15.25-5.08c-23.22-7.78-48.75-5.41-70.19 6.33-21.41 11.77-37.09 32.11-43 55.8L1.9 280.37A64.218 64.218 0 0 0 0 295.86v70.25C0 429.01 51.58 480 115.2 480h37.12c60.28 0 110.37-45.94 114.88-105.37l2.93-38.63h35.75l2.93 38.63C313.31 434.06 363.4 480 423.68 480h37.12c63.62 0 115.2-50.99 115.2-113.88v-70.25c0-5.23-.64-10.43-1.9-15.5zm-370.72 89.42c-1.97 25.91-24.4 46.21-51.06 46.21H115.2C86.97 416 64 393.62 64 366.11v-37.54c18.12-6.49 43.42-12.92 72.58-12.92 23.86 0 47.26 4.33 69.93 12.92l-3.13 41.22zM512 366.12c0 27.51-22.97 49.88-51.2 49.88h-37.12c-26.67 0-49.1-20.3-51.06-46.21l-3.13-41.22c22.67-8.59 46.08-12.92 69.95-12.92 29.12 0 54.43 6.44 72.55 12.93v37.54z"/></svg>
			</div>
			<div class="item" onclick="skini_odjecu(this)" id="skinuto3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z"/></svg>
			</div>
            <div class="item" onclick="skini_odjecu(this)" id="skinuto4">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 430.891 430.891" style="enable-background:new 0 0 430.891 430.891;" xml:space="preserve"><g>    <path d="M196.005,374.908H11.224c-4.553,0-8.637,3.684-9.104,8.211l-2.074,20.075c-0.238,2.301,0.456,4.483,1.956,6.146   s3.6,2.579,5.913,2.579h186.576c4.623,0,8.562-3.757,8.78-8.375l0.946-20.025c0.108-2.283-0.69-4.441-2.25-6.076   C200.409,375.809,198.291,374.908,196.005,374.908z"/>    <path d="M430.845,403.195l-2.074-20.076c-0.467-4.527-4.551-8.211-9.104-8.211H234.728c-2.288,0-4.405,0.901-5.959,2.539   s-2.345,3.797-2.226,6.083l1.047,20.028c0.241,4.61,4.192,8.361,8.81,8.361h186.576c2.313,0,4.413-0.916,5.913-2.579   S431.083,405.495,430.845,403.195z"/>    <path d="M240.999,60.328V45.273c0-0.813-0.687-1.5-1.5-1.5h-48.107c-0.813,0-1.5,0.687-1.5,1.5v15.055c0,0.813,0.687,1.5,1.5,1.5   h48.107C240.313,61.828,240.999,61.142,240.999,60.328z"/>    <path d="M233.604,358.392h183.841c2.313,0,4.412-0.916,5.912-2.578c1.5-1.663,2.195-3.846,1.957-6.147L402.709,130.93   c-0.367-3.565-1.79-8.928-3.238-12.21L383.766,83.14c3.223-2.04,5.375-5.627,5.375-9.716V30.471c0-6.341-5.159-11.5-11.5-11.5   H53.25c-6.341,0-11.5,5.159-11.5,11.5v42.954c0,4.193,2.263,7.858,5.625,9.868l-15.912,35.428   c-1.472,3.273-2.913,8.637-3.281,12.209L5.577,349.666c-0.238,2.302,0.457,4.484,1.957,6.147c1.5,1.662,3.6,2.578,5.912,2.578   h183.575c4.623,0,8.563-3.757,8.781-8.375l5.058-106.983c0.093-1.972,1.841-3.657,3.816-3.681l0.775-0.009   c1.93,0,3.646,1.626,3.745,3.553l5.597,107.133C225.035,354.641,228.986,358.392,233.604,358.392z M191.392,76.828   c-9.098,0-16.5-7.402-16.5-16.5V45.273c0-9.098,7.402-16.5,16.5-16.5h48.107c9.098,0,16.5,7.402,16.5,16.5v15.055   c0,9.098-7.402,16.5-16.5,16.5H191.392z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            </div>
            <div class="item" onclick="skini_odjecu(this)" id="skinuto5">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 503.607 503.607" style="enable-background:new 0 0 503.607 503.607;" xml:space="preserve"><g transform="translate(1)"><g>    <g>        <path d="M502.548,305.958c-0.017-0.436-0.117-0.856-0.201-1.293c-0.092-0.428-0.176-0.848-0.327-1.251     c-0.092-0.243-0.084-0.495-0.193-0.73c-10.248-22.016-48.564-29.906-97.087-39.894c-23.225-4.784-48.858-10.089-73.921-17.5     c-0.403,1.116-1.007,2.182-1.905,3.089l-26.708,26.708c-1.637,1.645-3.785,2.459-5.934,2.459c-2.14,0-4.289-0.814-5.934-2.459     c-3.273-3.273-3.273-8.586,0-11.868l23.401-23.401c-4.658-1.603-9.275-3.307-13.824-5.103c-0.378,0.73-0.755,1.46-1.368,2.065     L273.524,261.8c-1.637,1.637-3.785,2.459-5.934,2.459c-2.14,0-4.289-0.823-5.934-2.459c-3.273-3.282-3.273-8.595,0-11.868     l22.15-22.15c-4.18-1.972-8.251-4.071-12.246-6.253c-0.21,0.26-0.302,0.579-0.546,0.823l-27.22,27.203     c-1.637,1.645-3.785,2.459-5.934,2.459c-2.14,0-4.289-0.814-5.934-2.459c-3.273-3.273-3.273-8.595,0-11.868l24.979-24.97     c-6.102-4.096-11.877-8.528-17.232-13.354c-0.302-0.277-0.63-0.546-0.974-0.781c-0.269-0.185-26.951-18.843-29.637-54.28     c-0.63-8.1-7.109-14.202-15.075-14.202h-85.873v33.574c0,27.774-22.587,50.361-50.361,50.361h-0.462     c41.808,27.396,98.883,39.155,146.054,48.841c17.249,3.542,33.523,6.883,47.515,10.668c22.285,6.018,39.6,23.057,46.668,45.14     c-5.875-0.126-11.893-0.277-18.113-0.478c-6.27-13.916-18.13-24.458-32.927-28.462c-13.497-3.643-29.537-6.933-46.516-10.416     c-55.657-11.432-124.626-25.676-170.437-65.293H15.686c-2.157,8.905-4.675,17.836-7.646,26.767     c-0.772,2.317-1.393,4.549-2.056,6.807h9.804c32.029,2.619,55.405,27.363,58.41,59.988c-6.035-0.193-11.701-0.344-17.055-0.47     c-2.921-23.661-19.305-40.876-42.043-42.756L1.82,264.377c-3.231,16.795-3.122,31.761,0.034,44.913     C0.142,310.826-1,312.983-1,315.451v41.052c0,4.566,3.651,8.293,8.217,8.393c2.023,0.042,203.91,4.482,333.505,8.393     c4.893,0.151,9.661,0.218,14.277,0.218c71.932,0,111.549-17.249,132.381-32.248c14.143-10.173,15.226-20.883,15.226-34.9     C502.607,306.226,502.556,306.092,502.548,305.958z M477.577,327.638c-20.077,14.445-60.097,31.156-136.343,28.873     c-114.764-3.466-286.158-7.344-325.447-8.217v-24.828c30.065-0.185,83.162,0.89,171.797,6.555     c0.579,0.034,1.116,0.067,1.687,0.109c6.161,0.395,12.498,0.814,19.003,1.251c6.983,0.478,13.748,0.89,20.413,1.284     c1.486,0.084,2.954,0.168,4.423,0.252c6.169,0.353,12.221,0.672,18.113,0.948c0.302,0.017,0.621,0.034,0.923,0.05     c27.682,1.309,52.383,1.872,74.416,1.888c0.218,0,0.453,0.008,0.663,0.008c0.319,0,0.621-0.008,0.94-0.008     c3.769,0,7.462-0.017,11.071-0.05c0.285-0.008,0.571-0.008,0.848-0.008c83.59-0.856,125.499-10.03,144.51-16.342     C483.503,322.476,481.447,324.851,477.577,327.638z"/>        <path d="M57.757,197.248c18.516,0,33.574-15.058,33.574-33.574v-33.574H39.317c-8.343,0-15.133,6.79-15.133,15.133     c0,12.38-0.89,24.92-2.594,37.552l14.462,14.462H57.757z"/>    </g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
			</div>
		</div>
        <h3>PROMJENITE KAMERU</h3>
        <div class="itemi">
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera1">
                <svg xmlns="http://www.w3.org/2000/svg" width="1024px" height="1024px" viewBox="0 0 1024 1024" class="icon"><path  d="M628.736 528.896A416 416 0 01928 928H96a415.872 415.872 0 01299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 11-416 0 208 208 0 01416 0z"/></svg>
            </div>
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera3">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.2" baseProfile="tiny" id="Layer_1" x="0px" y="0px" viewBox="0 0 256 256" xml:space="preserve"><g id="XMLID_1_"><path id="XMLID_4_" d="M232.4,227c-0.1,0-0.2,0.4-0.3,0.4c-32.4-2.3-31.3-63.7-33-80.4h-21.9c3.4-32.8,5.4-74.8,5.4-120.5   c0-9-0.1-17.8-0.2-26.5h-47.9c-0.2,8.7-0.2,17.5-0.2,26.5c0,45.7,2,87.7,5.4,120.5H134v104h28v-23.3l25.7,23.3h68.6   C256.3,238,245.6,227,232.4,227z"/><path id="XMLID_7_" d="M120.7,26.5c0-9-0.1-17.8-0.2-26.5H72.6c-0.2,8.7-0.2,17.5-0.2,26.5c0,45.7,2,87.7,5.4,120.5H57.2   c-1.7,16.6-0.6,78.1-33,80.4c-0.1,0-0.2-0.4-0.3-0.4c-13.2,0-24,10.8-24,24h68.6L94,227.7V251h28V147h-6.8   C118.6,114.2,120.7,72.2,120.7,26.5z"/></g></svg>
            </div>
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera2">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M256,128c35.375,0,64-28.625,64-64S291.375,0,256,0s-64,28.625-64,64S220.625,128,256,128z"/><path d="M256,160c-71.781,0-128,42.156-128,96v64c0,17.688,14.313,32,32,32h32v128c0,17.688,14.313,32,32,32h64   c17.688,0,32-14.313,32-32V352h32c17.688,0,32-14.313,32-32v-64C384,202.156,327.781,160,256,160z"/></g></svg>
            </div>
        </div>
	</section>

    <section class="menu">`+itemi+`</section>
`
    div.innerHTML = content
}


function ubaci_lice(){
    div = document.getElementsByClassName("sadrzaj")[0]
    itemi = ""
    baza = config.LICE
    for (let i = 0; i < baza.length; i++) {
        if (window.localStorage.getItem(baza[i].ID) == null){
            window.localStorage.setItem(baza[i].ID,0)
        }
        Max = 255 
        Min = -1
        if (baza[i].Max != null){
            Max = baza[i].Max
        }
        if (baza[i].Min != null){
            Min = baza[i].Min
        }
        if (baza[i].Type == "broj"){
            itemi += `
            <div class="item">
			    <p>`+baza[i].Naziv+`</p>
			    <i class="fa fa-angle-left left" onclick="promjeni_broj(false,'`+baza[i].ID+`')"></i>
			    <i class="fa fa-angle-right right" onclick="promjeni_broj(true,'`+baza[i].ID+`')"></i>
			    <input  onclick="promjeni_kameru(this)" type="number" min="`+Min+`" max = "`+Max+`" value="`+window.localStorage.getItem(baza[i].ID)+`" onmouseover="setup(this)" oninput="promjeni_broj(null,'`+baza[i].ID+`')" id="`+baza[i].ID+`">
		    </div>
        `
        }
        else if (baza[i].Type == "boja"){
            itemi += `
            <div class="item">
			    <p>`+baza[i].Naziv+`</p>
			    <i class="fa fa-angle-left left" onclick="promjeni_broj(false,'`+baza[i].ID+`')"></i>
			    <i class="fa fa-angle-right right" onclick="promjeni_broj(true,'`+baza[i].ID+`')"></i>
			    <input  onclick="promjeni_kameru(this)" type="number" min="`+Min+`" max = "`+Max+`" value="`+window.localStorage.getItem(baza[i].ID)+`" onmouseover="setup(this)" oninput="promjeni_broj(null,'`+baza[i].ID+`')" id="`+baza[i].ID+`">
		    </div>
        `
        }
        else{itemi += `
        <div class="item">
			<p>`+baza[i].Naziv+`</p>
            <input  onclick="promjeni_kameru(this)" type="range" value="`+window.localStorage.getItem(baza[i].ID)+`" min="`+Min+`" max="`+Max+`" onmouseover="setup(this)" id="`+baza[i].ID+`">
		</div>`}
    }
    content = `
    <section class="skidanje">
		<h3>SKINITE ODJECU</h3>
		<div class="itemi">
			<div class="item" onclick="skini_odjecu(this)" id="skinuto1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M341.52 285.56c33.65 0 82.34-6.94 82.34-47 .22-6.74.86-1.82-20.88-96.24-4.62-19.15-8.68-27.84-42.31-44.65-26.09-13.34-82.92-35.37-99.73-35.37-15.66 0-20.2 20.17-38.87 20.17-18 0-31.31-15.06-48.12-15.06-16.14 0-26.66 11-34.78 33.62-27.5 77.55-26.28 74.27-26.12 78.27 0 24.8 97.64 106.11 228.47 106.11M429 254.84c4.65 22 4.65 24.35 4.65 27.25 0 37.66-42.33 58.56-98 58.56-125.74.08-235.91-73.65-235.91-122.33a49.55 49.55 0 0 1 4.06-19.72C58.56 200.86 0 208.93 0 260.63c0 84.67 200.63 189 359.49 189 121.79 0 152.51-55.08 152.51-98.58 0-34.21-29.59-73.05-82.93-96.24"/></svg>
			</div>
            <div class="item" onclick="skini_odjecu(this)" id="skinuto2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M574.1 280.37L528.75 98.66c-5.91-23.7-21.59-44.05-43-55.81-21.44-11.73-46.97-14.11-70.19-6.33l-15.25 5.08c-8.39 2.79-12.92 11.86-10.12 20.24l5.06 15.18c2.79 8.38 11.85 12.91 20.23 10.12l13.18-4.39c10.87-3.62 23-3.57 33.16 1.73 10.29 5.37 17.57 14.56 20.37 25.82l38.46 153.82c-22.19-6.81-49.79-12.46-81.2-12.46-34.77 0-73.98 7.02-114.85 26.74h-73.18c-40.87-19.74-80.08-26.75-114.86-26.75-31.42 0-59.02 5.65-81.21 12.46l38.46-153.83c2.79-11.25 10.09-20.45 20.38-25.81 10.16-5.3 22.28-5.35 33.15-1.73l13.17 4.39c8.38 2.79 17.44-1.74 20.23-10.12l5.06-15.18c2.8-8.38-1.73-17.45-10.12-20.24l-15.25-5.08c-23.22-7.78-48.75-5.41-70.19 6.33-21.41 11.77-37.09 32.11-43 55.8L1.9 280.37A64.218 64.218 0 0 0 0 295.86v70.25C0 429.01 51.58 480 115.2 480h37.12c60.28 0 110.37-45.94 114.88-105.37l2.93-38.63h35.75l2.93 38.63C313.31 434.06 363.4 480 423.68 480h37.12c63.62 0 115.2-50.99 115.2-113.88v-70.25c0-5.23-.64-10.43-1.9-15.5zm-370.72 89.42c-1.97 25.91-24.4 46.21-51.06 46.21H115.2C86.97 416 64 393.62 64 366.11v-37.54c18.12-6.49 43.42-12.92 72.58-12.92 23.86 0 47.26 4.33 69.93 12.92l-3.13 41.22zM512 366.12c0 27.51-22.97 49.88-51.2 49.88h-37.12c-26.67 0-49.1-20.3-51.06-46.21l-3.13-41.22c22.67-8.59 46.08-12.92 69.95-12.92 29.12 0 54.43 6.44 72.55 12.93v37.54z"/></svg>
			</div>
		</div>
        <h3>PROMJENITE KAMERU</h3>
        <div class="itemi">
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera1">
                <svg xmlns="http://www.w3.org/2000/svg" width="1024px" height="1024px" viewBox="0 0 1024 1024" class="icon"><path  d="M628.736 528.896A416 416 0 01928 928H96a415.872 415.872 0 01299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 11-416 0 208 208 0 01416 0z"/></svg>
            </div>
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera3">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.2" baseProfile="tiny" id="Layer_1" x="0px" y="0px" viewBox="0 0 256 256" xml:space="preserve"><g id="XMLID_1_"><path id="XMLID_4_" d="M232.4,227c-0.1,0-0.2,0.4-0.3,0.4c-32.4-2.3-31.3-63.7-33-80.4h-21.9c3.4-32.8,5.4-74.8,5.4-120.5   c0-9-0.1-17.8-0.2-26.5h-47.9c-0.2,8.7-0.2,17.5-0.2,26.5c0,45.7,2,87.7,5.4,120.5H134v104h28v-23.3l25.7,23.3h68.6   C256.3,238,245.6,227,232.4,227z"/><path id="XMLID_7_" d="M120.7,26.5c0-9-0.1-17.8-0.2-26.5H72.6c-0.2,8.7-0.2,17.5-0.2,26.5c0,45.7,2,87.7,5.4,120.5H57.2   c-1.7,16.6-0.6,78.1-33,80.4c-0.1,0-0.2-0.4-0.3-0.4c-13.2,0-24,10.8-24,24h68.6L94,227.7V251h28V147h-6.8   C118.6,114.2,120.7,72.2,120.7,26.5z"/></g></svg>
            </div>
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera2">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M256,128c35.375,0,64-28.625,64-64S291.375,0,256,0s-64,28.625-64,64S220.625,128,256,128z"/><path d="M256,160c-71.781,0-128,42.156-128,96v64c0,17.688,14.313,32,32,32h32v128c0,17.688,14.313,32,32,32h64   c17.688,0,32-14.313,32-32V352h32c17.688,0,32-14.313,32-32v-64C384,202.156,327.781,160,256,160z"/></g></svg>
            </div>
        </div>
	</section>

    <section class="menu">`+itemi+`</section>
`
    div.innerHTML = content
}

function ubaci_nakit(){
    div = document.getElementsByClassName("sadrzaj")[0]
    itemi = ""
    baza = config.NAKIT
    for (let i = 0; i < baza.length; i++) {
        if (window.localStorage.getItem(baza[i].ID) == null){
            window.localStorage.setItem(baza[i].ID,0)
        }
        Max = 255 
        Min = -1
        if (baza[i].Max != null){
            Max = baza[i].Max
        }
        if (baza[i].Min != null){
            Min = baza[i].Min
        }
        if (baza[i].Type == "broj"){
            itemi += `
            <div class="item">
			    <p>`+baza[i].Naziv+`</p>
			    <i class="fa fa-angle-left left" onclick="promjeni_broj(false,'`+baza[i].ID+`')"></i>
			    <i class="fa fa-angle-right right" onclick="promjeni_broj(true,'`+baza[i].ID+`')"></i>
			    <input  onclick="promjeni_kameru(this)" type="number" min="`+Min+`" max = "`+Max+`" value="`+window.localStorage.getItem(baza[i].ID)+`" onmouseover="setup(this)" oninput="promjeni_broj(null,'`+baza[i].ID+`')"  id="`+baza[i].ID+`">
		    </div>
        `
        }
        else if (baza[i].Type == "boja"){
            itemi += `
            <div class="item">
			    <p>`+baza[i].Naziv+`</p>
                <i class="fa fa-angle-left left" onclick="promjeni_broj(false,'`+baza[i].ID+`')"></i>
			    <i class="fa fa-angle-right right" onclick="promjeni_broj(true,'`+baza[i].ID+`')"></i>
			    <input  onclick="promjeni_kameru(this)" type="number" oninput="promjeni_boju(this)" value="`+window.localStorage.getItem(baza[i].ID)+`" min="`+Min+`" max="`+Max+`" onmouseover="setup(this)" id="`+baza[i].ID+`">
		    </div>
        `
        }
        else{itemi += `
        <div class="item">
			<p>`+baza[i].Naziv+`</p>
            <input  onclick="promjeni_kameru(this)" type="range" value="`+window.localStorage.getItem(baza[i].ID)+`" min="`+Min+`" max="`+Max+`" onmouseover="setup(this)" id="`+baza[i].ID+`">
		</div>`}
    }
    content = `
    <section class="skidanje">
		<h3>SKINITE ODJECU</h3>
		<div class="itemi">
            <div class="item" onclick="skini_odjecu(this)" id="skinuto1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M341.52 285.56c33.65 0 82.34-6.94 82.34-47 .22-6.74.86-1.82-20.88-96.24-4.62-19.15-8.68-27.84-42.31-44.65-26.09-13.34-82.92-35.37-99.73-35.37-15.66 0-20.2 20.17-38.87 20.17-18 0-31.31-15.06-48.12-15.06-16.14 0-26.66 11-34.78 33.62-27.5 77.55-26.28 74.27-26.12 78.27 0 24.8 97.64 106.11 228.47 106.11M429 254.84c4.65 22 4.65 24.35 4.65 27.25 0 37.66-42.33 58.56-98 58.56-125.74.08-235.91-73.65-235.91-122.33a49.55 49.55 0 0 1 4.06-19.72C58.56 200.86 0 208.93 0 260.63c0 84.67 200.63 189 359.49 189 121.79 0 152.51-55.08 152.51-98.58 0-34.21-29.59-73.05-82.93-96.24"/></svg>
            </div>
            <div class="item" onclick="skini_odjecu(this)" id="skinuto2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M574.1 280.37L528.75 98.66c-5.91-23.7-21.59-44.05-43-55.81-21.44-11.73-46.97-14.11-70.19-6.33l-15.25 5.08c-8.39 2.79-12.92 11.86-10.12 20.24l5.06 15.18c2.79 8.38 11.85 12.91 20.23 10.12l13.18-4.39c10.87-3.62 23-3.57 33.16 1.73 10.29 5.37 17.57 14.56 20.37 25.82l38.46 153.82c-22.19-6.81-49.79-12.46-81.2-12.46-34.77 0-73.98 7.02-114.85 26.74h-73.18c-40.87-19.74-80.08-26.75-114.86-26.75-31.42 0-59.02 5.65-81.21 12.46l38.46-153.83c2.79-11.25 10.09-20.45 20.38-25.81 10.16-5.3 22.28-5.35 33.15-1.73l13.17 4.39c8.38 2.79 17.44-1.74 20.23-10.12l5.06-15.18c2.8-8.38-1.73-17.45-10.12-20.24l-15.25-5.08c-23.22-7.78-48.75-5.41-70.19 6.33-21.41 11.77-37.09 32.11-43 55.8L1.9 280.37A64.218 64.218 0 0 0 0 295.86v70.25C0 429.01 51.58 480 115.2 480h37.12c60.28 0 110.37-45.94 114.88-105.37l2.93-38.63h35.75l2.93 38.63C313.31 434.06 363.4 480 423.68 480h37.12c63.62 0 115.2-50.99 115.2-113.88v-70.25c0-5.23-.64-10.43-1.9-15.5zm-370.72 89.42c-1.97 25.91-24.4 46.21-51.06 46.21H115.2C86.97 416 64 393.62 64 366.11v-37.54c18.12-6.49 43.42-12.92 72.58-12.92 23.86 0 47.26 4.33 69.93 12.92l-3.13 41.22zM512 366.12c0 27.51-22.97 49.88-51.2 49.88h-37.12c-26.67 0-49.1-20.3-51.06-46.21l-3.13-41.22c22.67-8.59 46.08-12.92 69.95-12.92 29.12 0 54.43 6.44 72.55 12.93v37.54z"/></svg>
            </div>
            <div class="item" onclick="skini_odjecu(this)" id="skinuto3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z"/></svg>
            </div>
            <div class="item" onclick="skini_odjecu(this)" id="skinuto4">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 430.891 430.891" style="enable-background:new 0 0 430.891 430.891;" xml:space="preserve"><g>    <path d="M196.005,374.908H11.224c-4.553,0-8.637,3.684-9.104,8.211l-2.074,20.075c-0.238,2.301,0.456,4.483,1.956,6.146   s3.6,2.579,5.913,2.579h186.576c4.623,0,8.562-3.757,8.78-8.375l0.946-20.025c0.108-2.283-0.69-4.441-2.25-6.076   C200.409,375.809,198.291,374.908,196.005,374.908z"/>    <path d="M430.845,403.195l-2.074-20.076c-0.467-4.527-4.551-8.211-9.104-8.211H234.728c-2.288,0-4.405,0.901-5.959,2.539   s-2.345,3.797-2.226,6.083l1.047,20.028c0.241,4.61,4.192,8.361,8.81,8.361h186.576c2.313,0,4.413-0.916,5.913-2.579   S431.083,405.495,430.845,403.195z"/>    <path d="M240.999,60.328V45.273c0-0.813-0.687-1.5-1.5-1.5h-48.107c-0.813,0-1.5,0.687-1.5,1.5v15.055c0,0.813,0.687,1.5,1.5,1.5   h48.107C240.313,61.828,240.999,61.142,240.999,60.328z"/>    <path d="M233.604,358.392h183.841c2.313,0,4.412-0.916,5.912-2.578c1.5-1.663,2.195-3.846,1.957-6.147L402.709,130.93   c-0.367-3.565-1.79-8.928-3.238-12.21L383.766,83.14c3.223-2.04,5.375-5.627,5.375-9.716V30.471c0-6.341-5.159-11.5-11.5-11.5   H53.25c-6.341,0-11.5,5.159-11.5,11.5v42.954c0,4.193,2.263,7.858,5.625,9.868l-15.912,35.428   c-1.472,3.273-2.913,8.637-3.281,12.209L5.577,349.666c-0.238,2.302,0.457,4.484,1.957,6.147c1.5,1.662,3.6,2.578,5.912,2.578   h183.575c4.623,0,8.563-3.757,8.781-8.375l5.058-106.983c0.093-1.972,1.841-3.657,3.816-3.681l0.775-0.009   c1.93,0,3.646,1.626,3.745,3.553l5.597,107.133C225.035,354.641,228.986,358.392,233.604,358.392z M191.392,76.828   c-9.098,0-16.5-7.402-16.5-16.5V45.273c0-9.098,7.402-16.5,16.5-16.5h48.107c9.098,0,16.5,7.402,16.5,16.5v15.055   c0,9.098-7.402,16.5-16.5,16.5H191.392z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            </div>
            <div class="item" onclick="skini_odjecu(this)" id="skinuto5">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 503.607 503.607" style="enable-background:new 0 0 503.607 503.607;" xml:space="preserve"><g transform="translate(1)"><g>    <g>        <path d="M502.548,305.958c-0.017-0.436-0.117-0.856-0.201-1.293c-0.092-0.428-0.176-0.848-0.327-1.251     c-0.092-0.243-0.084-0.495-0.193-0.73c-10.248-22.016-48.564-29.906-97.087-39.894c-23.225-4.784-48.858-10.089-73.921-17.5     c-0.403,1.116-1.007,2.182-1.905,3.089l-26.708,26.708c-1.637,1.645-3.785,2.459-5.934,2.459c-2.14,0-4.289-0.814-5.934-2.459     c-3.273-3.273-3.273-8.586,0-11.868l23.401-23.401c-4.658-1.603-9.275-3.307-13.824-5.103c-0.378,0.73-0.755,1.46-1.368,2.065     L273.524,261.8c-1.637,1.637-3.785,2.459-5.934,2.459c-2.14,0-4.289-0.823-5.934-2.459c-3.273-3.282-3.273-8.595,0-11.868     l22.15-22.15c-4.18-1.972-8.251-4.071-12.246-6.253c-0.21,0.26-0.302,0.579-0.546,0.823l-27.22,27.203     c-1.637,1.645-3.785,2.459-5.934,2.459c-2.14,0-4.289-0.814-5.934-2.459c-3.273-3.273-3.273-8.595,0-11.868l24.979-24.97     c-6.102-4.096-11.877-8.528-17.232-13.354c-0.302-0.277-0.63-0.546-0.974-0.781c-0.269-0.185-26.951-18.843-29.637-54.28     c-0.63-8.1-7.109-14.202-15.075-14.202h-85.873v33.574c0,27.774-22.587,50.361-50.361,50.361h-0.462     c41.808,27.396,98.883,39.155,146.054,48.841c17.249,3.542,33.523,6.883,47.515,10.668c22.285,6.018,39.6,23.057,46.668,45.14     c-5.875-0.126-11.893-0.277-18.113-0.478c-6.27-13.916-18.13-24.458-32.927-28.462c-13.497-3.643-29.537-6.933-46.516-10.416     c-55.657-11.432-124.626-25.676-170.437-65.293H15.686c-2.157,8.905-4.675,17.836-7.646,26.767     c-0.772,2.317-1.393,4.549-2.056,6.807h9.804c32.029,2.619,55.405,27.363,58.41,59.988c-6.035-0.193-11.701-0.344-17.055-0.47     c-2.921-23.661-19.305-40.876-42.043-42.756L1.82,264.377c-3.231,16.795-3.122,31.761,0.034,44.913     C0.142,310.826-1,312.983-1,315.451v41.052c0,4.566,3.651,8.293,8.217,8.393c2.023,0.042,203.91,4.482,333.505,8.393     c4.893,0.151,9.661,0.218,14.277,0.218c71.932,0,111.549-17.249,132.381-32.248c14.143-10.173,15.226-20.883,15.226-34.9     C502.607,306.226,502.556,306.092,502.548,305.958z M477.577,327.638c-20.077,14.445-60.097,31.156-136.343,28.873     c-114.764-3.466-286.158-7.344-325.447-8.217v-24.828c30.065-0.185,83.162,0.89,171.797,6.555     c0.579,0.034,1.116,0.067,1.687,0.109c6.161,0.395,12.498,0.814,19.003,1.251c6.983,0.478,13.748,0.89,20.413,1.284     c1.486,0.084,2.954,0.168,4.423,0.252c6.169,0.353,12.221,0.672,18.113,0.948c0.302,0.017,0.621,0.034,0.923,0.05     c27.682,1.309,52.383,1.872,74.416,1.888c0.218,0,0.453,0.008,0.663,0.008c0.319,0,0.621-0.008,0.94-0.008     c3.769,0,7.462-0.017,11.071-0.05c0.285-0.008,0.571-0.008,0.848-0.008c83.59-0.856,125.499-10.03,144.51-16.342     C483.503,322.476,481.447,324.851,477.577,327.638z"/>        <path d="M57.757,197.248c18.516,0,33.574-15.058,33.574-33.574v-33.574H39.317c-8.343,0-15.133,6.79-15.133,15.133     c0,12.38-0.89,24.92-2.594,37.552l14.462,14.462H57.757z"/>    </g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            </div>
	    </div>
        <h3>PROMJENITE KAMERU</h3>
        <div class="itemi">
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera1">
                <svg xmlns="http://www.w3.org/2000/svg" width="1024px" height="1024px" viewBox="0 0 1024 1024" class="icon"><path  d="M628.736 528.896A416 416 0 01928 928H96a415.872 415.872 0 01299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 11-416 0 208 208 0 01416 0z"/></svg>
            </div>
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera3">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.2" baseProfile="tiny" id="Layer_1" x="0px" y="0px" viewBox="0 0 256 256" xml:space="preserve"><g id="XMLID_1_"><path id="XMLID_4_" d="M232.4,227c-0.1,0-0.2,0.4-0.3,0.4c-32.4-2.3-31.3-63.7-33-80.4h-21.9c3.4-32.8,5.4-74.8,5.4-120.5   c0-9-0.1-17.8-0.2-26.5h-47.9c-0.2,8.7-0.2,17.5-0.2,26.5c0,45.7,2,87.7,5.4,120.5H134v104h28v-23.3l25.7,23.3h68.6   C256.3,238,245.6,227,232.4,227z"/><path id="XMLID_7_" d="M120.7,26.5c0-9-0.1-17.8-0.2-26.5H72.6c-0.2,8.7-0.2,17.5-0.2,26.5c0,45.7,2,87.7,5.4,120.5H57.2   c-1.7,16.6-0.6,78.1-33,80.4c-0.1,0-0.2-0.4-0.3-0.4c-13.2,0-24,10.8-24,24h68.6L94,227.7V251h28V147h-6.8   C118.6,114.2,120.7,72.2,120.7,26.5z"/></g></svg>
            </div>
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera2">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M256,128c35.375,0,64-28.625,64-64S291.375,0,256,0s-64,28.625-64,64S220.625,128,256,128z"/><path d="M256,160c-71.781,0-128,42.156-128,96v64c0,17.688,14.313,32,32,32h32v128c0,17.688,14.313,32,32,32h64   c17.688,0,32-14.313,32-32V352h32c17.688,0,32-14.313,32-32v-64C384,202.156,327.781,160,256,160z"/></g></svg>
            </div>
        </div>
	</section>

    <section class="menu">`+itemi+`</section>
`
    div.innerHTML = content
}


function ubaci_sminku(){
    div = document.getElementsByClassName("sadrzaj")[0]
    itemi = ""
    baza = config.SMINKA
    for (let i = 0; i < baza.length; i++) {
        if (window.localStorage.getItem(baza[i].ID) == null || window.localStorage.getItem(baza[i].ID) == "null"){
            window.localStorage.setItem(baza[i].ID,0)
        }
        Max = 255 
        Min = -1
        if (baza[i].Max != null){
            Max = baza[i].Max
        }
        if (baza[i].Min != null){
            Min = baza[i].Min
        }
        if (baza[i].Type == "broj"){
            itemi += `
            <div class="item">
                <p>`+baza[i].Naziv+`</p>
                <i class="fa fa-angle-left left" onclick="promjeni_broj(false,'`+baza[i].ID+`')"></i>
                <i class="fa fa-angle-right right" onclick="promjeni_broj(true,'`+baza[i].ID+`')"></i>
                <input  onclick="promjeni_kameru(this)" type="number" min="`+Min+`" max = "`+Max+`" value="`+window.localStorage.getItem(baza[i].ID)+`" onmouseover="setup(this)" oninput="promjeni_broj(null,'`+baza[i].ID+`')"  id="`+baza[i].ID+`">
            </div>
        `
        }
        else if (baza[i].Type == "boja"){
            itemi += `
            <div class="item">
                <p>`+baza[i].Naziv+`</p>
                <i class="fa fa-angle-left left" onclick="promjeni_broj(false,'`+baza[i].ID+`')"></i>
                <i class="fa fa-angle-right right" onclick="promjeni_broj(true,'`+baza[i].ID+`')"></i>
                <input  onclick="promjeni_kameru(this)" type="number" oninput="promjeni_boju(this)" value="`+window.localStorage.getItem(baza[i].ID)+`" min="`+Min+`" max="`+Max+`" onmouseover="setup(this)" id="`+baza[i].ID+`">
            </div>
        `
        }
        else{itemi += `
        <div class="item">
            <p>`+baza[i].Naziv+`</p>
            <input  onclick="promjeni_kameru(this)" type="range" value="`+window.localStorage.getItem(baza[i].ID)+`" min="`+Min+`" max="`+Max+`" onmouseover="setup(this)" id="`+baza[i].ID+`">
        </div>`}
    }
    content = `
    <section class="skidanje">
        <h3>SKINITE ODJECU</h3>
        <div class="itemi">
            <div class="item" onclick="skini_odjecu(this)" id="skinuto1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M341.52 285.56c33.65 0 82.34-6.94 82.34-47 .22-6.74.86-1.82-20.88-96.24-4.62-19.15-8.68-27.84-42.31-44.65-26.09-13.34-82.92-35.37-99.73-35.37-15.66 0-20.2 20.17-38.87 20.17-18 0-31.31-15.06-48.12-15.06-16.14 0-26.66 11-34.78 33.62-27.5 77.55-26.28 74.27-26.12 78.27 0 24.8 97.64 106.11 228.47 106.11M429 254.84c4.65 22 4.65 24.35 4.65 27.25 0 37.66-42.33 58.56-98 58.56-125.74.08-235.91-73.65-235.91-122.33a49.55 49.55 0 0 1 4.06-19.72C58.56 200.86 0 208.93 0 260.63c0 84.67 200.63 189 359.49 189 121.79 0 152.51-55.08 152.51-98.58 0-34.21-29.59-73.05-82.93-96.24"/></svg>
            </div>
            <div class="item" onclick="skini_odjecu(this)" id="skinuto2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M574.1 280.37L528.75 98.66c-5.91-23.7-21.59-44.05-43-55.81-21.44-11.73-46.97-14.11-70.19-6.33l-15.25 5.08c-8.39 2.79-12.92 11.86-10.12 20.24l5.06 15.18c2.79 8.38 11.85 12.91 20.23 10.12l13.18-4.39c10.87-3.62 23-3.57 33.16 1.73 10.29 5.37 17.57 14.56 20.37 25.82l38.46 153.82c-22.19-6.81-49.79-12.46-81.2-12.46-34.77 0-73.98 7.02-114.85 26.74h-73.18c-40.87-19.74-80.08-26.75-114.86-26.75-31.42 0-59.02 5.65-81.21 12.46l38.46-153.83c2.79-11.25 10.09-20.45 20.38-25.81 10.16-5.3 22.28-5.35 33.15-1.73l13.17 4.39c8.38 2.79 17.44-1.74 20.23-10.12l5.06-15.18c2.8-8.38-1.73-17.45-10.12-20.24l-15.25-5.08c-23.22-7.78-48.75-5.41-70.19 6.33-21.41 11.77-37.09 32.11-43 55.8L1.9 280.37A64.218 64.218 0 0 0 0 295.86v70.25C0 429.01 51.58 480 115.2 480h37.12c60.28 0 110.37-45.94 114.88-105.37l2.93-38.63h35.75l2.93 38.63C313.31 434.06 363.4 480 423.68 480h37.12c63.62 0 115.2-50.99 115.2-113.88v-70.25c0-5.23-.64-10.43-1.9-15.5zm-370.72 89.42c-1.97 25.91-24.4 46.21-51.06 46.21H115.2C86.97 416 64 393.62 64 366.11v-37.54c18.12-6.49 43.42-12.92 72.58-12.92 23.86 0 47.26 4.33 69.93 12.92l-3.13 41.22zM512 366.12c0 27.51-22.97 49.88-51.2 49.88h-37.12c-26.67 0-49.1-20.3-51.06-46.21l-3.13-41.22c22.67-8.59 46.08-12.92 69.95-12.92 29.12 0 54.43 6.44 72.55 12.93v37.54z"/></svg>
            </div>
        </div>
        <h3>PROMJENITE KAMERU</h3>
        <div class="itemi">
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera1">
                <svg xmlns="http://www.w3.org/2000/svg" width="1024px" height="1024px" viewBox="0 0 1024 1024" class="icon"><path  d="M628.736 528.896A416 416 0 01928 928H96a415.872 415.872 0 01299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 11-416 0 208 208 0 01416 0z"/></svg>
            </div>
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera3">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.2" baseProfile="tiny" id="Layer_1" x="0px" y="0px" viewBox="0 0 256 256" xml:space="preserve"><g id="XMLID_1_"><path id="XMLID_4_" d="M232.4,227c-0.1,0-0.2,0.4-0.3,0.4c-32.4-2.3-31.3-63.7-33-80.4h-21.9c3.4-32.8,5.4-74.8,5.4-120.5   c0-9-0.1-17.8-0.2-26.5h-47.9c-0.2,8.7-0.2,17.5-0.2,26.5c0,45.7,2,87.7,5.4,120.5H134v104h28v-23.3l25.7,23.3h68.6   C256.3,238,245.6,227,232.4,227z"/><path id="XMLID_7_" d="M120.7,26.5c0-9-0.1-17.8-0.2-26.5H72.6c-0.2,8.7-0.2,17.5-0.2,26.5c0,45.7,2,87.7,5.4,120.5H57.2   c-1.7,16.6-0.6,78.1-33,80.4c-0.1,0-0.2-0.4-0.3-0.4c-13.2,0-24,10.8-24,24h68.6L94,227.7V251h28V147h-6.8   C118.6,114.2,120.7,72.2,120.7,26.5z"/></g></svg>
            </div>
            <div class="item" onclick="promjeni_kameru_v2(this)" id="kamera2">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M256,128c35.375,0,64-28.625,64-64S291.375,0,256,0s-64,28.625-64,64S220.625,128,256,128z"/><path d="M256,160c-71.781,0-128,42.156-128,96v64c0,17.688,14.313,32,32,32h32v128c0,17.688,14.313,32,32,32h64   c17.688,0,32-14.313,32-32V352h32c17.688,0,32-14.313,32-32v-64C384,202.156,327.781,160,256,160z"/></g></svg>
            </div>
        </div>
    </section>

    <section class="menu">`+itemi+`</section>
`
    div.innerHTML = content
}


pol = null
function promjeni_pol(self){
    if (pol == null){
        pol = self
    }
    else{
        pol.className = "item"
        pol = self
    }
    self.className = "item aktivan"
    request("pol",self.id)
}

function skini_odjecu(self){
    if (self.className == "item aktivan"){
        self.className = "item"
        request(self.id,false)
    }
    else{
        self.className = "item aktivan"
        request(self.id,true)
    }
}


document.getElementById("start").click()



function spremi(){
    request("spremljeno",true)
    window.localStorage.setItem("setan_pol",true)
}
function odbaci(){
    request("spremljeno",false)
}

document.oninput = function(event) {
    if (event.target.type == "range"){
        item = event.target
        request(item.id,item.value)
    }
};


//--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!--\\
function request(item,broj){
    window.localStorage.setItem(item,broj)

    $.post('https://' + resourceName + '/postRequest', JSON.stringify({
        item : item, broj : broj
    }))

    //item = ime itema | npr: kapa1, kosa1 i td
    //broj = broj koji je izabrat ili boja koja je izabrata

    // Ovdije stavis post request i podesis sebi kako ti odgovara
}
//--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!--\\

if (window.localStorage.getItem("ocisceno") == null){
    window.localStorage.clear()
    window.localStorage.setItem("ocisceno",true)
}