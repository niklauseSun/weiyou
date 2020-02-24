function checkPhone(phone){
    if(!(/^1[3456789]\d{9}$/.test(phone))){
        alert("手机号码有误，请重填");
        return false;
    }
}

export { checkPhone }