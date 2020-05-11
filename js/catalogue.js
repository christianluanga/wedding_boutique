/* This js file contains the logic for creating some HTML markup for the catalogue page. 
A CatalogueItem constructor is created and every item in the page is an object of type  
The item object contains the properties and method(s) for each */
var item = {};

//CatalogueItem constructor
function CatalogueItem(name, description, image, price, discount) {
    this.name = name
    this.price = price
    this.discount = discount
    this.description = description
    this.image = image

    //This method is used to perform the quick add to cart functionality from the catalogue page
    this.addToCart = function() {
        let cartItems = []
        let cartSession = sessionStorage.getItem('cartItems')
        let parsedDiscount = parseFloat(discount) / 100
        let parsedPrice = parseFloat(price)
        let discountedPrice = price
        let grandTotal = 0
        discount > 0 ? discountedPrice = parsedPrice - (parsedPrice * parsedDiscount) :
            discountedPrice = parsedPrice
        if (cartSession !== null) {
            let { details, total } = JSON.parse(cartSession)
            cartItems = details
            grandTotal = total + discountedPrice
            alert(`Your total is R${grandTotal}`)
        } else {
            grandTotal = discountedPrice
            alert(`Your total is R${grandTotal}`)
        }
        let item = {
            name: name,
            description: description,
            image: image,
            price: price,
            discountedPrice: discountedPrice,
            discount: discount
        }
        cartItems.push(item)
        sessionStorage.setItem('cartItems', JSON.stringify({
            details: cartItems,
            total: grandTotal
        }))
    }
}

//Creating an array of 12 CatalogueItem objects that will be used to create the catalogue page
let itemsArray = [
        new CatalogueItem(
            'Wedding dresses',
            'Six wedding dresses of different color and style on display by mannequins. Perfect for all body types and skin tone',
            'bridal-design-dress-elegant-291738.jpg',
            18000,
            0
        ),
        new CatalogueItem(
            'Luxurious High Heel',
            'High heels by ond of the top designer and a matching handbag. The handbag and the red heels combinaison is our recommendation.',
            'close-up-of-shoes-and-bag.jpg',
            12000,
            15
        ),
        new CatalogueItem(
            'Groom in Wedding dress',
            'A groom wearing a covered white wedding dress and her bridemaid wearing a sleeveless white dress',
            'woman-in-white-lace-wedding-dress-holding-flower-bouquet.jpg',
            15000,
            0
        ),
        new CatalogueItem(
            'Wedding dress and Heels',
            'Recommended by our stylist all items in this combinaison were careful choosen the fit to perfection',
            'woman-holding-her-high-hills.jpg',
            13500,
            5
        ),
        new CatalogueItem(
            'Rose Gold wedding dress',
            'With this dress not only are you glowing and amazing colors, you also get something that is unique.',
            'bride-decoration-fashion-flowers.jpg',
            25000,
            20
        ),
        new CatalogueItem(
            'High heels and flowers',
            'No decoration or apparel beats a well organized bouquet of flowers to match a set of designer\'s stylish high heels',
            'wedding-preparation.jpg',
            7500,
            0
        ),
        new CatalogueItem(
            'Newlyweds sunset',
            'In the sunset on the carribean this couple of Newlyweds are expressing their joy with a smile while holding each other\'s hands.',
            'woman-in-white-dress-holding-bouquet-of-flowers.jpg',
            8000,
            12
        ),
        new CatalogueItem(
            'Wedding dress and flowers',
            'A bouquet of multi-coloured flowers, the sea in the background makes this dress look even more stunning.',
            'woman-wearing-wedding-dress-while-holding-her-hair.jpg',
            13000,
            0
        ),
        new CatalogueItem(
            'Stunning wedding dress',
            'Are looking for perfect and unique piece of wear for your wedding ? if yes, then this dress is what you need.',
            'photo-of-woman-wearing-golden-gown.jpg',
            30000,
            10
        ),
        new CatalogueItem(
            'Handmade High Hells',
            'These stylished handmade high heels were specifically designed for people who want to stand apart from the crowd.',
            'pexels-323690.jpg',
            18000,
            7
        ),
        new CatalogueItem(
            'Dress and Suit',
            'If you want you wedding the be memorable then you\'d want your bestman and bridemaid to be as well dressed as yo are. Get both the dress and the suit the price of one.',
            'photo-of-man-and-woman-staring-at-each-other.jpg',
            28000,
            0
        ),
        new CatalogueItem(
            'Wedding dress/Back',
            'The emphasis on this dress is on the shoulders to show special shapes and impeccable design patterns found no where else.',
            'photo-of-woman-wearing-wedding-dress.jpg',
            12000,
            0
        )
    ]
    //ad a method that creates an item to the item object
createItem = function() {
    let index = 0,
        tempIndex = 0,
        len = itemsArray.length / 4
        //alert(len)
        //itemsArray.map((item) => {
    for (j = 0; j < len; j++) {
        for (let i = 0; i < 4; i++) {
            let { name, description, image, price, discount, addToCart } = itemsArray[index]
            let discountedPrice = 0

            //Create documents elements that represent each item in the catalogue
            let colDiv = document.createElement('div')
            let cardDiv = document.createElement('div')
            let cardBodyDiv = document.createElement('div')
            let cardText = document.createElement('div')
            let cardImg = document.createElement('img')
            let cardTitle = document.createElement('h5')
            let addToCartBtn = document.createElement('button')
            let link = document.createElement('a')

            //set elements attributes
            colDiv.classList = 'col-xl-3 col-md-6 mt-4'
            cardDiv.className = 'card h-100'
            cardBodyDiv.className = 'card-body text-center'
            cardImg.className = 'card-img-top img-fluid img-thumbnail rounded'
            cardImg.src = 'Img/wedding/' + image
            link.href = 'cart.html'
            link.style.textDecoration = 'none'
            cardTitle.className = 'card-title'
            cardText.className = 'card-text'
            addToCartBtn.className = 'text-left mt-3 btn btn-primary btn-sm'

            //Set the values of the HTML elements created above 
            discount > 0 ? discountedPrice = price - (price * discount / 100) :
                discountedPrice = price
            addToCartBtn.innerHTML = 'Add to cart'
            cardTitle.innerHTML = name
            cardText.innerHTML = `${description}<br><br>
            Price: R${price} 
            Discount: ${discount}%`
            link.addEventListener('click', function() {
                sessionStorage.setItem('item',
                    JSON.stringify({
                        name: name,
                        description: description,
                        image: image,
                        price: price,
                        discountedPrice: discountedPrice,
                        discount: discount
                    }))
            })
            addToCartBtn.addEventListener('click', function() {
                addToCart()
            })

            //Append the elements in the correct order to create a Bootstrap card component for each item
            link.append(cardImg)
            cardBodyDiv.append(link)
            cardBodyDiv.append(cardTitle)
            cardBodyDiv.append(cardText)
            cardBodyDiv.append(addToCartBtn)
            cardDiv.append(cardBodyDiv)
            colDiv.append(cardDiv)

            //Append the created column the row with the specified id in the catalogue page
            $('#row_' + (j + 1)).append(colDiv)
            index++
        }
    }
}

createItem()