import { useAtom } from 'jotai';
import { Row, Col, Card } from 'react-bootstrap'
import { favouritesAtom } from '@/store';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() { 
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null

    return ((favouritesList?.length > 0) ? 
        <><Row className="gy-4">
        {favouritesList.map((e) =>
            <Col lg="auto" key={e}><ArtworkCard objectID={e} /></Col>
        )}
        </Row></> :
        <Card style={{ width: '18rem' }}><b>Nothing Here.</b> Try adding some new artwork to the list</Card>    
    )
}