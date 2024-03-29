exports.getDate  = function(){

    const today = new Date();
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    
    return today.toLocaleDateString("en-us",options)
}


exports.getTime = function(){

    const today = new Date();
    var options = {timeZone: "Asia/Kolkata"};
    return today.toLocaleTimeString("en-us",options)
}