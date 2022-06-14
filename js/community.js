


function toggle_hide() {
    let togg_lehide = document.getElementById('new_us_post_section')
    if (togg_lehide.style.display == 'none') {
        togg_lehide.style.display = '';
    } else togg_lehide.style.display = 'none';
}



//post from the user
function send_to_server_and_apend_child() {

    //get username and pass from old url
    let oldUrl = (new URL(document.location)).searchParams
    let username = oldUrl.get('username')
    let password = oldUrl.get('Password')

    let full_time = new Date();
    let time = full_time.getHours()+":"+full_time.getMinutes()+" || "+full_time.getDate()+"/"+(full_time.getMonth()+1)+"/"+full_time.getFullYear()
    //set user and pass

    let url = "/new_post_request_from_user?username=" + username + "&Password=" + password
    const text = document.querySelector('[name="text"]').value;
    const files = document.querySelector('input[type="file"]').files;
    const data = new FormData()
    data.append('text', text)
    data.append('time',time)

    if (text.length <= 30) {
        alert('Minimum length 30 Alphabet')
    } else if (files[0]) {
        data.append('picture', files[0]);


        fetch(url, {
            method: 'post',
            body: data,
        }).then(response => {
            return response.json();
        })
            .then(res => {
                if (res.resdata == 'true') {
                    console.log(res.post_id)
                    const date = Date.now();


                    //create new post add section
                    let post_data_class = document.createElement('div');
                    let user_detail = document.createElement('div');
                    let post_user_pic = document.createElement('div');
                    let post_user_name = document.createElement('div');
                    let post_img_and_message_container = document.createElement('div');
                    let post_pic = document.createElement('div');
                    let post_message = document.createElement('div');
                    let all_comment = document.createElement('div');
                    let new_comment_section = document.createElement('div');
                    let user_pic = document.createElement('img');
                    let username = document.createElement('p');
                    let time_class = document.createElement('p')
                    let all_post_pic = document.createElement('img');
                    let aii_post_message = document.createElement('p');
                    let input_comment_class = document.createElement('input');
                    let comment = document.createElement('button');




                    //adding property, class, img, comment , css
                    post_data_class.classList.add('post_data_class')
                    user_detail.classList.add('user_detail');
                    post_user_pic.classList.add('post_user_pic');
                    post_user_name.classList.add('post_user_name');
                    post_img_and_message_container.classList.add('post_img_and_message_container');
                    post_pic.classList.add('post_pic');
                    post_message.classList.add('post_message');
                    new_comment_section.classList.add('new_comment_section');
                    user_pic.classList.add('user_pic');
                    username.classList.add('username');
                    time_class.classList.add('time_class');
                    all_post_pic.classList.add('all_post_pic');
                    aii_post_message.classList.add('aii_post_message');
                    input_comment_class.classList.add('input_comment_class');
                    input_comment_class.setAttribute("type", "text");
                    input_comment_class.setAttribute("placeholder", "comment");
                    input_comment_class.setAttribute("id", "comment_text" + date);
                    comment.classList.add('btn_comment_class');
                    comment.setAttribute("id", "comment"+date);
                    comment.setAttribute("onclick", "User_add_comment(this.value,"+date+")");
                    comment.setAttribute("value", res.post_id);
                    comment.innerHTML = 'Confirm'
                    all_comment.setAttribute("id",'all_comment'+date);



                    //adding value 
                    user_pic.src = document.getElementById('img_id_for_user_navi_R').src;
                    username.innerHTML = res.username
                    let imgurl = document.getElementById('user_post_pic').files[0];
                    all_post_pic.src = URL.createObjectURL(imgurl)
                    aii_post_message.innerHTML = document.getElementById('textarea_for_post').value;
                    time_class.innerHTML = time;



                    //append section
                    new_comment_section.append(input_comment_class);
                    new_comment_section.append(comment);
                    post_message.append(aii_post_message);
                    post_pic.append(all_post_pic);
                    post_user_name.append(username);
                    post_user_name.append(time_class)
                    post_user_pic.append(user_pic);

                    user_detail.append(post_user_pic)
                    user_detail.append(post_user_name)

                    post_img_and_message_container.append(post_pic)
                    post_img_and_message_container.append(post_message)

                    post_data_class.append(user_detail)
                    post_data_class.append(post_img_and_message_container)
                    post_data_class.append(all_comment)
                    post_data_class.append(new_comment_section)



                    //adding into html
                    let oldhtml = document.getElementById('all_post_section')
                    oldhtml.prepend(post_data_class)

                    document.getElementById('textarea_for_post').value=''
                    document.getElementById('user_post_pic').value = ''



                } else alert("Something error")
            })
            .catch(error => {
                console.error(error)
            })
    }


    //if here is no picture in post 
    else fetch(url, {
        method: 'post',
        body: data,
    })
        .then(response => {
            return response.json()
        })
        .then(res => {
            if (res.resdata == 'true') {
                console.log(res.post_id)
                const date = Date.now();


                //create new post add section
                let hr = document.createElement('hr');
                let post_data_class = document.createElement('div');
                let user_detail = document.createElement('div');
                let post_user_pic = document.createElement('div');
                let post_user_name = document.createElement('div');
                let post_img_and_message_container = document.createElement('div');
                let post_pic = document.createElement('div');
                let post_message = document.createElement('div');
                let all_comment = document.createElement('div');
                let new_comment_section = document.createElement('div');
                let user_pic = document.createElement('img');
                let username = document.createElement('p');
                let time_class = document.createElement('p')
                let aii_post_message = document.createElement('p');
                let input_comment_class = document.createElement('input');
                let comment = document.createElement('button');




                //adding property, class, img, comment , css
                post_data_class.classList.add('post_data_class')
                user_detail.classList.add('user_detail');
                post_user_pic.classList.add('post_user_pic');
                post_user_name.classList.add('post_user_name');
                post_img_and_message_container.classList.add('post_img_and_message_container');
                post_pic.classList.add('post_pic');
                post_message.classList.add('post_message');
                new_comment_section.classList.add('new_comment_section');
                user_pic.classList.add('user_pic');
                username.classList.add('username');
                time_class.classList.add('time_class');
                aii_post_message.classList.add('aii_post_message');
                input_comment_class.classList.add('input_comment_class');
                input_comment_class.setAttribute("type", "text");
                input_comment_class.setAttribute("placeholder", "comment");
                input_comment_class.setAttribute("id", "comment_text" + date);
                comment.classList.add('btn_comment_class');
                comment.setAttribute("id", "comment"+date);
                comment.setAttribute("onclick", "User_add_comment(this.value,"+date+")");
                comment.setAttribute("value", res.post_id);
                comment.innerHTML = 'Confirm'
                all_comment.setAttribute("id",'all_comment'+date);



                //adding value 
                user_pic.src = document.getElementById('img_id_for_user_navi_R').src;
                username.innerHTML ='@'+ res.username
                aii_post_message.innerHTML = document.getElementById('textarea_for_post').value;
                time_class.innerHTML = time;




                //append section
                new_comment_section.append(input_comment_class);
                new_comment_section.append(comment);
                post_message.append(aii_post_message);
                post_user_name.append(username);
                post_user_name.append(time_class);
                post_user_pic.append(user_pic);

                user_detail.append(post_user_pic)
                user_detail.append(post_user_name)

                post_img_and_message_container.append(post_pic)
                post_img_and_message_container.append(post_message)

                post_data_class.append(hr)
                post_data_class.append(user_detail)
                post_data_class.append(post_img_and_message_container)
                post_data_class.append(all_comment)
                post_data_class.append(new_comment_section)



                //adding into html
                let oldhtml = document.getElementById('all_post_section')
                oldhtml.prepend(post_data_class)

                document.getElementById('textarea_for_post').value=''
                document.getElementById('user_post_pic').value = ''



            } else alert("Something error")
        })

        .catch(error => {
            console.error(error)
        })
}




function User_add_comment(post_id, i) {
    //get username and pass from old url
    let oldUrl = (new URL(document.location)).searchParams
    let username = oldUrl.get('username')
    let password = oldUrl.get('Password')
    let text = document.getElementById("comment_text" + i).value


    let full_time = new Date();
    let time = full_time.getHours()+":"+full_time.getMinutes()+" || "+full_time.getDate()+"/"+(full_time.getMonth()+1)+"/"+full_time.getFullYear()

    //set user and pass
    let url = "/comment?username=" + username + "&Password=" + password
    const data = new FormData()
    data.append('id', post_id)
    data.append('text', text)
    data.append('time',time)


    fetch(url, {
        method: 'post',
        body: data,
    })
        .then(response => {
            return response.json();
        })
        .then(res => {
            if (res.resdata == 'true') {

                //create comment add section
                let comment_container = document.createElement('div');
                let comment_users = document.createElement("div");
                let comment_pic = document.createElement("div");
                let comment_user = document.createElement("div");
                let comment_text = document.createElement("div");
                let comment_user_class = document.createElement("img");
                let comment_user_name = document.createElement("p");
                let time_comment = document.createElement('span')
                let comment_message_class = document.createElement("p");

                //adding property, class, img, comment , css
                comment_container.classList.add('comment_container')
                comment_users.classList.add('comment_users');
                comment_pic.classList.add('comment_pic');
                comment_user.classList.add('comment_user')
                comment_text.classList.add('comment_text');
                comment_user_class.classList.add('comment_user_class');
                comment_user_name.classList.add('comment_user_name');
                time_comment.classList.add('time_comment');
                comment_message_class.classList.add('comment_message_class');


                //adding value 
                comment_user_class.src = document.getElementById('img_id_for_user_navi_R').src;
                comment_user_name.innerHTML = '@' + res.commentUserName;
                comment_message_class.innerHTML = text;
                document.getElementById("comment_text" + i).value = ''
                time_comment.innerHTML = time;


                //append section
                comment_text.append(comment_message_class);
                console.log(comment_text)
                comment_user.append(comment_user_name);
                comment_user.append(time_comment);
                comment_pic.append(comment_user_class);
                comment_users.append(comment_pic);
                comment_users.append(comment_user);

                //append in html page
                comment_container.append(comment_users);
                comment_container.append(comment_text);
                let all_comment = document.getElementById('all_comment' + i);
                all_comment.append(comment_container);


            } else if (res.resdata == 'login_error') {
                alert('Please Login First')
            } else alert("Something error")
        })
        .catch(error => {
            console.error(error)
        })

}