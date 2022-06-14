



//Send ajax request
function aleart(e) {
    e.returnValue = false;
    let timerInterval
    Swal.fire({
        title: 'Operation Starting',
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
        xhr.open('post', "/picSendFromAjax", true);
        xhr.responseType = 'json';

        xhr.upload.onprogress = function () {
            const files = document.querySelector('[name=myFile]').files;
            let src = URL.createObjectURL(files[0])
            let preview = document.getElementById('pickk');
            let preview2 = document.getElementById('pickk2');
            let preview3 = document.getElementById('pickk3');
            //geting id div for show 
            let box1 = document.getElementById("your_image");
            let box2 = document.getElementById("your_modified_pic");
            let box3 = document.getElementById("your_modified_pic2");
            let box4 = document.getElementById("Check_Model");

            //set modified pic 
            setTimeout(function () {
                preview.src = src;
                box1.style.display = 'flex';
            }, 700);
            setTimeout(function () {
                preview2.src = src;
                box2.style.display = "flex";
                preview2.style.filter = "contrast(160%)";

            }, 1400)
            setTimeout(() => {
                preview3.src = src
                box3.style.display = 'flex';
                preview3.style.filter = "contrast(50%)";
                preview3.style.filter = "invert(100%)";
            }, 2100);

            //loading animation
            box4.style.display = 'flex';
            let percrntage = document.querySelector("#percentage_show")
            let processline = document.getElementById("processpercentage")
            let count1 = 24;
            let loading = setInterval(animation, 50);

            function animation() {
                if (count1 == 100) {
                    clearInterval(loading);
                    let waiting = document.getElementById("waiting_message_show_container")
                    waiting.innerHTML = "Waiting"
                    setInterval(function () {
                        waiting.style.opacity = (waiting.style.opacity == 0 ? 1 : 0);
                    }, 1000);
                    window.scrollBy(0, +35)
                } 
                else {
                    count1 = count1 + 1;
                    processline.style.width = count1 + "%";
                    processline.style.background = "#338157d1";
                    percrntage.innerHTML = count1 + "%";
                    window.scrollBy(0, +35)
                }
            }
        }


        xhr.onload = function () {
            document.getElementById("waiting_message_show_container").style.display = "none"

            let disresult = JSON.parse(JSON.stringify(xhr.response))
            let processpercentage2 = document.getElementById("processpercentage2")
            let percentage_show2 = document.getElementById("percentage_show2")
            let Finding_Disease = document.getElementById("Finding_Disease")
            let Result = document.getElementById("Result")
            let disease_result__text_show = document.getElementById("disease_result__text_show")
            let suggest_the_solution_text_show = document.getElementById("suggest_the_solution_text_show")
            let visit_link_set = document.getElementById("visite_link")

            let count = 20
            Finding_Disease.style.display = "flex"
            window.scrollBy(0, +180)
            let loading2 = setInterval(animation2, 60);
            function animation2() {
                if (count == 100) {
                    clearInterval(loading2);
                    Result.style.display = "flex"
                    window.scrollBy(0, +180)

                    console.log(disresult.value)
                    if (disresult.value == 0) {
                        disease_result__text_show.style.fontSize = '1.8vw'
                        disease_result__text_show.innerHTML = 'No Disease Detect ✔✔'
                        suggest_the_solution_text_show.innerHTML = 'Thank You'
                        window.scrollBy(0, +180)

                    } else if (disresult.value == 1) {
                        disease_result__text_show.style.fontSize = '1.8vw'
                        visit_link_set.fontSize = '1vw'
                        disease_result__text_show.style.color='red'
                        suggest_the_solution_text_show.style.color='red'
                        visit_link_set.style.color = "Blue"
                        disease_result__text_show.innerHTML = 'Redmite'
                        suggest_the_solution_text_show.innerHTML = '• Use resistant crop varieties, contact local extension officer for advice on locally available varieties.\n• Plant nurseries away from areas of known infestation.\n• Apply mulch to improve health of crops and reduce impact from potential infestations.'
                        visit_link_set.innerHTML = "For more Suggestion visit this :: https://www.plantwise.org/KnowledgeBank/pmdg/20197800080"
                        visit_link_set.href = 'https://www.plantwise.org/KnowledgeBank/pmdg/20197800080'
                        window.scrollBy(0, +280)

                    } else if (disresult.value == 2) {
                        disease_result__text_show.style.fontSize = '1.8vw'
                        visit_link_set.fontSize = '1vw'
                        visit_link_set.style.color = "black"
                        disease_result__text_show.style.color='red'
                        suggest_the_solution_text_show.style.color='red'
                        visit_link_set.style.color = "Blue"
                        disease_result__text_show.innerHTML = 'Rust level 1'
                        suggest_the_solution_text_show.innerHTML ="spray cyproconazole by mixing 10ml of cyproconazole in 10l of water, and spray once a year."
                        visit_link_set.innerHTML = "For more Suggestion visit this: https://www.plantwise.org/KnowledgeBank/factsheetforfarmers/20127801774#:~:text=When%20coffee%20leaf%20rust%20is,and%20spray%20once%20a%20year."
                        visit_link_set.href = 'https://www.plantwise.org/KnowledgeBank/factsheetforfarmers/20127801774#:~:text=When%20coffee%20leaf%20rust%20is,and%20spray%20once%20a%20year'
                        window.scrollBy(0, +280)



                    } else if (disresult.value == 3) {
                        disease_result__text_show.style.fontSize = '1.8vw'
                        visit_link_set.fontSize = '1vw'
                        visit_link_set.style.color = "black"
                        disease_result__text_show.style.color='red'
                        suggest_the_solution_text_show.style.color='red'
                        visit_link_set.style.color = "Blue"
                        disease_result__text_show.innerHTML = 'Rust level 2'
                        suggest_the_solution_text_show.innerHTML='spray cyproconazole by mixing 10ml of cyproconazole in 10l of water, and spray once a year.'
                        visit_link_set.innerHTML = 'For more Suggestion visit this: https://www.plantwise.org/KnowledgeBank/factsheetforfarmers/20127801774#:~:text=When%20coffee%20leaf%20rust%20is,and%20spray%20once%20a%20year.'
                        visit_link_set.href = 'https://www.plantwise.org/KnowledgeBank/factsheetforfarmers/20127801774#:~:text=When%20coffee%20leaf%20rust%20is,and%20spray%20once%20a%20year'
                        window.scrollBy(0, +280)



                    } else if (disresult.value == 4) {
                        disease_result__text_show.style.fontSize = '1.8vw'
                        visit_link_set.fontSize = '1vw'
                        visit_link_set.style.color = "black"
                        disease_result__text_show.style.color='red'
                        suggest_the_solution_text_show.style.color='red'
                        visit_link_set.style.color = "Blue"
                        disease_result__text_show.innerHTML = 'Rust level 3'
                        suggest_the_solution_text_show.innerHTML='Use copper oxychloride for prevention of coffee leaf rust. Mix 50 grams of copper oxychloride in 15 litres of water, and sprayed on 20 trees after every two weeks.'
                        visit_link_set.innerHTML = 'For more Suggestion visit this: https://www.plantwise.org/KnowledgeBank/factsheetforfarmers/20127801774#:~:text=When%20coffee%20leaf%20rust%20is,and%20spray%20once%20a%20year.'
                        visit_link_set.href = 'https://www.plantwise.org/KnowledgeBank/factsheetforfarmers/20127801774#:~:text=When%20coffee%20leaf%20rust%20is,and%20spray%20once%20a%20year'
                        window.scrollBy(0, +280)



                    } else if (disresult.value == 5) {
                        disease_result__text_show.style.fontSize = '1.8vw'
                        visit_link_set.fontSize = '1vw'
                        visit_link_set.style.color = "black"
                        disease_result__text_show.style.color='red'
                        suggest_the_solution_text_show.style.color='red'
                        visit_link_set.style.color = "Blue"
                        disease_result__text_show.innerHTML = 'Rust level 4'
                        suggest_the_solution_text_show.innerHTML='Use copper oxychloride for prevention of coffee leaf rust. Mix 50 grams of copper oxychloride in 15 litres of water, and sprayed on 20 trees after every two weeks.'
                        visit_link_set.innerHTML = "For more Suggestion visit this: https://www.plantwise.org/KnowledgeBank/factsheetforfarmers/20127801774#:~:text=When%20coffee%20leaf%20rust%20is,and%20spray%20once%20a%20year."
                        visit_link_set.href = 'https://www.plantwise.org/KnowledgeBank/factsheetforfarmers/20127801774#:~:text=When%20coffee%20leaf%20rust%20is,and%20spray%20once%20a%20year'
                        window.scrollBy(0, +280)



                    } else if (disresult.value == 6) {
                        disease_result__text_show.style.fontSize = '1.8vw'
                        visit_link_set.fontSize = '1vw'
                        visit_link_set.style.color = "black"
                        disease_result__text_show.style.color='red'
                        suggest_the_solution_text_show.style.color='red'
                        visit_link_set.style.color = "Blue"
                        disease_result__text_show.innerHTML = 'Rust level 5'
                        suggest_the_solution_text_show.innerHTML='Use copper oxychloride for prevention of coffee leaf rust. Mix 50 grams of copper oxychloride in 15 litres of water, and sprayed on 20 trees after every two weeks.'
                        visit_link_set.innerHTML = "For more Suggestion visit this: https://www.plantwise.org/KnowledgeBank/factsheetforfarmers/20127801774#:~:text=When%20coffee%20leaf%20rust%20is,and%20spray%20once%20a%20year."
                        visit_link_set.href = 'https://www.plantwise.org/KnowledgeBank/factsheetforfarmers/20127801774#:~:text=When%20coffee%20leaf%20rust%20is,and%20spray%20once%20a%20year'
                        window.scrollBy(0, +280)



                    } else {
                        disease_result__text_show.style.fontSize = '1.8vw'
                        visit_link_set.fontSize = '1vw'
                        visit_link_set.style.color = "black"
                        disease_result__text_show.style.color='red'
                        suggest_the_solution_text_show.style.color='red'
                        visit_link_set.style.color = "Blue"
                        disease_result__text_show.innerHTML = 'System Error please check again'
                        aleart(disresult.value)
                        window.scrollBy(0, +180)
                     }


                } else {
                    count = count + 2;
                    processpercentage2.style.width = count + "%";
                    processpercentage2.style.background = "#338157d1";
                    percentage_show2.innerHTML = count + "%";
                }
            }

        }





        // const form = document.querySelector('form');
        const files = document.querySelector('[name=myFile]').files;
        const formData = new FormData();
        formData.append('picture', files[0]);
        xhr.send(formData);
    })
}