function toggle_hide_navigation(){
    let right_navigation=document.getElementById('navigation_right');
    let dot1 = document.getElementById('dot1');
    let dot2 = document.getElementById('dot2');
    let dot3 = document.getElementById('dot3');
    let dot4 = document.getElementById('dot4');
    if (right_navigation.style.opacity==0){
        right_navigation.style.display=''
        setTimeout(() => {
            right_navigation.style.opacity=1;
            dot1.classList.add('dot');
            dot2.classList.add('dot');
            dot3.classList.add('dot');
            dot4.classList.add('dot');
        }, 200);
        
    }
    
    else {
        right_navigation.style.opacity=0;
        dot1.classList.remove('dot')
        dot2.classList.remove('dot')
        dot3.classList.remove('dot')
        dot4.classList.remove('dot')
        setTimeout(() => {
            right_navigation.style.display='none';
        }, 1000);
        
    }
}

