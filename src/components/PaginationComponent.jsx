import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

const PaginationComponent = ({ activePage, setActivePage, totalPages }) => {
  return (
    <Flex alignItems={"center"} gap={2}>
      <Flex gap={2} maxW={"250px"} my={10}>
        <Button
          onClick={() => activePage > 1 && setActivePage(activePage - 1)}
          disabled={activePage === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => setActivePage(activePage + 1)}
          disabled={activePage === totalPages}
        >
          Next
        </Button>
      </Flex>
      <Flex gap={2}>
        <Text>{activePage}</Text>
        <Text>of</Text>
        <Text>{totalPages}</Text>
      </Flex>
    </Flex>
  );
};

export default PaginationComponent;
