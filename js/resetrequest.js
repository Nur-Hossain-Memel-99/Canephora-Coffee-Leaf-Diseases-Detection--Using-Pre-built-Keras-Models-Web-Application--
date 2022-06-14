


function submit_user_mail() {
    let wa = document.getElementById('wait')
    wa.innerHTML = 'Wait'
    wa.style.color = 'red'
    wa.style.marginLeft = '2vw'
    let usermail = document.getElementById('user_mail_id').value;
    const form = new FormData()
    form.append('usermail', usermail)
    let url = '/resetmail'

    if (usermail) {
        fetch(url, {
            method: 'post',
            body: form,
        }).then(response => {
            return response.json();
        }).then(res => {
            console.log(res.data)
            if (res.data == 'true') {
                document.getElementById('mialsection').style.display = 'none';
                document.getElementById('Confirmation').style.display = '';
            } else {
                alert("Account Not registered")
                wa.innerHTML = ''
            }
        })
    } else {
        alert("Please enter your Mail !!")
        wa.innerHTML = ''
    }
}

function submit_confi_code() {

    let code = document.getElementById('confirmation_input_id').value;

    const form = new FormData()
    form.append('code', code)
    let url = '/resetcodecheck?username=' + document.getElementById('user_mail_id').value;
    if (code) {
        fetch(url, {
            method: 'post',
            body: form,
        }).then(response => {
            return response.json();
        }).then(res => {
            console.log(res.data)
            if (res.data == 'true') {
                document.getElementById('Confirmation').style.display = 'none';
                document.getElementById('password').style.display = '';
            } else if (res.data = 'false') {
                document.getElementById('cnfmtion').innerHTML = 'Not match please re enterconfirmation code'
            } else alert('Someting error. Try again later')
        })
    } else alert("Empty field! Please enter your confirmation code.")

}



function submit_pass(e) {
    e.returnValue = false;
    href = '/newpass?username=' + document.getElementById('user_mail_id').value + '&Password=' + document.getElementById('newpassword').value + '&code=' + document.getElementById('confirmation_input_id').value;
    document.create_body.action = href;
    document.create_body.submit();
}
