$(()=>{
    $('input[type="text"]').on({
        keyup: function(){
            changeInput(this)
            submitDisable(false);
        },
        focus: function(){
            changeInput(this);
        }
    })
})