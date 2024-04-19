export const getData = async (url, options, rednerFc)=>{
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        rednerFc(result);
    } catch (error) {
        console.error(error);
    }
}