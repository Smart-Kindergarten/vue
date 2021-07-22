window.onload = function () {
        var lis = document.getElementsByTagName('li');
        var dls = document.getElementsByTagName('dl');
        for (var i = 0; i < lis.length; i ++) {
            lis[i].index = i;
            lis[i].onclick = function () {        
            for (var i = 0; i < lis.length; i ++) {
                lis[i].className ='';
                dls[i].style.display = 'none';
                }
                this.className = 'active';
                dls[this.index].style.display = 'block';
            }
        }
    }