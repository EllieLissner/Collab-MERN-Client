import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from 'axios'
import styled from "styled-components";
import NewEvent from "../components/NewEvent"
import DateSection from "./DateSection";
import NoEventToday from "./NoEventToday";
import SingleEvent from "./SingleEvent"

export default function DayView() {
    const [dayEvents, setDayEvents] = useState([]);
    const [status, setStatus] = useState("loading");
    const history = useHistory();
    const params = useParams();
    const today = new Date(
      // params.date.slice(0, 4),
      // params.date.slice(5, 7) - 1,
      // params.date.slice(8, 10)
    );
    useEffect(() => {
        setStatus("loading");
        //AXIOS GET ROUTE 
        fetch(`/events/date/${params.date}`)
          .then((res) => res.json())
          .then((res) => {
            setDayEvents(res.data);
            setStatus("idle");
          })
          .catch((error) => console.log("error!", error));
      }, [params]);
    
      const getDayEventsAfterDeleteAdd = async () => {
        setStatus("loading");
        await fetch(`/events/date/${params.date}`)
        //AXIOS GET ROUTE
          .then((res) => res.json())
          .then((res) => {
            setDayEvents(res.data);
            setStatus("idle");
          })
          .catch((error) => console.log("error!", error));
      };

      const [eventData, setEventData] = useState([])

      useEffect(() => {
        const getDailyEvents = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/calendar/event`)
                setEventData(response.data)
            }catch(error) {
                console.log(error)
            }
        }
        
        getDailyEvents()
        console.log({eventData}, )
    }, [])

    const eventList = eventData.map((activity, key) => {

      return (
          <li>
              {activity.start.time.hours}:{activity.start.time.minutes } { activity.title}
              <br></br>
              <br></br>
          </li>
      )
  })


    return(
        <Wrapper>
          <NewEvent refreshEvents={getDayEventsAfterDeleteAdd} />
      <Tabs>
        {/* <NavIcon>
          <AiOutlineHome onClick={() => history.push("/")} size={30} />
        </NavIcon> */}
        {/* <NavIcon>
          <BiArrowBack onClick={() => history.goBack()} size={30} />
        </NavIcon> */}
        <TabItem
          onClick={() => history.push("/calendar-month")}
          style={{ backgroundColor: "white" }}
        >
          month
        </TabItem>
        <TabItem
          style={{ backgroundColor: "white" }}
          onClick={() => history.push(`/week/${params.date}`)}
        >
          week
        </TabItem>
        <TabItem>Day</TabItem>
      </Tabs>
      <DateSection today={today} />
      {status === "loading" ? null : (
        <ContentSection>
          {dayEvents.length === 0 ? (
            <NoEventToday />
          ) : (
            <>
              <SingleEvent
                dayEvents={dayEvents}
                refreshEvents={getDayEventsAfterDeleteAdd}
              />
            </>
          )}
        </ContentSection>
      )}
        </Wrapper>
    )
}
const Wrapper = styled.div`
  min-height: 100vh;

`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
  margin-right: 3px;
`;
// const NavIcon = styled.div`
//   padding: 0 5px;
//   color: rgb(222, 87, 102);
//   border: 1px solid rgb(222, 87, 102);
//   border-radius: 4px;
//   margin: 0 3px;
// `;
const TabItem = styled.div`
  flex-grow: 1;
  text-align: center;
  background-color: rgb(150, 184, 252);
  border: 1px solid #cedefd;
  color: white;
  text-transform: uppercase;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;
  padding: 6px 0;
  font-size: 1.2rem;
`;

const ContentSection = styled.div`
  position: absolute;
  top: 200px;
  width: 100vw;
`;
