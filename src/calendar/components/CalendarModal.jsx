import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import Modal from "react-modal";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from "../../hooks";
import { onCloseDateModal } from "../../store";

registerLocale('es',es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {

  const {isDateModalOpen, closeDateModal} = useUiStore();
  //*const [isOpen, setIsOpen] = useState(true); (ya no es necesaria gracias al useUiStore)

  const {activeEvent,startSavingEvent} =useCalendarStore();

  const [formSumbited, setFormSubmited]=useState(false);

  const [formValues, setFormValues] = useState({
    title: "Titulo de la Nota Inicial",
    notes: "Evento - Notasss -",
    start: new Date(),
    end: addHours(new Date(), 2),
  });


  const titleClass = useMemo(()=>{
      if (!formSumbited) return '';
      return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid';
  },[formValues.title,formSumbited])

  const onCloseModal = () => {
    console.log("Cerrando Modal");    
    closeDateModal();
  };

  useEffect(()=>{
    if (activeEvent!==null) {
      setFormValues({...activeEvent})
    }

  },[activeEvent])



  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmited(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    console.log(difference);

    if (isNaN(difference) || difference <=0) {
        console.log('Error en Fechas');
        Swal.fire('Fechas Incorrectas', 'La fecha final, debe ser mayor que la inicial, favor de revisar.','error')
        return;
    }

    if (formValues.title.length <= 0)  {
        console.log('El título debe existir');    
        Swal.fire('El título del Evento es requerido','Completar información','error')
     return;
    }
    console.log(formValues);
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmited(false);
  }

  return (
    <Modal
      // isOpen={isOpen} (se reemplaza por el hook del state)
      isOpen={isDateModalOpen}      
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <div className="customDatePickerWidth">
            <DatePicker
              selected={formValues.start}
              onChange={(event) => onDateChanged(event, "start")}
              className="form-control"
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>
        </div>
          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
        <div className="customDatePickerWidth">
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(event) => onDateChanged(event, "end")}
              className="form-control"
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Título</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"            
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <p/>
          <small id="emailHelp" className="form-text text-muted">
            Información Adicional.
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          {/* <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small> */}
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
