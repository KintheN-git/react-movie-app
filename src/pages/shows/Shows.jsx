import { Container, Heading } from "@chakra-ui/react";
import React from "react";

function Shows() {
  return (
    <Container maxW={"container.xl"}>
      <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
        Discover Tv Shows
      </Heading>
    </Container>
  );
}

export default Shows;
