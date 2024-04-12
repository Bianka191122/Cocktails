export const getData = async (url, rendelFc)=>{
    const response = await fetch(url)
    const data = await response.json()
    rendelFc(data)
}