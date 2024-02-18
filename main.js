const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg"); 

for(let select of dropdown)
{
    for(currcode in countryList)
    {
        let option = document.createElement("option");
        option.innerText = currcode;
        option.value=currcode;
        if(select.name ==="from"&& currcode=="PKR")
        {
            option.selected = "selected";
        }
        else if(select.name==="To" && currcode=="USD")
        {
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change",(evt) =>
    {
        flag(evt.target);
    })
};

const  exchangevalue = async()=>
{
    let amount = document.querySelector(".amount input");
    let amountval = amount.value;
    if(amountval === ""|| amountval < 1)
    {
        amountval = 1;
        amount.value="1";
    }
    const baseurl = `${url}/${fromcurr.value .toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(baseurl);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    let finalamount = amountval*rate;

    msg.innerText=`${amountval} ${fromcurr.value} = ${finalamount} ${tocurr.value} `;
};


const flag =  (element) =>
{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newlink = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newlink;
};



btn.addEventListener("click", (evt) =>
{
    evt.preventDefault();
    exchangevalue();
});


window.addEventListener("load",() =>
{
    exchangevalue();
});
