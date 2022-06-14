
function newpostfile() {
    document.getElementById("formfile").style.display = "block";
}
function newpostfileCancle() {
    document.getElementById("formfile").style.display = "none";
}
function showblogs() {
    document.getElementById("blogshowhide").style.display = "";
    document.getElementById('newPost').style.display="";
    document.getElementById("reportshowhide").style.display = "none";
    document.getElementById("hideandshow").style.display='none';
    document.getElementById("showandhide_pic_records").style.display='none';
    document.getElementById("add_pic_in_gallery").style.display="none";
    document.getElementById('show_Admin_List').style.display='none';
    document.getElementById('community_control').style.display='none';
    document.getElementById('hideandshow').style.display='none';

    document.getElementById('btnblogs').style.opacity = 1;
    document.getElementById('btnreport').style.opacity=0.5;
    document.getElementById('btnshowpicture').style.opacity=0.5;
    document.getElementById('btnshowAdmins').style.opacity=0.5;
    document.getElementById('community_navigation_btn').style.opacity=0.5;

    
}

function showreports() {
    document.getElementById('newPost').style.display='none';
    document.getElementById("blogshowhide").style.display = "none";
    document.getElementById("reportshowhide").style.display = "";
    document.getElementById("hideandshow").style.display='none';
    document.getElementById("showandhide_pic_records").style.display='none';
    document.getElementById("add_pic_in_gallery").style.display="none";
    document.getElementById('show_Admin_List').style.display='none';
    document.getElementById('community_control').style.display='none';
    document.getElementById('hideandshow').style.display='none';

    document.getElementById('btnblogs').style.opacity = 0.5;
    document.getElementById('btnreport').style.opacity=1;
    document.getElementById('btnshowpicture').style.opacity=0.5;
    document.getElementById('btnshowAdmins').style.opacity=0.5;
    document.getElementById('community_navigation_btn').style.opacity=0.5;
}

function showpicture(){
    document.getElementById('newPost').style.display='none';
    document.getElementById("blogshowhide").style.display = "none";
    document.getElementById("reportshowhide").style.display = "none";
    document.getElementById("showandhide_pic_records").style.display="";
    document.getElementById("add_pic_in_gallery").style.display="";
    document.getElementById('show_Admin_List').style.display='none';
    document.getElementById('community_control').style.display='none';
    document.getElementById('hideandshow').style.display='none';

    document.getElementById('btnblogs').style.opacity = 0.5;
    document.getElementById('btnreport').style.opacity=0.5;
    document.getElementById('btnshowpicture').style.opacity=1;
    document.getElementById('btnshowAdmins').style.opacity=0.5;
    document.getElementById('community_navigation_btn').style.opacity=0.5;
}

function showAdmis(){
    document.getElementById('newPost').style.display='none';
    document.getElementById("blogshowhide").style.display = "none";
    document.getElementById("reportshowhide").style.display = "none";
    document.getElementById("showandhide_pic_records").style.display="none";
    document.getElementById("add_pic_in_gallery").style.display="none";
    document.getElementById('show_Admin_List').style.display='';
    document.getElementById('community_control').style.display='none';
    document.getElementById('hideandshow').style.display='none';

    document.getElementById('btnblogs').style.opacity = 0.5;
    document.getElementById('btnreport').style.opacity=0.5;
    document.getElementById('btnshowpicture').style.opacity=0.5;
    document.getElementById('btnshowAdmins').style.opacity=1;
    document.getElementById('community_navigation_btn').style.opacity=0.5;
}

function show_community(){
    document.getElementById('newPost').style.display='none';
    document.getElementById("blogshowhide").style.display = "none";
    document.getElementById("reportshowhide").style.display = "none";
    document.getElementById("showandhide_pic_records").style.display="none";
    document.getElementById("add_pic_in_gallery").style.display="none";
    document.getElementById('show_Admin_List').style.display='none';
    document.getElementById('community_control').style.display='';
    document.getElementById('hideandshow').style.display='none';

    document.getElementById('btnblogs').style.opacity = 0.5;
    document.getElementById('btnreport').style.opacity=0.5;
    document.getElementById('btnshowpicture').style.opacity=0.5;
    document.getElementById('btnshowAdmins').style.opacity=0.5;
    document.getElementById('community_navigation_btn').style.opacity=1;
}

function show_gallery_thumbnail(){
    let flag = document.getElementById("hideandshow")
    if(flag.style.display==''){
        flag.style.display='none'
    }else flag.style.display=''
    
}



function aleart2(e) {
    e.returnValue = false;
    let timerInterval;
    Swal.fire({
        title: 'File Saving',
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

        var hrefold = new URL(window.location.href);
        var un = hrefold.searchParams.get("username");
        var pw = hrefold.searchParams.get("Password");
        var href = new URL(window.location.origin+"/newpostrequest?username=null&Password=null");
        href.searchParams.set('username', un);
        href.searchParams.set('Password', pw);

        if (result.dismiss === Swal.DismissReason.timer) {
            document.nf.action = href;
            document.nf.submit();
        }
    })
}
