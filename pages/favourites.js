import { useAtom } from "jotai";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import { favouritesAtom } from "@/store";
import { useEffect } from "react";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouriteList, setFavouritesList] = useAtom(favouritesAtom);

  if (favouriteList != null && favouriteList != undefined) {
    return (
      <>
        {favouriteList.length > 0 ? (
          <Row>
            {favouriteList.map((artwork) => {
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
        {favouriteList.length == 0 ? (
          <Card>
            <Card.Body>
              <Card.Text>
                <p>
                  <h4>Nothing Here</h4>
                  Nothing Here Try adding some new artwork to the list.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}
      </>
    );
  }
}
