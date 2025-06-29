export default function AddPhoto () {
  return (
    <>
      <h3 className="photo__content-title">Añadir nueva fotografía</h3>
      <form className="form">
        <div className="form__group">
          <label className="form__label" htmlFor="title">Título de la foto</label>
          <input className="form__input" type="text" id="title" name="title" required />  
        </div>
        <fieldset className="form__input form__input_fieldset">
          <legend>Selecciona la categoría</legend>
          <div className="form__group form__group_fieldset">
            <label className="form__label form__label_fieldset" htmlFor="section">Página principal</label>
            <input className="form__input form__input_checkbox" type="checkbox" name="section" value="1" />
          </div>
          <div className="form__group form__group_fieldset">
            <label className="form__label form__label_fieldset" htmlFor="section">Eventos</label>
            <input className="form__input form__input_checkbox" type="checkbox" name="section" value="2" />
          </div>
          <div className="form__group form__group_fieldset">
            <label className="form__label form__label_fieldset" htmlFor="section">Modelos</label>
            <input className="form__input form__input_checkbox" type="checkbox" name="section" value="3" />
          </div>
          <div className="form__group form__group_fieldset">
            <label className="form__label form__label_fieldset" htmlFor="section">Retratos</label>
            <input className="form__input form__input_checkbox" type="checkbox" name="section" value="3" />
          </div>
        </fieldset>
        <div className="form__group form__group_file">
          <label className="form__label" htmlFor="image">Subir imagen</label>
          <input className="form__input form__input_file" type="file" id="image" name="image" required />  
        </div>

        <button className="form__button" type="submit">Subir fotografía</button>
      </form>
    </>
  );
}