document.addEventListener('DOMContentLoaded', function() {
    //fetch data from server and create html element  

    fetch('http://localhost:18000/get_all_user_printing_log')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            
            if(user.role === 'student')            
            create_printing_log_with(user.Name, user.id, user.printing_log);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });

});

function create_printing_log_with(username, userid, printing_log){
    //crate html element and append to <div class="main"></div>
    /*
        Example:
        {
        "user_name": "user_1",
        "password": "1",
        "role": "student",
        "Name" : "Nguyễn Quang Niên",
        "id" : "2211040",
        "printing_log" : [
            {
                "time" : "2021-10-10 10:10:10",
                "printer_id" : "A_AX 3095",
                "file_name" : "file_1",
                "num_page" : "10"
            },
            {
                "time" : "2021-10-10 10:10:10",
                "printer_id" : "A_AX 3095",
                "file_name" : "file_99",
                "num_page" : "99"
            }
        ]
    }
    */

    let main = document.querySelector('.main');
    let user = document.createElement('div');
    user.classList.add('user');
    let user_name = document.createElement('h2');
    user_name.innerHTML = username + ' - ' + userid;
    user.appendChild(user_name);
    

    let printing_logs = document.createElement('div');
    printing_logs.classList.add('printing_logs');
    printing_log.forEach(log => {
        let log_div = document.createElement('div');
        log_div.classList.add('log');
        let time = document.createElement('p');
        time.innerHTML = 'Time : ' + log.time;
        log_div.appendChild(time);
        let printer_id = document.createElement('p');
        printer_id.innerHTML = 'Printer ID : ' + log.printer_id;
        log_div.appendChild(printer_id);
        let file_name = document.createElement('p');
        file_name.innerHTML = "File name : " + log.file_name;
        log_div.appendChild(file_name);
        let num_page = document.createElement('p');
        num_page.innerHTML = "Number of pages : " + log.num_page;
        log_div.appendChild(num_page);

        let spacing = document.createElement('br');
        log_div.appendChild(spacing);

        printing_logs.appendChild(log_div);
    });

    let user_spacing = document.createElement('br');
    printing_logs.appendChild(user_spacing);

    user.appendChild(printing_logs);
    main.appendChild(user);
}