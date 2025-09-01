function validation(values){
    
    let errors = {};

   const user_pattern= /^(?=.{3,20}$)(?!.*[._]{2})[a-zA-Z0-9](?:[a-zA-Z0-9._]*[a-zA-Z0-9])$/;
   const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;


    if(values.username === ""){
        errors.username = "Username is required";
    }
    else if(!user_pattern.test(values.username)){
        errors.username = "Username must be 3-20 characters long and can  only contain letters, numbers, dots, and underscores without consecutive dots or underscores";
    }
    else{
        errors.username = "";
    }
   
    if(values.password === ""){
        errors.password = "Password is required";
    }
    else if(!password_pattern.test(values.password)){
        errors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
    }
    else{
        errors.password = "";
    }
    return errors;
}
 
export default validation;