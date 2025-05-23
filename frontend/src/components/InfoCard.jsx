import { Card, Typography } from "@material-tailwind/react";
import React from "react";

const InfoCard = ({ cardHeading, cardBody, cardImg }) => {
  return (
    <Card className=" max-w-sm">
        <Card.Header as="img" src={cardImg} alt="image" className="h-30 w-30"/>
      <Card.Body>
        <Typography type="h6">{cardHeading}</Typography>
        <Typography className="my-1 text-foreground">{cardBody}</Typography>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
