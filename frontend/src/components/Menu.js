import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Menu({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const restaurant = location.state?.restaurant;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (item) => {
    const existing = cart.find((x) => x.name === item.name);
    let newCart;
    if (existing) {
      newCart = cart.map((x) =>
        x.name === item.name ? { ...x, qty: x.qty + 1 } : x
      );
    } else {
      newCart = [...cart, { ...item, qty: 1 }];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (item) => {
    const newCart = cart
      .map((x) => (x.name === item.name ? { ...x, qty: x.qty - 1 } : x))
      .filter((x) => x.qty > 0);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((acc, x) => acc + x.price * x.qty, 0);

  const handleCheckout = () => {
    if (!user) {
      alert("Please login or register to proceed to checkout.");
      navigate("/login");
      return;
    }
    navigate("/cart");
  };

  // ✅ Menu with working Unsplash food images for all 12 restaurants
  const allMenus = {
    "Spice Nation": [
      { name: "Butter Chicken", price: 260, img: "https://masalaandchai.com/wp-content/uploads/2022/03/Butter-Chicken.jpg" },
      { name: "Paneer Tikka", price: 220, img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80" },
      { name: "Chicken Biryani", price: 280, img: "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg" },
      { name: "Dal Makhani", price: 180, img: "https://www.sharmispassions.com/wp-content/uploads/2012/05/dal-makhani7.jpg" },
      { name: "Tandoori Roti", price: 25, img: "https://www.yummyfoodrecipes.com/resources/picture/org/Tandoori-Roti.jpg" },
      { name: "Mutton Rogan Josh", price: 350, img: "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Mutton-Roganjosh-1300x867.jpg?v=1620401698" },
      { name: "Veg Pulao", price: 150, img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFPjIluL4H7E7Qznz6kq0DziLeDpnSg0RqM_0J-3nemYyxHbWSK0EaaAZ70NBiy1kLAFy5ZCxgBfCpETdfnL2oSqhS88KOdNTexX9Me5y1xKbFCU0D0DocySLaCPdiP1eXT7dvEWHXstDA/s1600/vegetable+pulao.JPG" },
      { name: "Aloo Gobi", price: 160, img: "https://pipingpotcurry.com/wp-content/uploads/2024/08/Aloo-Gobi-Piping-Pot-Curry.jpg" },
      { name: "Gulab Jamun", price: 90, img: "https://www.cadburydessertscorner.com/hs-fs/hubfs/dc-website-2022/articles/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know.webp?width=1152&height=648&name=soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know.webp" },
      { name: "Masala Papad", price: 70, img: "https://www.flavourstreat.com/wp-content/uploads/2022/05/masala-papad-001.jpg" },
    ],
    "Madras Curry House": [
      { name: "Masala Dosa", price: 180, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rameshwaram_Cafe_Dosa.jpg/500px-Rameshwaram_Cafe_Dosa.jpg" },
      { name: "Idli Sambhar", price: 140, img: "https://static.toiimg.com/thumb/msid-113810989,imgsize-54604,width-400,resizemode-4/113810989.jpg" },
      { name: "Vada", price: 120, img: "https://bonmasala.com/wp-content/uploads/2022/12/medu-vada-recipe.webp" },
      { name: "Curd Rice", price: 160, img: "https://palatesdesire.com/wp-content/uploads/2022/04/curd-rice-recipe-image@palates-desire.jpg" },
      { name: "Lemon Rice", price: 150, img: "https://minimalistbaker.com/wp-content/uploads/2023/05/Greek-Lemon-Rice-6-1024x1536.jpg" },
      { name: "Onion Uttapam", price: 170, img: "https://www.padhuskitchen.com/wp-content/uploads/2013/01/onion-uthappam.jpg" },
      { name: "Filter Coffee", price: 100, img: "https://truesouth.in/cdn/shop/files/southindian1_medium.jpg?v=1707477021" },
      { name: "Rasam", price: 130, img: "https://www.whiskaffair.com/wp-content/uploads/2020/06/Rasam-2-1.jpg" },
      { name: "Payasam", price: 120, img: "https://images.herzindagi.info/image/2023/Sep/payasam-recipe-ganesh-chaturthi.jpg" },
      { name: "Pesarattu", price: 160, img: "https://mildlyindian.com/wp-content/uploads/2019/05/pesarattu-dosa.jpg" },
    ],
    "Royal Biryani Palace": [
      { name: "Hyderabadi Chicken Biryani", price: 300, img: "https://i0.wp.com/swatisani.net/kitchen/wp-content/uploads/2015/10/IMG_9526.jpg?w=942&ssl=1" },
      { name: "Mutton Biryani", price: 360, img: "https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg" },
      { name: "Veg Dum Biryani", price: 250, img: "https://www.jeyashriskitchen.com/wp-content/uploads/2016/01/hyderabadi-dum-biryani.jpg" },
      { name: "Egg Biryani", price: 270, img: "https://spicecravings.com/wp-content/uploads/2020/10/Egg-Biryani-3.jpg" },
      { name: "Raita", price: 60, img: "https://www.whiskaffair.com/wp-content/uploads/2020/12/Boondi-Raita-2-1.jpg" },
      { name: "Mirchi Ka Salan", price: 80, img: "https://www.cookclickndevour.com/wp-content/uploads/2015/08/mirchi-ka-salan-recipe-a.jpg" },
      { name: "Kebabs", price: 240, img: "https://www.licious.in/blog/wp-content/uploads/2022/09/Shutterstock_1033917202.jpg" },
      { name: "Double Ka Meetha", price: 150, img: "https://www.whiskaffair.com/wp-content/uploads/2018/08/Double-ka-Meetha-2-1.jpg" },
      { name: "Phirni", price: 120, img: "https://www.whiskaffair.com/wp-content/uploads/2020/07/Phirni-2-1.jpg" },
      { name: "Tandoori Chicken", price: 280, img: "https://www.allrecipes.com/thmb/vajnGE6AAPOlbkBurGXML7ptfqM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/50347-indian-tandoori-chicken-DDMFS-4x3-3035-205e98c80b2f4275b5bd010c396d9149.jpg" },
    ],
    "Punjabi Rasoi": [
      { name: "Sarson Da Saag", price: 200, img: "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Sarson-Ka-saag-new-recipe-1300x731.jpg?v=1619450720" },
      { name: "Makki Di Roti", price: 80, img: "https://sinfullyspicy.com/wp-content/uploads/2025/01/3.jpg" },
      { name: "Chole Bhature", price: 180, img: "https://amritsr.com/wp-content/uploads/2021/04/cholle-bhature.jpeg" },
      { name: "Rajma Chawal", price: 170, img: "https://images.squarespace-cdn.com/content/v1/5ea3b22556f3d073f3d9cae4/e37ea0ac-2f37-4df2-8e1e-3678f2f80fee/IMG_0856.jpg?format=1500w" },
      { name: "Lassi", price: 90, img: "https://themagicsaucepan.com/wp-content/uploads/2018/05/20180511-salt-lassi-0061.jpg" },
      { name: "Amritsari Kulcha", price: 150, img: "https://b.zmtcdn.com/data/reviews_photos/713/e40ebe8f3bb6c0f6a1e8543431446713_1647959306.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*" },
      { name: "Paneer Butter Masala", price: 220, img: "https://sandhyahariharan.co.uk/wp-content/uploads/2022/07/paneer-butter-masala.jpg" },
      { name: "Gajar Ka Halwa", price: 100, img: "https://i0.wp.com/kalimirchbysmita.com/wp-content/uploads/2016/01/Gajar-ka-Halwa-03.jpg?w=1024&ssl=1" },
      { name: "Aloo Paratha", price: 120, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg/500px-Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg" },
      { name: "Butter Naan", price: 50, img: "https://foodess.com/wp-content/uploads/2023/02/Butter-Naan-2.jpg" },
    ],
    "Taste of Gujarat": [
      { name: "Gujarati Thali", price: 300, img: "https://www.gujaratexpert.com/blog/wp-content/uploads/2024/01/Gujarati-Thali.jpg" },
      { name: "Thepla", price: 80, img: "https://www.indubenkhakhrawala.com/wp-content/uploads/2025/04/Gujarati-Methi-Thepla-Made-By-Induben-Khakhrawala.jpg" },
      { name: "Dhokla", price: 100, img: "https://maayeka.com/wp-content/uploads/2011/11/sooji-ka-dhokla-instant-recipe-1-of-1.jpg.webp" },
      { name: "Fafda Jalebi", price: 120, img: "https://tastespread.com/wp-content/uploads/2023/10/Jalebi-Fafda.jpg" },
      { name: "Undhiyu", price: 200, img: "https://i0.wp.com/pistachiodoughnut.com/wp-content/uploads/2021/01/IMG_3429_jpg.jpg?resize=800%2C840&ssl=1" },
      { name: "Khandvi", price: 110, img: "https://www.reciperasoi.com/wp-content/uploads/2021/03/Gujarati-Khandvi-Recipe.jpg" },
      { name: "Sev Tameta", price: 160, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxE065IWEKWzKBNbx5bcRDfqRbz9W_SEzjQ&s" },
      { name: "Handvo", price: 150, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5kXOzWa06Su7zH5hk4Q25bGLGXHkkIwZBtA&s" },
      { name: "Basundi", price: 130, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyvZBj7eJAPY8eRpmq3757jL9dCpC0prFbA&s" },
      { name: "Rotli Shaak", price: 140, img: "https://img-global.cpcdn.com/recipes/ef71c3dcae6f2924/680x781f0.501696_0.5_1.0q80/mini-kathiyawadi-meal-bharela-ravayaringana-bateta-nu-shaak-fulka-rotli-recipe-main-photo.jpg" },
    ],
    "Coastal Catch": [
      { name: "Fish Curry Rice", price: 260, img: "https://i0.wp.com/shanazrafiq.com/~shanazra/wp-content/uploads/2016/10/06-DSC_0298-1024x681.jpg?resize=1024%2C681&ssl=1" },
      { name: "Prawn Masala", price: 280, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0Z0p1dWKj_Ltu3e_kEqMHAGy7HalMdX8oQ&s" },
      { name: "Crab Curry", price: 350, img: "https://www.thespruceeats.com/thmb/eT_O8K_uwBfjQy3S_a9wvUOL0GY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/indian-crab-curry-1957735-hero-01-74d33f0b5657459b853a6e8bed66e90f.jpg" },
      { name: "Tandoori Pomfret", price: 320, img: "https://www.foodandwine.com/thmb/rggaJ1ELW6bF4rPgA_-fLejhfNo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Maneet-Chauhan-Diwali-Celebration-Tandoori-Pomfret-FT-BLOG1022-2000-f78e70a420a242e2bcd471fccf067614.jpg" },
      { name: "Squid Fry", price: 300, img: "https://www.licious.in/blog/wp-content/uploads/2022/11/D328F183-17EE-4D89-A6B3-EAF43D2A3BBF.jpeg" },
      { name: "Coconut Rice", price: 180, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxIR4zKt34qadKq0N2QQe2FfRVasyN8Stkg&s" },
      { name: "Konkani Fish Thali", price: 400, img: "https://b.zmtcdn.com/data/dish_photos/77b/5fce555dd9c26714d32aaaaa13c8f77b.jpg" },
      { name: "Solkadhi", price: 100, img: "https://www.vegrecipesofindia.com/wp-content/uploads/2012/03/sol-kadhi-recipe-1.jpg" },
      { name: "Fish Fry", price: 280, img: "https://www.licious.in/blog/wp-content/uploads/2022/05/shutterstock_1116124928.jpg" },
      { name: "Neer Dosa", price: 130, img: "https://static.toiimg.com/thumb/53541904.cms?width=1200&height=900" },
    ],
    "Delhi Zaika": [
      { name: "Chicken Tikka Roll", price: 180, img: "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/sanjeev-kapoor/media/media_files/dwWZUDmNXyRf8Or1ejm0.JPG" },
      { name: "Seekh Kebab", price: 200, img: "https://c.ndtvimg.com/2020-01/a39okhfk_620_625x300_21_January_20.jpg" },
      { name: "Paneer Roll", price: 150, img: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_960,w_960//InstamartAssets/Receipes/potato_paneer_cheese_roll.webp" },
      { name: "Mutton Seekh", price: 220, img: "https://arysdeli.com/cdn/shop/files/Hot_SpicySeekhKebab_1800x1800.jpg?v=1705664360" },
      { name: "Butter Chicken", price: 260, img: "https://www.allrecipes.com/thmb/8L5gq8V7Kyl3qfoDe5vhCU_rvZI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-141169-Easy-Indian-Butter-Chicken-DDMFS-4x3-beauty-588ff54d1e0f4a0788906e851e27d540.jpg" },
      { name: "Chicken Korma", price: 270, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8uglWWEl8se3w_Aq3NyKshKVGQo574G2Q4g&s" },
      { name: "Aloo Tikki Chaat", price: 120, img: "https://www.whiskaffair.com/wp-content/uploads/2019/12/Aloo-Tikki-Chaat-2-3.jpg" },
      { name: "Samosa", price: 70, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFPP0wyCOQefudUz7vjo9QtLIXPz9BWoY_g&s" },
      { name: "Jalebi", price: 100, img: "https://images.slurrp.com/prod/recipe_images/better-butter/crispy-jalebi_50KFDO0XHO2I7S9X7VJ6.webp" },
      { name: "Chole Kulche", price: 180, img: "https://static.toiimg.com/photo/73514385.cms" },
    ],
    "Mumbai Tadka": [
      { name: "Vada Pav", price: 60, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPjqgA4mp3J-T5DBx6oucBYC5v_WligkX8w&s" },
      { name: "Pav Bhaji", price: 120, img: "https://bhojmasale.com/cdn/shop/articles/pav-bhaji-recipe-184466_1024x1024.webp?v=1739152943" },
      { name: "Misal Pav", price: 100, img: "https://imgmediagumlet.lbb.in/media/2021/03/605ae93c24c90e249ad9b93b_1616570684551.jpg" },
      { name: "Bombay Sandwich", price: 140, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/bombay-sandwich-recipe.jpg" },
      { name: "Pani Puri", price: 80, img: "https://cdn1.foodviva.com/static-content/food-images/snacks-recipes/pani-puri/pani-puri.jpg" },
      { name: "Sev Puri", price: 90, img: "https://nayakskitchen.com/wp-content/uploads/2021/02/20210218_111233-scaled.jpg?v=1613540727" },
      { name: "Dabeli", price: 110, img: "https://ministryofcurry.com/wp-content/uploads/2024/05/dabeli-5.jpg" },
      { name: "Falooda", price: 130, img: "https://www.chefkunalkapur.com/wp-content/uploads/2022/05/Rabri-Falooda-scaled.jpg?v=1651374892" },
      { name: "Kulfi", price: 120, img: "https://c.ndtvimg.com/2022-03/bt1hei5o_kulfi_625x300_14_March_22.jpg" },
      { name: "Bhel Puri", price: 100, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Indian_cuisine-Chaat-Bhelpuri-03.jpg/1200px-Indian_cuisine-Chaat-Bhelpuri-03.jpg" },
    ],
    "Bengal Flavors": [
      { name: "Fish Curry", price: 280, img: "https://www.licious.in/blog/wp-content/uploads/2022/03/shutterstock_1891229335-min-750x750.jpg" },
      { name: "Prawn Malai Curry", price: 320, img: "https://www.easycookingwithmolly.com/wp-content/uploads/2015/09/Chingri-Malai-Curry-1-480x360.jpg" },
      { name: "Chingri Macher Malai", price: 350, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWYalJvI4HRucroSqjaW39yLJTLQmicQxw2A&s" },
      { name: "Shorshe Ilish", price: 400, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT84hp9PszpbbMP1N9aYGBJ7zTDWF5jECyA3A&s" },
      { name: "Mishti Doi", price: 100, img: "https://www.vegrecipesofindia.com/wp-content/uploads/2018/02/bengali-mishti-doi-recipe-1.jpg" },
      { name: "Rasgulla", price: 90, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTseOTMOPjrpmrEfq-eCo7lw09-vpvMxRHrpg&s" },
      { name: "Kathi Roll", price: 150, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/02/chicken-kathi-roll-chicken-frankie.jpg" },
      { name: "Aloo Posto", price: 170, img: "https://kitchenofdebjani.com/wp-content/uploads/2022/10/Bengali-Aloo-Posto-Recipe-Debjanir-Rannaghar.jpg" },
      { name: "Luchi", price: 100, img: "https://notoutofthebox.in/wp-content/uploads/2015/09/lu1jpg.jpg" },
      { name: "Sandesh", price: 120, img: "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Sandesh-scaled.jpg?v=1619103410" },
    ],
    "Goan Treat": [
      { name: "Fish Curry Rice", price: 250, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNdUiEsgzpFOC3sBFCRZ6g4I1LsB1syGsGQQ&s" },
      { name: "Prawn Balchao", price: 280, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqjpthBK8Uao35cA-2PwQ_QhjFltkwBCn2JA&s" },
      { name: "Chicken Xacuti", price: 270, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm_ruxeFUvfB_9RklVvew9r0dqdM8_jixYCQ&s" },
      { name: "Goan Prawn Curry", price: 290, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7hztlnJlJZITXLyEULANNx-6zDLObBIQgmg&s" },
      { name: "Bebinca", price: 150, img: "https://www.nestleprofessional.in/sites/default/files/2025-02/Bebinca-756x471.jpg" },
      { name: "Sorpotel", price: 300, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSghdWF1SLD6HzRb_9NSbQN-Jlxi_I0QNslyg&s" },
      { name: "Vindaloo", price: 260, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT89KPy8X5OXUlaOW0Ka7mq1QoiBgcrifZcSQ&s" },
      { name: "Goan Fish Fry", price: 280, img: "https://kitchenfables.com/wp-content/uploads/2016/07/mackerel-fish-fry-with-goan-recheado-masala.1024x1024-1.png" },
      { name: "Rice Bhakri", price: 100, img: "https://www.seriouseats.com/thmb/PCieC2LU7_qRnE679QINj2zC7hU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2013__12__2012011220Indian20Unleavened20Rice20Bread-Bhakri-aa220a604f2f4e9a85643ab760830ed3.jpg" },
      { name: "Solkadhi", price: 120, img: "https://www.vegrecipesofindia.com/wp-content/uploads/2012/03/sol-kadhi-recipe-1.jpg" },
    ],
    "Rajasthan Royal": [
      { name: "Dal Baati Churma", price: 240, img: "https://www.sharmispassions.com/wp-content/uploads/2020/12/19729847952_b5cc81291a_o-500x480.jpg" },
      { name: "Gatte Ki Sabzi", price: 200, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW3vLxm2z3M5IgsExJ6xEKrWQSSc25hoP_MA&s" },
      { name: "Laal Maas", price: 300, img: "https://www.yummytummyaarthi.com/wp-content/uploads/2022/07/laal-maas-1.jpeg" },
      { name: "Ker Sangri", price: 180, img: "https://i.pinimg.com/736x/f5/6e/90/f56e90eec32e8e07563ead311d4f70c1.jpg" },
      { name: "Bajre Ki Roti", price: 100, img: "https://sunayanagupta.com/recipeimages/528X703/Bajre-ki-roti.jpg" },
      { name: "Mawa Kachori", price: 120, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO96QGmxN8QtKcorQ77cTLayDzIrbnneC1wQ&s" },
      { name: "Mirchi Vada", price: 110, img: "https://www.ndtv.com/cooks/images/rajasthani%20mirchi%20vada-620.jpg" },
      { name: "Kadhi", price: 150, img: "https://www.livingsmartandhealthy.com/wp-content/uploads/2024/06/Hyderabadi-Kadhi-Pakora2.jpg" },
      { name: "Pyaaz Kachori", price: 130, img: "https://www.samosasingh.com/wp-content/uploads/2024/02/allopyazkachori.jpg" },
      { name: "Rabri", price: 140, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/10/rabri-rabdi.jpg" },
    ],
    "South Spice Hub": [
      { name: "Chettinad Chicken", price: 270, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrlmH9BvoJn1pRKjYOoTvUZWuf43FfFFtLPQ&s" },
      { name: "Andhra Fish Curry", price: 300, img: "https://vismaifood.com/storage/app/uploads/public/464/268/b29/thumb__700_0_0_0_auto.jpg" },
      { name: "Idiyappam", price: 140, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsxTlPdErxPnEPI2TnxMZuiDlQU1D7jELmbA&s" },
      { name: "Malabar Parotta", price: 120, img: "https://www.tastycircle.com/wp-content/uploads/2014/06/kerala-parotta.jpg" },
      { name: "Kerala Sadya", price: 260, img: "https://www.sharmispassions.com/wp-content/uploads/2020/12/20564329779_b9af3e0191_o.jpg" },
      { name: "Puttu Kadala", price: 180, img: "https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2016/07/puttu-kadala-curry-recipe.jpg?w=1200&ssl=1" },
      { name: "Appam with Stew", price: 200, img: "https://www.keralatourism.org/_next/image/?url=http%3A%2F%2F127.0.0.1%2Fktadmin%2Fimg%2Fpages%2Fmobile%2FAppam_and_Chicken_Stew20131126121303_88_1.jpg&w=3840&q=75" },
      { name: "Banana Chips", price: 100, img: "https://buya1chips.com/cdn/shop/files/BananaChipsCrispThick_2ea31f8c-3345-4f45-bfd9-cbcfbd25e66c.jpg?crop=center&height=1200&v=1742532178&width=1200" },
      { name: "Payasam", price: 120, img: "https://traditionallymodernfood.com/wp-content/uploads/2015/08/semiya-payasam-vermicelli-kheer-18.jpeg" },
      { name: "Lemon Rice", price: 150, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe42yMh_atPbfBtlA1gjrxVGliddrDg1S1sA&s" },
    ],
  };

  const menuItems = allMenus[restaurant?.name] || [];

  return (
    <div
      className="py-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1508773431049-22bb79aa660c?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <h2 className="text-danger mb-4 fw-bold text-center">
          🍽 {restaurant?.name || "Menu"}
        </h2>

        <div className="row">
          {menuItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div
                className="card shadow-sm border-0 rounded-4 h-100"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="card-img-top rounded-top-4"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="fw-bold text-dark">{item.name}</h6>
                  <p className="text-muted mb-2">₹{item.price}</p>

                  {cart.find((x) => x.name === item.name) ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-outline-danger btn-sm mx-2"
                        onClick={() => removeFromCart(item)}
                      >
                        −
                      </button>
                      <span>{cart.find((x) => x.name === item.name)?.qty}</span>
                      <button
                        className="btn btn-outline-danger btn-sm mx-2"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm px-3 rounded-pill"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="text-center mt-4">
            <h5>Total: ₹{total}</h5>
            <button className="btn btn-danger px-4" onClick={handleCheckout}>
              🛍 Proceed to Cart ({cart.length})
            </button>
          </div>
        )}

        <div className="text-center mt-5">
          <button
            className="btn btn-outline-danger me-3"
            onClick={() => navigate("/restaurants")}
          >
            🔙 Back to Restaurants
          </button>
          <button
            className="btn btn-outline-secondary me-3"
            onClick={() => navigate("/")}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
