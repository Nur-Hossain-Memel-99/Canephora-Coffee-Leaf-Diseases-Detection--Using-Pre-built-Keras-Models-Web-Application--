



function remove_community_post(data, i) {

    let oldUrl = (new URL(document.location)).searchParams
    let username = oldUrl.get('username')
    let password = oldUrl.get('Password')

    let url = "/delete_community_post?username=" + username + "&Password=" + password

    const form = new FormData()
    form.append('postid',data)

    fetch(url, {
        method: 'post',
        body: form,
    }).then(response => {
        return response.json();
    }).then(res => {
        console.log("ok")
            //code for show delete message
            if(res.data=='true'){
                document.getElementById('post_data_class'+i).style.display='none'
                document.getElementById('delete_post_message'+i).style.display=''
                document.getElementById('delete_post_message'+i).innerHTML='Post Deleted'
            }
    }).catch(error => {
        console.error(error)
    })
    
}


function remove_community_comment_(data, c) {

    //get username and pass from old url
    let oldUrl = (new URL(document.location)).searchParams
    let username = oldUrl.get('username')
    let password = oldUrl.get('Password')

    //set user and pass
    let url = "/deleteComment?username=" + username + "&Password=" + password

    let datainfo = data.split('||');

    const form = new FormData()
    form.append('postid',datainfo[0])
    form.append('commentid',datainfo[1])
    

    fetch(url, {
        method: 'post',
        body: form,
    }).then(response => {
        return response.json();
    }).then(res => {
            //code for show delete message
            if(res.data=='true'){
                document.getElementById('comment_dlt_ms_sh'+c).style.display=''
                document.getElementById('comment_dlt_ms_sh'+c).innerHTML='Comment Deleted'
                document.getElementById('eachcomment_box'+c).style.display='none'
            }else alert(res.data)
    }).catch(error => {
        console.error(error)
    })
}