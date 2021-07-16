import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from "styled-components";
import { RightArrow } from '@styled-icons/boxicons-regular/RightArrow'
import DeleteEvent from './components/DeleteEvent'
import EditEvent from './components/EditEvent'

export default function Itinerary() {
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
            <ListItem>
                <RightArrow size="10"/> 
                {activity.start.time.hours}:{activity.start.time.minutes } { activity.title}
                <br></br>
                <EventButtonBox>
                <EventButtons>
                    <EditEvent
                    currentEvent={activity}
                    />
                </EventButtons>
                <EventButtons>
                    <DeleteEvent
                    eventId={activity._id}

                    />
                </EventButtons>
                </EventButtonBox>
                <br></br>
            </ListItem>
        )
    })
    return(
        <Wrapper>
            <div className='itineraryText'>
            <List>
                {eventList}
                
            </List>
            </div>
        </Wrapper>
    )
}

const List = styled.div`
`
const ListItem = styled.div`
    padding: 5px 0px;
`
const Wrapper = styled.div`
    width: 190px;
    margin: 10px 0px;
    .h2 {
    margin: 5px 0px;
    padding: 10px 0px;
    }
    &:hover {
        text-decoration: underline;
    }
`
const EventButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
`;
const EventButtons = styled.div`
  background: transparent;
  border: none;
  font-size: 1.3rem;
  opacity: 30%;
  display: block;
  padding: 3px 5px;
`;