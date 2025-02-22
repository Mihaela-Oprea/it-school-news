import { useState } from "react";

//primim ca parametri numele cheii si valoarea acesteia.
export function useLocalStorage(key, value) {
  //extgragem valoarea din localStorage asociata cheii primite
  const localStorageItem = localStorage.getItem(key);
  //parsam valoarea extrasa, daca aceasta are valoarea null inseamna ca nu exista in localStorage.
  //daca nu avem valoarea asociata cheii in localSotrage, starea initiala va fi valoarea primita ca argument(vezi la teorie operatorul ||)

  const initialState = JSON.parse(localStorageItem) || value;
  // Initializam state-ul state-ul.
  const [state, setState] = useState(initialState);

  // Cream o functie care modificia valoarea din localStorage si actualizeaza si state-ul.
  function setStateAndLocalStorage(value) {
    setState(value);
    // Inainte sa setam noua valoare, avem grija sa o stringifiem.
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Returnam state-ul si functia care actualizeaza state-ul + valoare din localStorage.
  return [state, setStateAndLocalStorage];
}
