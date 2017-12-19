import axios from 'axios'

// axios.get()
const Home = (url) => {
  return new Promise((resolve, reject)=>{
    axios.get(url).then((res)=>{
      return res;
    })
  })
};

export default {

}
