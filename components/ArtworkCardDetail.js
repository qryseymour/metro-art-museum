import useSWR from 'swr'
import { Error } from 'next/error'
import { Card, Button } from 'react-bootstrap'
import { useState } from "react";
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import { useEffect } from 'react';

export default function ArtworkCardDetail(props) {
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false)
    
    async function favouritesClicked() {
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(props?.objectID))
            setShowAdded(false)
        } else {
            setFavouritesList(await addToFavourites(props?.objectID))
            setShowAdded(true)
        }
    }

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(props?.objectID))
    }, [favouritesList])

    return ((error) ?
        (<Error statusCode={404} />) :
        (data) ? 
            <Card >
                {(data?.primaryImage) ? 
                <Card.Img variant="top" src={(data?.primaryImage) ?
                    (data?.primaryImage) :
                    (`https://via.placeholder.com/375x375.png?text=[+Not+Available+]`)
                } />    
                : <></>}
                <Card.Body>
                    <Card.Title>{(data?.title) ?
                        (data?.title) :
                        (`N/A`)
                    }</Card.Title>
                    <Card.Text>
                    <b>Date:</b> {(data?.objectDate) ?
                        (data?.objectDate) :
                        (`N/A`)
                    }<br />
                    <b>Classification:</b> {(data?.classification) ?
                        (data?.classification) :
                        (`N/A`)
                    }<br />
                    <b>Medium:</b> {(data?.medium) ?
                        (data?.medium) :
                        (`N/A`)
                    }<br /><br />
                        <b>Artist Name:</b> {(data?.artistDisplayName) ?
                            (<>
                                {data?.artistDisplayName} ( <a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer" >Wiki</a> )
                            </>) :
                        (`N/A`)
                    }<br />
                    <b>Credit Line:</b> {(data?.creditLine) ?
                        (data?.creditLine) :
                        (`N/A`)
                    }<br />
                    <b>Dimensions:</b> {(data?.dimensions) ?
                        (data?.dimensions) :
                        (`N/A`)
                    }<br /><br/>
                    <Button variant={showAdded ? "primary" : "outline-primary"} onClick={() => { favouritesClicked() }}>
                        + Favourite {showAdded ? "(added)" : ""}
                    </Button>    
                    </Card.Text>
                </Card.Body>
            </Card> :
            null
    )
}