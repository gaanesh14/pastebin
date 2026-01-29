export const savePaste = (paste) => {
  const existing = JSON.parse(localStorage.getItem("myPastes")) || [];
  localStorage.setItem("myPastes", JSON.stringify([paste, ...existing]));
};

export const getPastes = () => {
  return JSON.parse(localStorage.getItem("myPastes")) || [];
};
