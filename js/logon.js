

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
                document.create_body.action = new URL(document.location.href)+"/request_to_create_account?mail="+document.getElementById("mail").value;
                document.create_body.submit();
            }
        })
    }
}




