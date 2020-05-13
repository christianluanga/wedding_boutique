# wedding_boutique
## Description
This project is an online boutique that sells wedding dresses and other wedding related items. 
The project does not include a back-end. All items displayed in the catalog page are hardcoded in array of objects.

## Installation
This project does not require any local installation to run. The project can be run local using the file system protocol 
pointing to the html file.

## Usage
There's a home page containing a short description about the store. the page can be accessed with this route /index.html.
Once on the home page there's a button that will redirect you the catalogue page. The catalog displays 12 items in 3 rows of 4
if you're viewing it from a large device and will responsively adjust as the screen resizes. 
Once the on the _catalogue_ page you can add an item to the cart directly from there or you can click on an item to go the cart 
page.
The cart page contains 3 options, add to basket, go back to the catalogue page and go to basket. 
If the go the basket option is choesen the basket page will load displaying all the items on the basket, including the _image,
description and price_. 
From the basket page items can be removed from the basket. When ready to checkout, click on the secure checkout page which will 
directs you to the shpping page.
On the shipping page you can choose to collect or have your items delivered. The default option is collection if you check the 
delivery option then a section displaying the diffrent delivery options will be made visible and the total will change according 
to the selected delivery option.
As mentioned before there's no back-end at this stage so all the necessary data is hardcoded, there's an option to enter a coupon
and that coupon will be applied. Here is the list of all valid coupons _aabb-2020,bbaa-2020,abab-2020,baba-2020,bbac-2020_ for the following respective amounts _R500,R200,R800,R750,R1500_ once the appropriate delivery option is selected or no the collection option
is selected click on the confirm button and confirm the order and this action will take you a confirmation page displaying the order 
summary and a short thank you message.
