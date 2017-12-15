/*
* 存储localstorage
* */

export const setCartBuy = (name, content) => {
  if(!name){return}
  if(typeof content !== 'string'){
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name,content)
};

export const getCartBuy = (name) => {
  if(!name){return}
  return window.localStorage.getItem(name);
};

export const removeCartBuy = (name) => {
  if(!name){return}
  return window.localStorage.removeItem(name);
};
