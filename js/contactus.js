
// $(function showhide() {
//     $("#Show").on('click',function () {
//         if ($(this).is(":checked")) {
//             $("#showorhidden").show();
//         } else {
//             $("#showorhidden").hide();
//         }
//     })
// })

function toggleCheckbox(element)
 {
   if(element.checked == true ){
        document.getElementById('showorhidden').style.display='flex';
   }else document.getElementById('showorhidden').style.display='none';
 }







//Send ajax request
function aleart(e) {
    e.returnValue = false;
    let timerInterval
    Swal.fire({
        title: 'Thank You',
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
        var hrefold = new URL(window.location.href);
        var un = hrefold.searchParams.get("username");
        var pw = hrefold.searchParams.get("Password");
        var href = new URL(window.location.origin+"/reportProbem?username=null&Password=null");
        href.searchParams.set('username', un);
        href.searchParams.set('Password', pw);

        if (result.dismiss === Swal.DismissReason.timer) {
            document.report.action = href;
            document.report.submit();
        }
    })
}