import { useToast } from "@chakra-ui/react";
import { db } from "../services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
export const useFirestore = () => {
  const toast = useToast();
  const addDocument = async (collectionName, data) => {
    const docRef = await addDoc(collection(db, collectionName), data);
  };

  const addToWatchList = async (userId, dataId, data) => {
    try {
      if (await checkWatchList(userId, dataId)) {
        toast({
          title: "Error",
          description: "Already in your watchlist",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return false;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
      toast({
        title: "Success",
        description: "Added to watchlist",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const checkWatchList = async (userId, dataId) => {
    const docRef = doc(db, "users", userId.toString(), "watchlist", dataId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromWatchList = async (userId, dataId) => {
    try {
      await deleteDoc(
        doc(db, "users", userId.toString(), "watchlist", dataId.toString())
      );
      toast({
        title: "Success",
        description: "Removed to watchlist",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log("error", error);
    }
  };

  const getWatchList = async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return data;
  };
  return {
    addDocument,
    addToWatchList,
    checkWatchList,
    removeFromWatchList,
    getWatchList,
  };
};
