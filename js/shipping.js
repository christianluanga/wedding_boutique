/*This script handles all the logic applied to the shipping page. this logic includes changing the 
totals based on the selected delivery option,  toggle those delivery options based on the user's 
choice to collect their order or have it delivered. there's the logic for redirecting the user to 
a confirmation page once they click on the confirm order button/link*/

//Create an array of all valid coupons that can be applied on the shipping page
let coupons = [
    { id: 'aabb-2020', amount: 500, notUsed: true },
    { id: 'bbaa-2020', amount: 200, notUsed: true },
    { id: 'abab-2020', amount: 800, notUsed: true },
    { id: 'baba-2020', amount: 750, notUsed: true },
    { id: 'bbac-2020', amount: 1500, notUsed: true }
]

//Get the values that will be used to populate the payment summary table
let totals = JSON.parse(sessionStorage.getItem('totals'))
let { total, vat, items } = totals

//Toggle the coupon application controls
$('#coupon-expand-btn').on('click', function() {
    $('#coupon-controls').find('td')
        .slideToggle(600)
        .removeClass('d-none');
    $(this)[0].html = '<i class="far window-close"></i>'
})

/*Get the coupon entered by the user, valid and either apply it to the tot or decline based on the status 
of the by checking whether or not the coupon exists and it hasn't been used before*/
let index = 0
$('#coupon-apply-btn').on('click', function() {
    let usercoupon = $('#user-coupon').val()

    function couponAlert(message, alert) {
        $('#coupon-alert')
            .removeClass('d-none')
            .find('div').removeClass('alert-danger')
            .css('display', 'block').html(message)
            .addClass('alert-' + alert).fadeOut(3500)
        if (alert === 'sucess') {
            //hide the coupons controls after 3600 later if the applied coupon was valid
            setTimeout(() => {
                $('#coupon-controls').find('td')
                    .slideToggle()
                    .removeClass('d-none');
            }, 3600)
        }
    }
    //Loop through the coupons array to determine whether or not the coupon entered by the user is valid
    for (index = 0; index < coupons.length; index++) {
        let { id, amount, notUsed } = coupons[index]
        if (id === usercoupon) {
            if (notUsed) {
                let $subtol = $('#paym-summary-tot'),
                    subtot = $subtol[0].innerText.replace(/ /g, '').slice(1),
                    newTot = parseFloat(subtot) - amount;
                $subtol[0].innerHTML = (`<strong>R ${newTot}</strong>`)
                    //$subtol.fadeIn(2000)
                couponAlert('coupon applied', 'success')
                coupons[index].notUsed = false
                    //Make the discount row visible
                $('tr[id=discount-row]')
                    .removeClass('d-none')
                    .find('td:nth-child(2)')
                    .html(`<strong>R ${amount}</strong>`);
                //Update the total in the sessionStorage object this neccessary to reflect the correct values 
                //in the order confirmation page.
                totals.total = newTot;
                sessionStorage.getItem('totals', JSON.stringify(totals));
                //Update the vat to reflect the applied discount
                //$('td[id=vat]').html(`<strong>R ${vat - (amount*0.15)}</strong>`)
            } else couponAlert('coupon already used', 'danger')
            break //exit the loop when a matching vouvher is found 
        } else {
            couponAlert('Invalid coupon', 'danger')
        }
    }
})

//Set values of the payment summary table
let $paytot = $('td[id=paym-summary-tot]')
let $delievry_fees = $('#delivery-fees-td')
$('td[id=paym-summary-subtot]').html(`<strong>R ${total}</strong>`)
$('td[id=items-total]').html(`<strong>${items}</strong>`)
$('td[id=vat]').html(`<strong>R ${vat}</strong>`)
$paytot.html(`<strong>R ${total + vat}</strong>`)

//Hide/Show the billing information form
$('#billing-info-ckbx').on('click', function() {
    $("#billing-info-controls").toggle(!this.checked);
})
$('input[name=delivery-collection]').on('change', function() {
    $div = $('div#shipping-options')
    let option = $(this)[0].dataset.option
    if (option === 'del') $div.removeClass('d-none')
    else {
        $div.addClass('d-none')
        deliveryFees()
    }
    sessionStorage.setItem('delivery-col', option)
})
let samedayRate = 300,
    _3daysRate = 150;
//Update the total based on the delivery method selected 
$('[name=shipping-method]').on('change', function() {
    let deliveryMethod = $(this)[0].dataset.deliverymethod
    if (deliveryMethod === 'sameday') deliveryFees(samedayRate)
    else if (deliveryMethod === '3-5days') deliveryFees(_3daysRate)
    else deliveryFees()
    sessionStorage.setItem('deliveryOption', deliveryMethod)
})

function deliveryFees(amount = 0) {
    let delay = 500
    $paytot.fadeOut(delay)
    $delievry_fees.fadeOut(delay)
    setTimeout(function() {
        $paytot[0].innerHTML = `<strong>R ${total + vat + amount}</strong>`
        $paytot.fadeIn(delay)
        $delievry_fees.html(`<strong>R ${amount}</strong>`).fadeIn(delay)
    }, delay)


}
$('a#order-confirmation').on('click', function() {
    let shippingDetails = $('form#shipping-info-form input[type=text]').serialize()
    let shippingDetailsStr = '{"' + decodeURIComponent(shippingDetails)
        .replace(/=/g, '": "')
        .replace(/&/g, '", "').replace(/\+/g, " ") + '"}'
    sessionStorage.setItem('shipping-details', shippingDetailsStr)
})