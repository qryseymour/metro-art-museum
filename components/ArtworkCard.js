import Link from 'next/link'
import useSWR from 'swr'
import { Error } from 'next/error'
import { Card, Button } from 'react-bootstrap'

export default function ArtworkCard(props) {
    const { data, errorSWR } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);
    
    return ((errorSWR) ?
        (<Error statusCode={404} />) :
        (data) ? 
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={(data?.primaryImageSmall) ?
                    (data?.primaryImageSmall) :
                    (`https://via.placeholder.com/375x375.png?text=[+Not+Available+]`)
                } />
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
                    }<br />
                    </Card.Text>
                    <Link href={`/artwork/${props.objectID}`} passHref><Button variant="primary"><b>ID:</b> {props.objectID}</Button></Link>
                </Card.Body>
            </Card> :
            null
    )
}