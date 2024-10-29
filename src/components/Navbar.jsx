import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      console.log("sign in successful");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box py={4} mb={2}>
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to="/">
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              MovieApp
            </Box>
          </Link>
          <Flex
            gap={4}
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"red"}
                    color={"white"}
                    size={"sm"}
                    name={user?.displayName}
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/watchlist">
                    <MenuItem>Watch List</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Avatar
                onClick={handleSignInWithGoogle}
                bg={"gray"}
                size={"sm"}
                cursor={"pointer"}
              />
            )}
          </Flex>

          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap={4}
          >
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={"black"}>
                <DrawerCloseButton />
                <DrawerHeader>
                  {user ? (
                    <Flex gap={4} alignItems={"center"}>
                      <Avatar bg={"red"} size={"sm"} name={user?.displayName} />
                      <Box fontSize={"sm"}>
                        {" "}
                        {user?.displayName || user?.email}
                      </Box>
                    </Flex>
                  ) : (
                    <Avatar
                      bg={"gray.800"}
                      size={"sm"}
                      as={"button"}
                      onClick={handleSignInWithGoogle}
                    />
                  )}
                </DrawerHeader>
                <DrawerBody>
                  <Flex flexDirection={"column"} gap={4} onClick={onClose}>
                    <Link to="/">Home</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/shows">TV Shows</Link>
                    {user && (
                      <>
                        <Link to="/watchlist">Watch List</Link>
                        <Button
                          onClick={logout}
                          colorScheme={"red"}
                          variant={"outline"}
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
