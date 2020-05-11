/*This script contains the logic used to generate the order confirmation page */

//Get all the necessary values from the session storage objects 
let cartItems = JSON.parse(sessionStorage.getItem('cartItems'))
let { total, vat, items } = JSON.parse(sessionStorage.getItem('totals'))
let shippingDetails = JSON.parse(sessionStorage.getItem('shipping-details'))
let rows = ''

//Loop through the cartItems array and get the name and price of each item and create a 
//table row with these details
cartItems.details.map(item => {
    let { name, discountedPrice } = item
    rows +=
        `<tr>
            <td>1x ${name}</td>
            <td>R ${discountedPrice}</td>
        </tr>`
})

$('table>tbody#order-summary-table').html(rows)
$('span#order-reference').html(`  ${generateOrderRef(10)}`)

//Get all div in the footer row with the specified id and then find all spans nested in the row
//set the innerHTML property of those spans with the corresponding total value
let footerSpans = $('#totals-row').find('span')
footerSpans[0].innerHTML = `<strong>Subtotal R ${total}</strong>`
footerSpans[1].innerHTML = `<strong>Vat R ${vat}</strong>`
footerSpans[2].innerHTML = `<strong>Total R ${total + vat}</strong>`

//Call the generateOrderRef fn and set the returned value to the order ref placehlder in the page
$('span#name').html(`${shippingDetails['shipping-name'].toUpperCase()}`)

//Generate a random order number 
function generateOrderRef(length) {
    let reference = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        reference += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return reference;
}

//Clear the sessionStorage object and return to the catalogue page
$('a#back-to-catalogue-btn').on('click', function() {
    sessionStorage.clear()
})