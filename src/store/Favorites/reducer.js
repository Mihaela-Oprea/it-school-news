// Initializam state-ul cu o lista goala de produse favorite.
export const initialState = {
  products: [],
};

// Functia reducer gestioneaza actiunile pentru lista de favorite.
export function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_FAVORITES": {
      // Verificam daca produsul exista deja in lista de favorite.
      const isInList = state.products.find((product) => {
        return product.id === action.payload.id;
      });
      // Daca produsul este deja in lista, nu il adaugam din nou si returnam state-ul actual.
      if (isInList) {
        return state;
      } else {
        // Daca produsul nu este in lista, il adaugam la inceputul listei.
        const newState = {
          products: [action.payload, ...state.products],
        };
        return newState; // Returnam noua stare actualizata.
      }
    }
    case "REMOVE_FROM_FAVORITES": {
      // Stergem produsul din lista de favorite pe baza id-ului primit in payload.
      const filteredProducts = state.products.filter((product) => {
        return product.id !== action.payload; // Pastram toate produsele, cu exceptia celui sters.
      });
      const newState = {
        products: filteredProducts, // Actualizam lista fara produsul eliminat.
      };
      return newState;
    }
    // Returnam state-ul actual in cazul unei actiuni necunoscute.
    default: {
      return state;
    }
  }
}
