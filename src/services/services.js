const request = async (endPoint) => {
  const response = await fetch(endPoint);
  const data = await response.json();
  console.log(data);
  return data;
};

export default request;
