function match(selector, element) {
    for(i = 0; i < selector.length; i++) {
        let state = start;
        state = start(selector.charAt(i));
    }
    
      return true;
  }
  
  
  match("div #id.class", document.getElementById("id"));