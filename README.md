[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=23490640)
# LBYCPG3 Term End Project — Digital Menu Platform

**Group Members:** 
Vian Gavrylle Duran
Juan Boris Lagco

## Abstract

Communication between carinderia sellers and buyers in the Philippines is mostly done through social media websites such as Facebook and Facebook Messenger. Although the tools are easy to use, they are inefficient because of repeated messages from the buyer to learn more about the available foods, their prices, and availability status. This paper outlines the need to develop a simple, affordable, and efficient online platform that would facilitate communication between the buyer and seller of food items and that is not difficult to use by the target market. The platform is expected to provide an avenue for the carinderia sellers to showcase their daily menu to potential buyers in a cost-effective manner and within a minimal time frame.

The platform, which is built using HTML5 and is supported by Figma, incorporates basic yet relevant elements such as menu display, pricing, availability information, and contact options. Moreover, the site will be simple, efficient, and easy to access by mobile phones. The website is optimized to facilitate faster and easier communication between customers and the business owners.


## Introduction

The advancement of digital technologies has revolutionized the way small enterprises communicate with their consumers, especially using online channels. For instance, many food merchants and owners of carinderia in the Philippines have been making use of platforms like Facebook and Facebook Messenger to communicate with their clients. Despite its advantages, this kind of platform results in inefficiency, because the sellers will keep responding to the same inquiries related to the menu of the day, the price range, and food availability.

It is in line with these concerns that this particular project seeks to develop a simple yet practical menu system that can facilitate the daily activities of small enterprises dealing with food-related businesses. In contrast to receiving several individual messages per day, the sellers will simply need to update the daily menu on their website. The proposed solution will take into account certain factors such as limited resources and lack of internet connection.

By developing a digital menu system for the selected users, the project is expected to increase communication efficiency and save time. In order to achieve the best possible result, the developer may make use of some of the available tools, such as Figma Maker and HTML.


## Description of the Proposed System

The proposed system will be a lightweight digital menu that utilizes web-based technologies. This digital menu platform is designed for use by sellers operating small food stores, particularly those known as carinderias that depend on frequent contact with customers for advertising their daily food dishes. The digital menu system allows the seller to post their daily food dishes on one centralized website where customers can log in using their mobile phones to view what kind of dishes are available on that day.

The website is created in a way to allow customers to check for their menu using only basic phones. The first page of the site shows important information like name of the seller, food dishes available on that day, price of each item, and whether or not the dish is available or sold out. In addition, a button for contacting the seller can also be found at the end of the page, allowing the customer to directly contact the seller in case he or she wants to order from the menu.

The system features an intuitive and user-friendly interface for menu management. It becomes possible for the seller to update the menu via their smartphone, which means adding new dishes, changing prices, and adjusting availability. Thus, there will be no need for any advanced technical skills on the side of the seller since the process should take no more than a couple of minutes every day. 

The described system would serve as a menu board in a digital format. It reduces the necessity for repetitive communication, improves access to necessary information, and preserves simplicity at the same time.


## Objectives

The overall goal for this project is to design a website which will make it easier for local food vendors to present their menu on a day-to-day basis to their customers.

The project aims to:
- Reduce repetitive customer inquiries by providing a centralized platform where users can view the daily menu without sending messages through Facebook Messenger.
- Improve the operational efficiency of the seller by minimizing time spent on manual communication and allowing more focus on food preparation.
- Design a mobile-friendly website that can function effectively on low-end smartphones.
- Create a simple interface that allows the seller to easily update menu items, prices, and availability on a daily basis.
- Enhance customer convenience by enabling quick access to food options, pricing, and availability in one place.


## Web Development Tools and Algorithms

Interface design and its layout was created using Figma in the initial stages of the website development process. This software helped designers create an interface prototype where the position of menu items, navigational components, and administrative tools could be arranged by the developers.

To create the main architecture of the site, HTML was employed. As this programming language defines the appearance of web content and helps to place various information pieces on the pages, it was useful in developing menu items, their prices, and the state of availability among other elements. To ensure the readability and proper presentation of data in case the user opens the site on mobile devices, CSS was used for styling layout elements.

JavaScript played the key role in creating interactive features. Using it, the developers added capabilities to perform various actions such as adding, editing, and deleting menu items as well as changing their state and showing relevant information in real time.

The system relies on browser-based local storage to serve as an easy-to-use mechanism for data handling. This makes it possible to operate without an external database server and store all menu data, its categories, and settings right on the user’s computer. This way, system complexity is greatly reduced, ensuring high performance.

One of the key algorithms used in the system is the menu rendering algorithm which helps to show menu items to the customers. With this algorithm, data stored on local storage gets retrieved and organized by categories prior to display to provide customers with access to their dishes and information about them.

CRUD is another important algorithm which is used by the seller in the admin panel to perform the following tasks:

  - Create new menu items
  - Read and display menu items that already exist
  - Update item specifications such as prices and availability
  - Delete those menu items that are not needed anymore

CRUD is very necessary for keeping a current menu.

Another algorithm developed within this project is the availability toggle algorithm which helps switch the status of any selected menu item between “Available” and “Sold Out.” As a result, customers can be promptly informed whether a certain dish is available or not.

Data synchronization also takes place when using the system to synchronize customer data with those from the admin panel. Such synchronization is provided using some JavaScript functions.


## Methodology

The development of the Digital Menu Platform will be assisted with the use of Figma Make to generate the necessary code to fulfill the requirements of the program. The LLM was initially prompted to generate a layout of the program featuring essential front-end elements such as the listing of each individual dish along with their respective names, descriptions, prices, and availability status. Once the initial front-end requirements are satisfied, the generation of the program’s back-end will follow. More specifically, an admin panel will be created to allow the business owners to manage their list of products, categories, customer orders, and other information about the business. Through this, full functionality within the program will be achieved.
The program will utilize an HTML5 structure serving as a container for CSS styling to keep the interface both responsive and aesthetically sound. The primary logic will be written in JavaScript to further preserve simplicity within the code and to keep the program itself lightweight. Data management will be handled through the browser’s internal storage which will allow for the saving and updating of menu items, categories, and business information without needing a separate database server. Through this, all data operations will be managed, ensuring that the customer menu and the admin dashboard are always synchronized. 
Testing will be done through a series of practical checks which will first involve confirmation that adding, editing, and deleting items are functioning correctly and saved permanently. This will be followed by security testing which ensures that the admin panel is protected and only allows entry for someone with the valid credentials. All other features will then be tested such as managing customers and their order statuses, product categories, and other information about the business. Through this testing process, the functionality of the program will be verified and would allow for any necessary debugging opportunities for further improvement until all objectives are satisfied.


## Testing and Evaluation of Results

### Results and Discussions
The customer view of the digital menu platform mainly features a list of all available products along with their respective names, descriptions, prices, and availability status. Said products are divided into categories set by the administrator including a daily special category, as indicated by a star symbol. Although buttons for business contact methods such as messaging or calling are available, these are not functional and only serve as placeholders. The business name and description along with the current date is also displayed at the upper part of the screen. Additionally, the admin button used to access the admin page is placed at the upper right corner of the screen. 

Interacting with the admin button takes the user to the admin login page where they are prompted to enter the admin password. For testing purposes, the actual password is displayed on the page.

The admin panel features four main tabs: menu items, categories, orders, and settings. The menu items tab features functions to manage the items displayed on the customer view through adding, deleting, and editing such. Moreover, an availability status button is set for each item, allowing the administrator to toggle between “available” and “sold out” statuses for said items. Likewise with the customer view, each item on the menu items tab displays their respective information and category. 

Adding a new menu item using the Add Item button allows the administrator to input its name, description, price, category, and image URL. Toggle switches for availability and daily special status are also available. Once the settings are saved, changes would be reflected in both the admin panel and customer view in real-time. 

The categories tab in the admin panel shows every category set by the administrator including buttons to add, edit, and delete them. Adding a new category prompts the admin to input the category name along with the display order which dictates which categories appear first in the customer view.

The administrator may also view and manage customer orders in the orders tab which displays a list of customers that have placed orders. In the list view, the summary of each customer’s order such as their name, contact number, total price, and order date/time is displayed. In addition to this, order statuses are also shown which can be filtered through the drop down menu. Viewing the detailed summary of an order shows all ordered items as well as personal notes from the customer. Furthermore, the total number of orders, pending orders, and revenue for the day is also displayed on the upper part of the screen.

The settings tab includes options for the administrator to change certain information about the business, more specifically the business name, tagline, and contact information, which would all be displayed in the customer view. This tab also includes security settings, allowing the administrator to change the admin password if needed. Likewise, such a change will be reflected and make the necessary updates.

The discussed results show full functionality of the program and successfully addresses the objectives of providing a simple and straightforward interface for both the customer and administrator. Furthermore, the program functions as intended on mobile devices in terms of aesthetics and performance given that it is written in JavaScript and HTML. Through the digital menu platform, customers are able to view available items and place orders instead of making repetitive inquiries that only hinder efficiency on the business owner’s end. Moreover, this makes it more convenient for customers and the administrator to access important information all in one place with minimal effort in navigation within the program. 


### Conclusion
The development of the Digital Menu Platform successfully achieved the primary objective of providing local food vendors with a centralized, efficient, and mobile-compatible system for menu management. By integrating a dynamic interface for customers and an admin page, the need for repetitive inquiries through social media is eliminated. Through the platform, customers may independently access real-time information on product availability, pricing, and daily specials all while being able to be updated by the administrator with minimal effort. 
Having been developed with an HTML and JavaScript architecture, the program ensures optimized performance while preserving aesthetic quality on low-end devices which addresses the objective of inclusivity for users with varying hardware. Administrative features such as being able to manage menu items, categories, availability, along with an order tracking system, provide a significant improvement to operation efficiency for the sellers. Through the automated updating of information and other essential business data, sellers may redirect their focus from administrative tasks to the betterment of product preparation and service quality.
The developed program successfully bridges the communication gap between local MSMEs and their respective customers. The discussed results demonstrated a fully functional platform that makes the ordering process and organization of business information more convenient. Through this, small-scale vendors are provided with a professional and scalable tool to manage their daily operations more effectively and efficiently.


## References

Codecademy. (n.d.-b). What is CRUD? Explained. Codecademy. 
https://www.codecademy.com/article/what-is-crud-explained
W3Schools.com. (n.d.). https://www.w3schools.com/howto/howto_js_toggle_password.asp
W3Schools.com. (n.d.-b). https://www.w3schools.com/howto/howto_js_treeview.asp


## Project Deliverables

Check off each item as you complete it:

- [/] **Project Documentation** — this README or uploaded document following the format above
- [/] **App Design** — Figma link submitted on Canvas
- [/] **Source Code** — all HTML, CSS, JS, and assets in `src/`
- [/] **Video Walkthrough** — max 5 minutes, link below
- [/] **Peer Grade** — individual submission on Canvas

## Video Walkthrough

Paste your video link here:
https://drive.google.com/file/d/1B0lNCZGdZAu0ik566AXr3lH2DtNJcKDa/view?usp=sharing

Your walkthrough should demonstrate your website's key features and functionality. Max 5 minutes. There will be no presentation — your video should be clear enough that any student taking this course can understand your project.

## How to Run

Provide step-by-step instructions so that anyone who downloads this repository can run your website:

```
Customer Guide
1. Accessing the website
Open any web browser on your smartphone.
Enter the website link provided by the seller.
The homepage will load automatically.

2. Viewing the menu
List of available food items
Prices
Description (if available)
Availability status (Available / Sold Out)
Scroll down to browse all menu items.

3. Checking availability
“Available” – item can be ordered
“Sold Out” – item is no longer available

4. Contacting the seller
Scroll to the contact section.
Click the message or call button to contact the seller via:
Facebook Messenger
Phone number (if provided)


Manager Guide
1. Accessing the admin panel
  Click the Admin button located on the website.
  You will be redirected to the login page.
  Enter the admin password to proceed.

2. Managing menu items
  Adding a new item
    Go to the Menu Items tab.
    Click “Add Item”.
    Enter:
    Item name
    Description
    Price
    Category
    Image URL (optional)
    Toggle availability if needed.
    Click Save.

  Editing an item
    Locate the item in the list.
    Click Edit.
    Update the necessary details.
    Save changes.

  Deleting an item
    Click the Delete button beside the item.
    Confirm deletion.


3. Updating availability
  Use the toggle switch beside each item:
    ON → Available
    OFF → Sold Out


4. Changes will automatically reflect on the customer view.
  Managing Categories
  Go to the Categories Tab.
  Add new categories by clicking Add Category.
  Edit or delete existing categories as needed.
  Arrange display order for better organization.


5. Managing Orders
  Open the Orders Tab.
  View list of customer orders.
  Click an order to see details:
  Customer name
  Items ordered
  Total price
  Update order status using the dropdown menu.

6. Settings Management
  Go to the Settings Tab.
  Update:
    Business name
    Tagline
    Contact information
    Change admin password if needed.

7. Data Storage
  All data is saved using browser storage.
  Ensure you do not clear browser data to avoid losing information.

```

## Project Structure

```
├── src/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── storage.js
│   │   └── components.js
│   │   └── app.js
│   ├── assets/
│   │   └── (images, fonts, etc.)
│   └── ...
├── docs/
│   └── (documentation files, if separate from README)
└── README.md
```

## Submission Notes

- All source code must be committed and pushed before the deadline (**April 9, 2359**).
- Do **not** upload generated or binary files.
- Keep your repository organized — use folders as shown above.
- All team members should contribute commits.
