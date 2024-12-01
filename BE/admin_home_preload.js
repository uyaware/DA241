var num_of_printer = 0;

document.addEventListener('DOMContentLoaded', function() {
    // fetch from server to get printer information
    fetch('http://localhost:18000/admin_load_printer')
        .then(response => response.json())
        .then(data => {
            data.forEach(printer => {
                load_printer(printer.model, printer.id, printer.location, printer.weight, printer.status);
                num_of_printer++;
            });
            document.getElementById('num_printer').textContent = parseInt(num_of_printer);
        })
        .catch(error => console.error('Error fetching printer data:', error));        
    

    // fetch from server to get number of paper
    fetch('http://localhost:18000/num_of_paper')
        .then(response => response.json())
        .then(data => {
            document.getElementById('num_paper').textContent = parseInt(data.num_paper);
        })
        .catch(error => console.error('Error fetching paper data:', error));
});

var printer_id = '';

function load_printer(model,id,location,weight,status){
    var elements = document.querySelector('.printers-row');
    var cloneEle = elements.cloneNode(true);

    /*
            <div class="printer-model">CanonXPSS65215</div>
            <div class="printer-id">HX3291566</div>
            <div class="printer-location">H6-608</div>
            <div class="printer-weight">9.4 kg</div>
            <div class="printer-status">Hoạt động</div>
    */
    cloneEle.querySelector('.printer-model').textContent = model;
    cloneEle.querySelector('.printer-id').textContent = id;
    cloneEle.querySelector('.printer-location').textContent = location;
    cloneEle.querySelector('.printer-weight').textContent = weight;
    cloneEle.querySelector('.printer-status').textContent = status;

    cloneEle.querySelector('.printer-delete').addEventListener('click', Delete_Printer.bind(null, id));

    document.querySelector('.printers-display').appendChild(cloneEle);
}


function Delete_Printer(id) {

    fetch('http://localhost:18000/delete_printer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Đảm bảo server nhận định dạng JSON
        },
        body: JSON.stringify({ id: id })  // Truyền id trong body của POST request
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);  // In ra kết quả trả về từ server
    })
    .catch(error => console.error('Error deleting printer:', error));
}

function log(){
    console.log('log');
}

function add_new_printer(){
    var printer_id = document.getElementById('id').value;
    var printer_model = document.getElementById('model').value;
    var printer_location = document.getElementById('location').value;
    var printer_weight = document.getElementById('weight').value;
    var printer_status = document.getElementById('add-toggle-button');
    var number_of_paper = document.getElementById('paper').value;

    if (printer_status.checked == true){
        printer_status = "Không hoạt động";
    }else{
        printer_status = "Hoạt động";
    }

    if(number_of_paper == '' || number_of_paper < 0){
        number_of_paper = 0;
    }

    if(printer_id == '' || printer_model == '' || printer_location == '' || printer_weight == ''){
        alert('Vui lòng nhập đầy đủ thông tin');
    }

    var set_printer = {
        model: printer_model,
        id: printer_id,
        location: printer_location,
        weight: printer_weight,
        status: printer_status,
        num_paper : number_of_paper
    };

    fetch('http://localhost:18000/add_new_printer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Đảm bảo server nhận định dạng JSON
        },
        body: JSON.stringify(set_printer)  // Truyền id trong body của POST request
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);  // In ra kết quả trả về từ server
    })
    .catch(error => console.error('Error deleting printer:', error));
}