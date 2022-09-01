import React from "react";

const SECURITY_CODE = "paradigma";
function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });
  console.log(state);
  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("haciendo la validacion");

        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          });
        } else {
          setState({
            ...state,
            error: true,
            loading: false,
          });
        }
        console.log("terminando la validacion");
      }, 1500);
    }

    console.log("Terminando el efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name} </h2>
        <p>Por favor, escribe el codigo de seguridad.</p>
        {state.error && !state.loading && <p>Error: el codigo es incorrecto</p>}
        {!!state.loading && <p>Cargando...</p>}
        <input
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(event) => {
            setState({
              ...state,
              // event.target.value es para obtener lo que escribimos en el input,
              // event.target.value no hace referencia al value del estado
              value: event.target.value,
            });
          }}
        />
        <button
          onClick={() => {
            setState({
              ...state,
              loading: true,
            });
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>¿Seguro que quieres borrar UseState?</p>
        <button
          onClick={() => {
            setState({
              ...state,
              deleted: true,
            });
          }}
        >
          Si, eliminar
        </button>

        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              value:'',
            });
          }}
        >
          No, volver
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>tarea eliminada</h2>
        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              deleted: false,
              value:'',
            });
          }}
        >
          Recuperar UseState
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
