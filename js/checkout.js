var vouchers = [
    { id: 'aabb-2020', amount: 500, notUsed: true },
    { id: 'bbaa-2020', amount: 200, notUsed: true },
    { id: 'abab-2020', amount: 800, notUsed: true },
    { id: 'baba-2020', amount: 1000, notUsed: true },
    { id: 'bbac-2020', amount: 1500, notUsed: true }
]
$('#voucher-expand-btn').on('click', function() {
    $('#voucher-controls').find('td')
        .slideToggle(600)
        .removeClass('d-none');
    $(this)[0].html = '<i class="far window-close"></i>'
})


let index = 0
$('#voucher-apply-btn').on('click', function() {
    let userVoucher = $('#user-voucher').val()

    function voucherAlert(message, alert) {
        $('#voucher-alert')
            .removeClass('d-none')
            .find('div')
            .css('display', 'block')
            .html(message)
            .addClass('alert-' + alert)
            .fadeOut(3500)
    }
    for (index = 0; index < vouchers.length; index++) {
        let { id, amount, notUsed } = vouchers[index]
        if (id === userVoucher) {
            if (notUsed) {
                let $subtol = $('#paym-summary-tot'),
                    subtot = $subtol[0].innerText.replace(/ /g, '').slice(1)
                $subtol[0].innerHTML = (`<strong>R ${parseFloat(subtot) - amount}</strong>`)
                $subtol.fadeIn(2000)
                voucherAlert('Voucher applied', 'success')
                vouchers[index].notUsed = false
            } else voucherAlert('Voucher already used', 'danger')
            break
        } else {
            voucherAlert('Invalid voucher', 'danger')
            $('#voucher-alert').find('div').removeClass('alert-danger')
        }
    }
})