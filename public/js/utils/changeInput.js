const changeInput = $this => $($this).val() === '' ?
    $($this).css({
        'border': '1px solid var(--red)',
        'box-shadow':'0px 0px 10px var(--red)'
    })
:
    $($this).css({
        'border': '1px solid var(--green)',
        'box-shadow':'0px 0px 6px var(--green)'
    })