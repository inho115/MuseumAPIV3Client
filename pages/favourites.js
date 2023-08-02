import { useAtom } from "jotai";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import { favouritesAtom } from "@/store";
import { useEffect } from "react";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null;

  if (favouritesList != null && favouritesList != undefined) {
    return (
      <>
        {favouritesList.length > 0 ? (
          <Row>
            {favouritesList.map((artwork) => {
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
        {favouritesList.length == 0 ? (
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
