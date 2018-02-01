var button = document.querySelectorAll('.point-button'),
    c2a = document.querySelectorAll('.btn.c2a')

for (var i = 0; i < button.length; i++) {

    button[i].addEventListener('click', function () {
        
        const index = Array.from(document.querySelectorAll('.point-button')).indexOf(this),
            btn = c2a[index]
        btn.classList.toggle('show')
    })

}