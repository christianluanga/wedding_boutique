/*This script used in creation of the basket page. The script gets the cartItems array from the 
sessionStorage object and creates a row for every item in the array, if the array object does not
exist then an empty table is displayed */
(function() {
    let items = sessionStorage.getItem('cartItems')
    let $tbody = $('#items-details-body')
    if (items !== null) {
        let { details, total } = JSON.parse(items)
        let rows = ''
        let index = 0

        //loop through all the items in the cart and add a row to the basket display table
        details.map(item => {
                let { price, discountedPrice, discount, description, name, image } = item
                rows += `<tr class="border-bottom mb-2" data-row=${index}>
                        <td>${index+1}</td>
                        <td>
                            <img src="./Img/wedding/${image}" alt="">
                        </td>
                        <td class="text-left"><strong>${name}</strong><br>${description}</td>
                        <td class="text-right">R ${price}<br>${discount}%</td>
                        <td>${1}</td>
                        <td>R ${discountedPrice}</td>
                        <td>
                            <button class="btn pt-0 remove-row" style="text-decoration: underline;">
                            Remove
                            </button>
                        </td>
                    </tr>`
                index++
            }) //end map
        $tbody.html(rows);
        let vat = total * 0.15,
            totItems = details.length

        //Call the basketsumary function to populate the summary table
        basketSummary(total, vat, totItems)

        //write the totals values to a session object that will be used in the shipping page
        //To populate the payment summary table
        sessionStorage.setItem('totals', JSON.stringify({
            total: total,
            vat: vat,
            items: totItems
        }))
    } //and if
})()

function basketSummary(total, vat, totItems) {
    //Write the total exc and including vat, the vat and the total items to the payment summary table
    $('td[id=paym-summary-subtot]').html(`<strong>R ${total}</strong>`)
    $('td[id=items-total]').html(`<strong>${totItems}</strong>`)
    $('td[id=vat]').html(`<strong>R ${vat}</strong>`)
    $('td[id=paym-summary-tot]').html(`<strong>R ${total + vat}</strong>`)
}

/*The fn below listens for a click on the remove button. when the action is triggered the row that was
clicked on will fade out over a period of 1s then that row will be removed from the cartItems array
that is saved in the session storage object. The basketSummary fn is also called to update the values
of the payment summary to reflect the new values after updating the total price, total items and vat*/
$('#items-details-body').on("click", ".remove-row", function() {
    //Get the values representing the current basket state
    let { details } = JSON.parse(sessionStorage.getItem('cartItems'))
    let { total, items } = JSON.parse(sessionStorage.getItem('totals'))

    //Get the entire row that contains the button that was clicked
    let $this = $(this).closest("tr")
    let rowIndex = $this[0].dataset.row
    let index = 1

    //Calculate the new values 
    let newTot = total - details[rowIndex].discountedPrice
    let newVat = newTot * 0.15
    let newTotItems = items - 1

    let delay = 2000
    $this.find('td').fadeOut(delay);
    setTimeout(() => {
        $this.remove()
        $('#items-details-body tr').each(function() {
            $(this)[0].childNodes[1].innerHTML = index
            $(this)[0].dataset.row = index - 1
            index++
        })
        basketSummary(newTot, newVat, newTotItems)
    }, delay)

    //Remove the row that was clicked from the cartItems details array
    details.splice(rowIndex, 1)

    sessionStorage.setItem('cartItems', JSON.stringify({ details: details, total: newTot }))
    sessionStorage.setItem('totals', JSON.stringify({ total: newTot, vat: newVat, items: newTotItems }))
});