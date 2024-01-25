import { Calendar } from "react-big-calendar";
import { useEffect, useState } from "react";
import { localizer,getMessagesES } from "../../helpers";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { Navbar,CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";



export const CalendarPage = () => {

  const {user} =useAuthStore();

    //Llamado a función del hook UiStore
    const {openDateModal} =useUiStore();
    const {events, setActiveEvent,startLoadingEvents} = useCalendarStore();
    const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );
    const eventStyleGetter = (event, start, end, isSelected)=>{
      
    const isMyEvent = (user.uid===event.user.id)||(user.uid===event.user._id);

      const style={
        backgroundColor: isMyEvent? '#021331' : '#465660',
        //backgroundColor: '#021331',
        borderRadius: '2px',
        opacity: 0.7,
        color:'white'
      }
      return {
        style
      }
    }

    const onDoubleClick=(event)=>{
      //console.log({doubleClick:event});
      openDateModal();      
    }

    const onSelect=(event)=>{
      console.log({click:event});
      setActiveEvent(event);      
    }

    const onViewChanged=(event)=>{
      //console.log({viewChanged:event})
      localStorage.setItem('lastView', event);
      setLastView(event);
    }

    useEffect(() => {
      startLoadingEvents()
    }, [])

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={ localizer }
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}        
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event:CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  );
};
