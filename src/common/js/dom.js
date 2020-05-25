
export function addClass(el, className) {
   
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el)
}

export function attr(el,name,val){

     if(val){
       el.setAttribute(name,val)
     } else{
      return  el.getAttribute(name)
     } 


}

