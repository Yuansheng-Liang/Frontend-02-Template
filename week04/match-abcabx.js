function match(str){
    let state = start;
    for(let c of str){
        state = state(c);
    }
    return state === end;
}

function start(c){
    if(c === 'a'){
        return foundA;
    }else{
        return start;
    }
}

function foundA(c){
    if(c === 'b'){
        return foundB;
    }else{
        return foundA(c);
    }
}

function foundB(c){
    if(c === 'c'){
        return start;
    }else if(c === 'x'){
        return end;
    }else{
        return foundA(c);
    }
}

function foundC(c){
    return foundA(c);    
}

function foundX(c){
     return end;    
}

function end(c){
    return end;
}

console.log(match('3133abcabxabcabx'));