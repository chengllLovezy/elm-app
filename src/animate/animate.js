export const opacity = (i) => {
  /*
  * 35px为基准
  * */
  let opa = i/35;
  return opa;
};

export const scale = (i) => {
  /*
  * 35px为基准
  * */
  let s = (35-i)/35;
  if(s<0.4){
    s = 0.4
  }
  return s;
};

export const translateX = (i) => {
  /*
  * 35px为基准
  * */
  let s = -(i-(i/35));
  if(s<-50){
    s = -50;
  }
  return (s + 'px');
};

export const translateY = (i) => {
  /*
  * 35px为基准
  * */
  let y = 0 + 'px';
  return y;
};
