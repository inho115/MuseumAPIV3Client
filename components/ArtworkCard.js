import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function ArtworkCard(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }
  if (data) {
    return (
      <Card>
        <Card.Img
          variant="top"
          src={
            data.primaryImageSmall
              ? data.primaryImageSmall
              : `https://via.placeholder.com/375x375.png?text=[+Not+Available+]`
          }
          alt={data.title}
        />
        <Card.Body>
          <Card.Title>
            <p>{data.title ? data.title : "N/A"}</p>
          </Card.Title>
          <Card.Text>
            <p>
              <strong>Date: </strong>
              {data.objectDate ? data.objectDate : "N/A"}
              <br />
              <strong>Classification: </strong>
              {data.classification ? data.classification : "N/A"}
              <br />
              <strong>Medium: </strong>
              {data.medium ? data.medium : "N/A"}
              <br />
              <br />
            </p>

            <Link passHref href={`/artwork/${props.objectID}`}>
              <Button variant="outline-dark">
                <strong>ID: </strong> {props.objectID}
              </Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}
