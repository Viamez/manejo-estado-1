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
  const onConfirm=()=>{
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  }
  const onError=()=>{
    setState({
      ...state,
      error: true,
      loading: false,
    });
  }
  const onWrite=(newValue)=>{
    setState({
      ...state,
      // event.target.value es para obtener lo que escribimos en el input,
      // event.target.value no hace referencia al value del estado
      value: newValue,
    });
  }
  const onCheck=()=>{
    setState({
      ...state,
      loading: true,
    });
  };

  const onDelete=()=>{
    setState({
      ...state,
      deleted: true,
    });
  }
  const onReset=()=>{
    setState({
      ...state,
      confirmed: false,
      deleted:false,
      value:'',
    });
  }



  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("haciendo la validacion");

        if (state.value === SECURITY_CODE) {
          onConfirm()
        } else {
          onError()
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
           onWrite(event.target.value);
          }}
        />
        <button
          onClick={() => {
            onCheck()
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
            onDelete()
          }}
        >
          Si, eliminar
        </button>

        <button
          onClick={() => {
            onReset();
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
            onReset();
          }}
        >
          Recuperar UseState
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
