

function aleart(e) {
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
            document.verifyForm.action = "/usercheckAccountVerification?mail=" + document.getElementById("gmailId").textContent;
            document.verifyForm.submit();
        }
    })
}
