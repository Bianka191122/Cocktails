export const userExist=(arr, key, val)=>{
    return arr.find(obj=>obj[key]==val)
}