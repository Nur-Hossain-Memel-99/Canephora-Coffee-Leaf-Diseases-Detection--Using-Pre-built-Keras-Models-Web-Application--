

function aleart(e) {
    if (document.getElementById("apass").value == document.getElementById("reinter_pass").value) {
        e.returnValue = false;
        let timerInterval
        Swal.fire({
            title: 'Creating',
            timer: 1300,
            timerProgressBar: true,
            className: "red-bg",
            didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                let username = document.getElementById('aname').value;
                let mail = document.getElementById("mail").value;
                let pass = document.getElementById('apass').value;
                document.create_body.action = new URL(document.location.href)+"/request_to_create_account?mail="+mail+"&pass="+pass+"&usernae="+username;
                document.create_body.submit();
            }
        })
    }
}