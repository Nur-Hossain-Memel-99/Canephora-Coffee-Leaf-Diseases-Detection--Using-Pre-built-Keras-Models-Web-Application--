

function aleart1(e) {
    e.returnValue = false;
    let timerInterval
    Swal.fire({
        title: 'Loging',
        timer: 1500,
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
        let un = document.getElementById('aname').value;
        let pw = document.getElementById('apass').value;
        if (un) {
            if (pw) {
                var href = new URL(new URL(document.location.origin)+"?username=null&Password=null");
                href.searchParams.set('username', un);
                href.searchParams.set('Password', pw);
            }
        }


        if (result.dismiss === Swal.DismissReason.timer) {
            document.loginf.action = href;
            document.loginf.submit();
        }
    })
}
