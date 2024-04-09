import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { Pagination, Row, Col, Card, } from 'react-bootstrap'
import { Error } from 'next/error'
import useSWR from 'swr'
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList'

const PER_PAGE = 12;

export default function Artwork() {
    const router = useRouter();
    const finalQuery = router?.asPath?.split('?')[1];

    const [artworkList, setArtworkList] = useState(null)
    const [page, setPage] = useState(1)

    const { data, errorSWR } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?` + finalQuery);

    function previousPage() {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    
    function nextPage() {
        if (page < artworkList.length) {
            setPage(page + 1)
        }
    }
    
    useEffect(() => {
        let filteredResults = validObjectIDList.objectIDs.filter(x => data?.objectIDs?.includes(x));
        if (data) {
            var results = []
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }            
            setArtworkList(results);
        }
        setPage(1)
    }, [data]);

    return ((errorSWR) ?
        (<Error statusCode={404} />) :
        (artworkList) ?
            <><Row className="gy-4">
                {(artworkList?.length > 0 ?
                    artworkList[page - 1].map((currentObjectID) =>
                        <Col lg={4} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>
                    ) :
                    <Card style={{ width: '18rem' }}>
                        <h4>Nothing Here</h4>Try searching for something else
                    </Card>)}
            </Row>
                {artworkList?.length > 0 ? 
                <Pagination>
                    <Pagination.Prev onClick={() => {previousPage()}} />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={() => {nextPage()}} />
                </Pagination> :
                <></>
            } </>
            :
            null
        )
}