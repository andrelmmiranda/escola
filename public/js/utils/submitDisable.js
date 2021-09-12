const submitDisable = () => $('#nome').val() === '' || $('#registro').val() === '' || $('#disciplina').val() === '' || $('#qtdHoras').val() === ''?
    $('[type="submit"]').prop('disabled', true)
: 
    $('[type="submit"]').prop('disabled', false);