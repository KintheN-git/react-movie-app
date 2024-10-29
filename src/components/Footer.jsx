import React from "react";
import {
  Box,
  Center,
  HStack,
  Link,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Mail, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg={"red"}
      opacity={0.7}
      color={"whiteAlpha.900"}
      py={1}
      my={8}
    >
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: 4, sm: 6, md: 8 }}
      >
        <VStack
          spacing={4}
          alignItems="center"
          justifyContent={"space-between"}
          py={8}
        >
          <Text color={"black"} fontWeight={"bold"} fontSize={"3xl"}>
            Hasret Karci
          </Text>
          <HStack>
            <Link
              href="https://github.com/KintheN-git"
              target="_blank"
              isExternal
            >
              <Icon
                as={Github}
                w={6}
                h={6}
                transition="transform 0.3s ease-in-out"
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/hasretkarci/"
              target="_blank"
              isExternal
            >
              <Icon
                as={Linkedin}
                w={6}
                h={6}
                transition="transform 0.3s ease-in-out"
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
            <Link href="mailto:hasretkarci@outlook.com" isExternal>
              <Icon
                as={Mail}
                w={6}
                h={6}
                transition="transform 0.3s ease-in-out"
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
          </HStack>

          <Link href="https://github.com/KintheN-git/react-movie-app">
            <Text color={"black"}>View project repository.</Text>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default Footer;
