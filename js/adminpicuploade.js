




//Send ajax request
function aleartandsenddata(e) {
    e.returnValue = false;
    let timerInterval
    Swal.fire({
        title: 'Saving',
        timer: 1000,
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


        e.preventDefault();
        const xhr = new XMLHttpRequest();

        //get user pass from old url
        let oldUrl = (new URL(document.location)).searchParams
        let username = oldUrl.get('username')
        let password = oldUrl.get('Password')

        //set user and pass
        let url ="/updatepicture?username="+username+"&Password="+password
        xhr.open('post',url , true);

        

        xhr.responseType = 'json';
        xhr.onload = function () {
            alert("Pic uploade successfully \nPlease refresh this page")
        }


        // const form = document.querySelector('form');
        const files = document.querySelector('[name=myFile]').files;
        const formData = new FormData();
        formData.append('picture', files[0]);
        xhr.send(formData);
    })
}