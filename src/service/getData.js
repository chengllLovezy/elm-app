import axios from 'axios'

// home页数据请求
export const home = () => {
  return new Promise((resolve, reject)=>{
    axios.get('/api/home').then((res)=>{
      if(!res.data.status){
        resolve(res)
      }else{
        reject(error)
      }
    })
  })
}
