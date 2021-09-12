$(()=>{
    $('input[type="text"]').on({
        keyup: function(){
            changeInput(this);
            submitDisable();
        },  
    });
});