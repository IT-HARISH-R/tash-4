const balance = document.getElementById('balance');
const inc_amt = document.getElementById('inc-amt');
const exp_amt = document.getElementById('exp-amt');
const trans = document.getElementById("trans");
const form = document.getElementById('form');
const decription = document.getElementById('desc');
const amount = document.getElementById('amount');
const amount_type = document.getElementById('amount-type');
const submit = document.getElementById('submit');




const localStorageTrans = JSON.parse(localStorage.getItem("trans"));

let transaction = localStorage.getItem('trans')!== null ? 
localStorageTrans:[];


function transremo(id){
    const confam = confirm("Are you sure ");
    if(confam){
        transaction= transaction.filter((transaction)=> transaction.id != id);
    }
    else{
        return
    }
    config();
    updateLocalStorage();
}

function displayTrans(transData){

    if(transData.amouni_type == 'Income'){
        const newli = trans.appendChild(document.createElement('li'));
        newli.innerHTML = `<li class="exp flex justify-between px-8 max-w-[300px] shadow-lg bg-slate-100 border-l-8 md:py-4 rounded-lg border-l-green-500 md:mx-auto
         my-2 md:m-8">${transData.des}<Span>${transData.amount}</Span>
         <button onClick="transremo(${transData.id})" ><i class="fa-solid fa-trash-can"></i></button> </li>`
    }else{
        const newli = trans.appendChild(document.createElement('li'));
        newli.innerHTML = `<li class="exp flex justify-between px-8 max-w-[300px] shadow-lg bg-slate-100 border-l-8 md:py-4 rounded-lg border-l-red-500 md:mx-auto 
         my-2 md:m-8">${transData.des}<Span>${transData.amount}</Span>
        <button onClick="transremo(${transData.id})"><i class="fa-solid fa-trash-can"></i></button> </li>`
        }
}

function config(){
    trans.innerHTML= "";
    transaction.forEach((index)=>{
        displayTrans(index)
    })
    updateamount();
}

function updateamount(){
    let totalamount = 0;
    let totalIncome = 0;
    let totalExpense = 0;
    transaction.forEach((val)=>{
        if(val.amouni_type == 'Income'){
            totalamount += val.amount;
            totalIncome += val.amount;
        }
        else{
            totalamount -= val.amount;
            totalExpense += val.amount;
        }
    })

    balance.textContent = `₹ ${totalamount.toFixed(2)}`;
    inc_amt.textContent = `₹ ${totalIncome.toFixed(2)}`;
    exp_amt.textContent = `₹ ${totalExpense.toFixed(2)}`;
}

submit.addEventListener('click',(e)=>{
    e.preventDefault();
    if(decription.value.trim() == '' || amount.value.trim() == ''|| amount_type.value.trim() == ""){
        alert('Please Enter Descriptions Andd Amount');
    }else{
        let idin = transaction.length+1;
        const newTransaction = {
            id: idin,
            des: decription.value,
            amouni_type: amount_type.value,
            amount: +amount.value
        }
        decription.value ="";
        amount.value ="";
        amount_type.value="";
        transaction.push(newTransaction);
        config();
        updateLocalStorage();
    }

})

window.addEventListener('load', ()=>{
    config();
})

function updateLocalStorage(){
    localStorage.setItem("trans", JSON.stringify(transaction));
}