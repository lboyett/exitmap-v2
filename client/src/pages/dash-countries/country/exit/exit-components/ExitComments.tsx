import avatar from "../../../../../assets/avatar.jpeg";
import {
  Image,
  Flex,
  Text,
  Box,
  FormControl,
  useColorModeValue,
  Textarea,
  Button,
} from "@chakra-ui/react";
import "./exit-comments.css";
import { useState } from "react";
import { BiCommentAdd } from "react-icons/bi";

function ExitComments(props: any) {
  const [addCommentButton, setAddCommentButton] = useState("");
  const [hideIcon, setHideIcon] = useState("");
  const comments = props.comments;

  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";

  function showAddCommentButton() {
    console.log(hideIcon)
    if (addCommentButton === "") {
      setAddCommentButton("active");
      setHideIcon("inactive");
    } else {
      setAddCommentButton("");
      setHideIcon('');
    }
  }

  return (
    <div className="comments">
      <Flex className="comments-title-container">
        <BiCommentAdd
          className={`add-comment-icon  ${hideIcon}`}
          onClick={showAddCommentButton}
        />
        <Flex className={`comment-button-container  ${addCommentButton}`}>
          <Text onClick={showAddCommentButton} cursor='pointer'>Cancel</Text>
          <Button type="submit" className={`comment-button`}>
            Post
          </Button>
        </Flex>
      </Flex>

      <form className={`comment-form  ${addCommentButton}`}>
        <FormControl>
          <Textarea
            resize="none"
            className={inputColorMode}
            name="new-comment"
          />
        </FormControl>
      </form>

      {comments.map((comment: any, i: number) => {
        return (
          <Flex className="comment" key={i}>
            <Image src={avatar} className="avatar-comments" />
            <Box>
              <Flex alignItems={"center"}>
                <Text className="comment-username">
                  {"@" + comment.username}
                </Text>
                <Text fontWeight={"200"} fontSize="0.8rem">
                  {comment.created_at}
                </Text>
              </Flex>
              <Text>{comment.text}</Text>
            </Box>
          </Flex>
        );
      })}
    </div>
  );
}

export default ExitComments;
