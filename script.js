// Variable initialization
const myLable = document.querySelectorAll("label");
const myInputs = document.querySelectorAll(`input[type="text"]`);
const errorPara = document.querySelectorAll(".error-para");
const myButton = document.querySelector(".circle");

const myYears = document.getElementById("years");
const myMonths = document.getElementById("months");
const myDays = document.getElementById("days");

const date = new Date();
const currentYear = date.getFullYear().toString();
const day = date.getDate();
const month = date.getMonth() + 1;

myInputs.forEach((input, index) => {

    input.addEventListener("input", (e) => {
        e.preventDefault();
        input.value = input.value.replace(/\D/g, '');

        if(input.id === "day" && input.value > 31){
            myLable[index].style.color = "#ff5757";
            input.style.borderColor = "#ff5757";
            errorPara[index].textContent = "Must be a valid day";
            errorPara[index].style.visibility = "visible";
            errorPara[index].style.color = "#ff5757";
        }
        if(input.id === "month" && input.value > 12){
            myLable[index].style.color = "#ff5757";
            input.style.borderColor = "#ff5757";
            errorPara[index].textContent = "Must be a valid month";
            errorPara[index].style.visibility = "visible";
            errorPara[index].style.color = "#ff5757";
        }
        if(input.id === "year" && input.value > currentYear){
            myLable[index].style.color = "#ff5757";
            input.style.borderColor = "#ff5757";
            errorPara[index].textContent = "Must be a in the past";
            errorPara[index].style.visibility = "visible";
            errorPara[index].style.color = "#ff5757";
        }
    });

    myButton.addEventListener("click", (e) => {
        e.preventDefault();
    
        if(!input.value){
    
            input.style.borderColor = "#ff5757";
            myLable[index].style.color = "#ff5757";
            errorPara[index].style.visibility = "visible";
            errorPara[index].style.color = "#ff5757";
    
        }else{

            myLable[index].style.color = "";
            input.style.borderColor = "";
            errorPara[index].style.visibility = "hidden";
            
            const years = myInputs[2].value;
            const months = myInputs[1].value;
            const days = myInputs[0].value;
            const dob = years + "-" + months + "-" + days;
            
            let userDob = calculateAge(dob)
            myYears.textContent = userDob.years;
            myMonths.textContent = userDob.months;
            myDays.textContent = userDob.days;
            
        }
             
    })

});

const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let ageYears = today.getFullYear() - birthDateObj.getFullYear();
    let ageMonths = today.getMonth() - birthDateObj.getMonth();
    let ageDays = today.getDate() - birthDateObj.getDate();

    // If the birth month is ahead of the current month, subtract 1 year
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
    }

    // If the birth day is ahead of the current day, subtract 1 month
    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    return {
        years: ageYears,
        months: ageMonths,
        days: ageDays
    };
}



