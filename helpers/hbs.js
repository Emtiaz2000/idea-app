const compareValues = (value1,value2) => {
    return value1=== value2 && "selected"
}


const trncatedContent = (content,num)=>{
    if(content < num){
        return content;
    }else{
       return content.slice(0,num) + '...'
    }
}
module.exports ={
    compareValues,
    trncatedContent
}