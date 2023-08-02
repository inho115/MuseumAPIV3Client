const PER_PAGE = 12;
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Error from "next/error";
import { Row, Col, Card, Pagination, Container } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import validObjectIDList from "@/public/data/validObjectIDList.json";

export default function ArtWork() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];
  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    if (data != null || data != undefined) {
      const results = [];
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList != null && artworkList != undefined) {
    return (
      <>
        {artworkList.length > 0 ? (
          <Row>
            {artworkList[page - 1].map((artwork) => {
              return (
                <Col lg={3} key={artwork}>
                  <ArtworkCard objectID={artwork} />
                </Col>
              );
            })}
          </Row>
        ) : (
          ""
        )}
        {artworkList.length == 0 ? (
          <Card>
            <Card.Body>
              <Card.Text>
                <p>
                  <h4>Nothing Here</h4>
                  Try searching for something else.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}
        {artworkList.length > 0 ? (
          <Row>
            <Col>
              <br />
              <Pagination>
                <Pagination.Prev onClick={previousPage}></Pagination.Prev>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage}></Pagination.Next>
              </Pagination>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </>
    );
  }

  if (artworkList == null || artworkList == undefined) {
    return null;
  }
}
