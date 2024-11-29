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
            data.forEach(paper => {
                document.getElementById('num_paper').textContent = parseInt(paper.number_of_paper);
                //console.log('Number Of paper : ' + parseInt(paper.number_of_paper));
            });
        })
        .catch(error => console.error('Error fetching paper number:', error));
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
    console.log('Tới chơi : ' + id);
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