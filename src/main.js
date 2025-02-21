async function getAllProducts() {
    return await fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.log(err))
}

async function getLimitedProducts(count = 4) {
    return await fetch(`https://fakestoreapi.com/products?limit=${count}`)
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.log(err))
}
async function getIdProduct(id) {
    return await fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.log(err))
    
}

const mobileMenuContainer = document.getElementById("mobile-menu")
const headerSlider = document.getElementById("header-slider")
let sliderContainer;
const root = document.getElementById("root")
const CART = JSON.parse(localStorage.getItem("cart")) ?? []

let lastSlideElement;
let count = 0

let sliderInterval;

const slides = [
    {
        id: 1,
        title: "برای سوپرایز آماده شودی",
        img: "gholaam.webp",
        bg: "rgb(255, 255, 97)"

    },
    {
        id: 2,
        title: "مد برای هر زمان",
        img: "javad.webp",
        bg: "rgb(124, 218, 255)"
    },
    {
        id: 3,
        title: "مد برای هر مکان",
        img: "javad.webp",
        bg: "rgb(171, 245, 193)"
    }
]



function renderSlider(items) {
    let template = `
            <div id="slide" class=" w-full h-full  inline-block  absolute top-0 left-0">
                <img class="w-[200px] sm:w-[350px] absolute bottom-0 duration-1000 left-[-15.5rem]" src="./public/images/images/${items[count].img}" width="500" />

                <span class="absolute duration-1000 top-1/2 right-[-15.5rem] max-w-80">
                ${items[count].title}
                </span>

                <div id="dots" class="flex w-max justify-between items-center absolute bottom-6 right-8 ">
                    <div id="dot0"  class="w-1 p-1 cursor-pointer rounded-full bg-black border-4  "></div>
                    <div id="dot1"  class="w-1 p-1 cursor-pointer rounded-full bg-black border-4 "></div>
                    <div id="dot2"  class="w-1 p-1 cursor-pointer rounded-full bg-black border-4 "></div>


                
               </div>


            </div>
        `




    sliderContainer.innerHTML = template

    sliderContainer.style.backgroundColor = items[count].bg

    document.getElementById(`dot${count}`).classList.add("border-red-400")
    document.getElementById("dot0").addEventListener("click", dotClick)
    document.getElementById("dot1").addEventListener("click", dotClick)
    document.getElementById("dot2").addEventListener("click", dotClick)
    document.getElementById("slide").addEventListener("click", NextPrev)







    setTimeout(() => {
        document.querySelector("#slide > img").classList.remove("left-[-15.5rem]")
        document.querySelector("#slide > span").classList.remove("right-[-15.5rem]")


        document.querySelector("#slide > img").classList.add("left-[1.5rem]")
        document.querySelector("#slide > span").classList.add("right-[2.5rem]")
    }, 100)

}
function dotClick(evt) {
    evt.stopPropagation()
    let getId = evt.target.id
    count = Number(getId[3])
    renderSlider(slides)

    clearInterval(sliderInterval);

    sliderInterval = setInterval(() => {
        document.getElementById("slide").remove


        if (count === 2)
            count = 0
        else
            count++

        renderSlider(slides)
    }, 5000)

}
async function renderCart() {
    root.innerHTML=`

<div role="status" class="mx-auto mt-36 w-32">
    <svg aria-hidden="true" class="w-32  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>

`
    const cartData = []
    for (const cartItem of CART) {
        const result = await getIdProduct(cartItem.id);
        cartData.push(result)
    }
    if(cartData.length===0)
        root.innerHTML=`<div class="flex flex-col gap-5 mb-44 items-center sm:mt-0 mt-52 w-full">
        <div class="w-max  mt-16 ">سبد شما خالیست</div>
        <div onclick="emptyCart()" class="w-max py-3.5 px-4 bg-blue-400 rounded-4xl hover:bg-gray-600 duration-200 cursor-pointer">بازگشت</div>
        

    </div>`
        else{

    const template = cartData.map((item) => {

        return `
        <div class="border flex flex-col gap-3 items-center ">
            <h3 class="max-h-7 overflow-hidden">${item.title}</h3>
            <img class="object-contain w-full h-96" src='${item.image}' width="200" />
            <h4>تعداد خرید: ${CART.find(cartItem=> cartItem.id===item.id).quantity} </h4>
            <div onclick='removeFromCart(${item.id})' class="w-max cursor-pointer rounded-lg bg-red-500 py-2 px-3" > حذف از سبد خرید</div>

        </div>
        `
    }).join("");
    const container = `<div class="grid grid-cols-1 sm:grid-cols-4 mx-auto w-full gap-6 mt-[110px] sm:mt-0 py-5 px-4 ">${template}

     </div>`


    root.innerHTML = container
}
}
function emptyCart(){
    history.back()
}
function removeFromCart(pId) {
    
    const foundIndex = CART.findIndex(item => item.id === pId)
    CART.splice(foundIndex, 1);
    localStorage.setItem("cart", JSON.stringify(CART))
    if(location.pathname.split("/").at(-1)=== 'cart')
        renderCart()
    else 
        renderSingleProduct();

        
}

const addToCart = (pId) => {
    CART.push({id: pId,quantity: +(document.getElementById("quantityInput").value) });
    localStorage.setItem("cart", JSON.stringify(CART))
    renderSingleProduct();
    console.log(CART)
}

function renderProductCard({ id, price, image, title }) {

    // const { price, image, title } = product

    const isLowPrice = price < 100;

    const template = `
    <a onclick="handleAClick(event, 'product/${id}')" href='product/${id}' class="w-full border rounded-xl overflow-hidden shadow-2xl relative">
    <img class="object-contain rounded-xl w-full h-96" src="${image}" alt="">
    <div class="p-2">
        <h4>${title}</h4>
        <span>${price}$</span>
    </div>

    ${isLowPrice ? (`
            <div class="text-white absolute top-2 right-2 w-max cursor-default rounded-full bg-red-500 px-2 py-1">
                فروش ویژه
            </div>
        `) : ""}
    <div class="absolute p-2 rounded-full cursor-pointer top-2 left-2 bg-white shadow-xl hover:bg-red-500">
        <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    </div>
</a>
    `

    return template
}

async function renderMainPage() {
    root.innerHTML=`

<div role="status" class="mx-auto mt-36 w-32">
    <svg aria-hidden="true" class="w-32  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>

`
    const products = await getLimitedProducts(4)

    const template = products.map(product => {
        return renderProductCard(product)
    }).join("")

    const container = `
    <div id="slider" class="overflow-hidden  duration-1000 relative h-[50vh] md:h-[480px] w-full whitespace-nowrap">
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 sm:p-0">
        ${template}
    </div>
    <div class="flex justify-center mt-10 mb-16">
        <a onclick="handleAClick(event, 'all-products')" class="bg-blue-400 rounded-md px-4 py-2 text-white" href='all-products'>نمایش همه محصولات</a>
    </div>
    `

    root.innerHTML = container;

    sliderContainer = document.getElementById("slider")

    renderSlider(slides);

    sliderInterval = setInterval(() => {
        document.getElementById("slide").remove

        if (count === 2)
            count = 0
        else
            count++

        renderSlider(slides)
    }, 5000)
    root.classList.remove("flex", "gap-[20px]" ,"sm:w-full","sm:items-center","flex-col","sm:flex-row","items-center")


}

renderMainPage()

function handleAClick(evt, link) {
    evt.preventDefault();

    history.pushState({}, "", `${link}`);

    router();
}
async function renderSingleProduct(){
    root.innerHTML=`<a   class="w-80  block  rounded-xl border border-black animate-pulse relative mt-[110px] sm:mt-0">
        <img class=" rounded-xl w-full h-96 bg-gray-200  animate-pulse" src="" alt="">
        <div class="p-2">
            <h4 class="bg-gray-200 animate-pulse w-[60px] h-9"></h4>
            <span class="bg-gray-200 animate-pulse w-[60px] h-9"> </span>
        </div>
    
        
            
            
        
    </a>
    <div class="sm:w-1/3 w-4/5 h-max  sm:h-[400px] flex flex-col justify-between sm:items-start items-center gap-5 sm:gap-0  ">
        <h4 class="w-[300px] h-[400px] bg-gray-200 animate-pulse"></h4>
        
        
        
        
    </div >
    `

    clearInterval(sliderInterval)
    root.classList.add("flex", "gap-[20px]" ,"sm:w-full","sm:items-center","flex-col","sm:flex-row","items-center")
    const {title,image,price,description,id} = await getIdProduct(Number(location.pathname.split("/").at(-1))) 
    const isLowPrice = price < 100
    const template = `<a   class="w-80 shadow-2xl block border rounded-xl overflow-hidden relative mt-[110px] sm:mt-0">
        <img class="object-contain rounded-xl w-full h-96" src="${image}" alt="">
        <div class="p-2">
            <h4>${title}</h4>
            <span>${price}$</span>
        </div>
    
        
        ${isLowPrice ? (`
            <div class="text-white  absolute top-2 right-2 w-max cursor-default rounded-full bg-red-500 px-2 py-1">
                فروش ویژه
            </div>
        `) : ""}
            
        
    </a>
    <div class="sm:w-1/3 w-4/5 h-max  sm:h-[400px] flex mb-7 flex-col justify-between sm:items-start items-center gap-5 sm:gap-0  ">
        <h4>${description}</h4>
        <div class="w-max flex gap-3">
            <input class="inline w-14 border rounded-xl " id="quantityInput" type="number" min="1"/>
            ${CART.find(cartItem => cartItem.id===id) ? (
                `
                <div onclick='removeFromCart(${id})' class="w-max cursor-pointer rounded-lg duration-150 bg-red-500 hover:bg-gray-300 py-2 px-3" > حذف از سبد خرید</div>
                `
            ) : (`<div onclick='addToCart(${id})' class="w-max cursor-pointer rounded-lg duration-150 bg-blue-500 hover:bg-gray-300 py-2 px-3" > اضافه کردن به سبد خرید</div>`)
            }
            <a class="border  py-2 px-8 hover:text-white hover:bg-gray-800 rounded-xl duration-200" onclick="handleAClick(event, 'cart')" href='cart'>سبد خرید</a>
    
        </div>
        
        
        
    </div >
    <div class="flex flex-col gap-5 mb-16 items-center w-full sm:absolute sm:w-max top-[365px] left-[20px] ">
        
        <div onclick="emptyCart()" class="w-max py-3.5 px-4 bg-blue-400 rounded-4xl hover:bg-gray-600 duration-200 cursor-pointer">بازگشت</div>
        

    </div>
    


    
    `
        root.innerHTML=template
        document.getElementById("quantityInput").value=1

}

async function renderAllProducts() {

    const result = await getAllProducts()

    const template = result.map(product => {
        return renderProductCard(product);
    }).join("");

    const container = `
    <div class="grid sm:grid-cols-4 grid-cols-1 gap-2 p-3 sm:p-6 mt-[110px] sm:mt-0 mb-20 ">
        ${template}
    </div>
    `

    root.innerHTML = container;
}


function NextPrev(evt) {
    console.log(evt.clientX)
    if (evt.clientX < 1349 / 2) {
        if (count === 0)
            count = 2

        else
            count--

    }
    else {
        if (count === 2)
            count = 0

        else
            count++

    }
    clearInterval(sliderInterval)
    sliderInterval =setInterval(() => {
        document.getElementById("slide").remove

        if (count === 2)
            count = 0
        else
            count++

        renderSlider(slides)
    }, 5000)

    renderSlider(slides)
}


function toggleMobileMenu() {
    mobileMenuContainer.classList.toggle("!hidden")
}  



headerSlider.scrollLeft = headerSlider.scrollWidth

function animateHeaderSlider() {
    if (headerSlider.scrollLeft >= (headerSlider.scrollWidth / 2) * -1)
        headerSlider.scrollLeft = (headerSlider.scrollWidth * -1);
    else
        headerSlider.scrollLeft += 1
}

setInterval(animateHeaderSlider, 20);

function router() {
    let currentAddress = location.pathname;
    currentAddress = currentAddress.split('/').at(-1)

    switch (true) {
        case currentAddress === 'all-products':
            renderAllProducts()
            break;
        case currentAddress === 'index.html':
            renderMainPage();
            break;
        case (location.pathname.match(/[/]src[/]product[/][0-9]{1,}/) !== null):
            renderSingleProduct();
            break;
        case currentAddress === 'cart':
            renderCart();
            break;
        default:
            break;
    }


}
window.addEventListener("popstate", router)