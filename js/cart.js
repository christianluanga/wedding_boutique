/*This script handles 2 functionalities, both related to the addition of items to the cart page.*/

/*This function handles the display of an item details in the cart page. The function checks 
the sessionStorage object for 2 variables and perfrom different tasks depending on whether those
variable are found.*/
(function() {
    //Get the details of the item that was clicked on in the catalogue page
    let item = sessionStorage.getItem('item')
    let totItems
    let cartItems = sessionStorage.getItem('cartItems')
    cartItems === null ? totItems = 0 : totItems = JSON.parse(cartItems).details.length
    if (item !== null) {
        let itemObj = JSON.parse(item)
        let { price, description, name, discount, image } = itemObj
        if (discount == 0) {
            $('#item-price>span:nth-child(2)').hide()
            $('#item-price>span:first-child')[0].innerHTML = `R${price}`
        } else {
            $('#item-price>span:first-child')[0].innerHTML = `R${price}`
            $('#item-price>span:first-child').addClass('strike-through')
            $('#item-price>span:nth-child(2)')[0].innerHTML = `R${price-(price*(discount/100))}`
        }
        $('#item-title')[0].innerHTML = name
        $('#item-description')[0].innerHTML = description
        $('#item-discount')[0].innerHTML = `${discount}%`
        $('#item-image')[0].src = 'Img/wedding/' + image
        $('#total-item')[0].innerHTML = `${totItems}`
    } else {
        console.log('No values')
    }
})()

//The fn below does the same thing as the fn defined above the only difference is in the triggering event
//This one is triggered by the add to basket button from the item cart page while the one above is handles
//the quick add to basket option availabe in the catalogue page

$('button#add-to-cart').on('click', function() {
    let itemsArr = []
    let sessionCart = sessionStorage.getItem('cartItems')
    let { price, discount } = JSON.parse(sessionStorage.getItem('item'))
    let parsedDiscount = parseFloat(discount) / 100
    let parsedPrice = parseFloat(price)
    let discountedPrice = 0
    let grandTotal = 0

    //Calculate the discounted price if the item discount is > 0
    discount > 0 ? discountedPrice = parsedPrice - (parsedPrice * parsedDiscount) :
        discountedPrice = parsedPrice
    if (sessionCart !== null) {
        let { details, total } = JSON.parse(sessionCart)
        grandTotal = total + discountedPrice
        itemsArr = details
        alert(`Your total is R${grandTotal}`)
    } else {
        grandTotal = discountedPrice
        alert(`Your total is R${grandTotal}`)
    }
    //Add the item that was added to the basket to the cartItems sesssion storage object
    itemsArr.push(JSON.parse(sessionStorage.getItem('item')));
    //Set the total items on the top right corner of the cart page
    $('#total-item')[0].innerHTML = `${itemsArr.length}`;
    //Update the cartItems array for items that are added directly from the cart page
    sessionStorage.setItem('cartItems', JSON.stringify({ details: itemsArr, total: grandTotal }))
})