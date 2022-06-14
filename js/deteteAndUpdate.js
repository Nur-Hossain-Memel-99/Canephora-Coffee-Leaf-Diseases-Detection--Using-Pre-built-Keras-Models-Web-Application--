







//confirm ajax request for delete blogs
function delete_element(data, i) {
        if (confirm('Are you want to Delete?')) {
                const xhr = new XMLHttpRequest();

                //get user pass from old url
                let oldUrl = (new URL(document.location)).searchParams
                let username = oldUrl.get('username')
                let password = oldUrl.get('Password')

                //set user and pass
                let url = "/deleteitem?username=" + username + "&Password=" + password

                xhr.open('post', url, true);

                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onload = function () {
                        let response = JSON.parse(xhr.responseText).data
                        if (response == true) {
                                document.getElementById("blogs" + i).style.display = 'none'
                                document.getElementById("delete_element_" + i).style.display = 'none'
                                let deletemessage = document.getElementById("deletemessage" + i)
                                deletemessage.innerHTML = "Deleted"
                                deletemessage.style.fontSize = "1.8vw"
                                deletemessage.style.color = "red"
                                deletemessage.style.margin = "auto"
                        } else aleart("ID and Password not match")
                }
                data = "id=" + data
                xhr.send(data)
        } else {
                // Do nothing!
                console.log("data not match")
        }
}


function delete_pic(data, i) {
        if (confirm('Are you want to Delete?')) {
                const xhr = new XMLHttpRequest();

                //get username and pass from old url
                let oldUrl = (new URL(document.location)).searchParams
                let username = oldUrl.get('username')
                let password = oldUrl.get('Password')

                //set user and pass
                let url = "/deletepic?username=" + username + "&Password=" + password

                xhr.open('post', url, true);

                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onload = function () {
                        let response = JSON.parse(xhr.responseText).data

                        if (response == true) {
                                document.getElementById("div_pic_show" + i).style.display = 'none'
                                let deletemessage = document.getElementById("deletemessage_in_pic_div" + i)
                                deletemessage.innerHTML = "Deleted"
                                deletemessage.style.fontSize = "1.8vw"
                                deletemessage.style.color = "red"
                                deletemessage.style.margin = "auto"

                        } else aleart("ID and Password not match")
                }
                data = "id=" + data
                xhr.send(data)
        } else {
                // Do nothing!
        }
}

function remove_author(data, i) {
        if (confirm('Are you want to Delete?')) {
                const xhr = new XMLHttpRequest();

                //get username and pass from old url
                let oldUrl = (new URL(document.location)).searchParams
                let username = oldUrl.get('username')
                let password = oldUrl.get('Password')

                //set user and pass
                let url = "/remove_author?username=" + username + "&Password=" + password

                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onload = function () {
                        let response = JSON.parse(xhr.responseText).data

                        if (response == true) {
                                document.getElementById("admin_box_"+i).style.display = 'none'
                                let deletemessage = document.getElementById("deletemessage_in_admin_div" + i)
                                deletemessage.innerHTML = "Deleted"
                                deletemessage.style.fontSize = "1.8vw"
                                deletemessage.style.color = "red"
                                deletemessage.style.margin = "auto"

                        } else aleart("ID and Password not match")
                        console.log(response)
                }
                data = "id=" + data
                xhr.send(data)
        } else {
                // Do nothing!
        }
}







